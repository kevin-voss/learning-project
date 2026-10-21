// Compiles and runs every Java example of one topic page and compares it with its `output`.
//
//   node tracks/java/scripts/verify-lessons.mjs <topic-folder> [--keep]
//   node tracks/java/scripts/verify-lessons.mjs all
//
// It loads the topic's own scripts in the order of its index.html, so the code it runs is
// exactly the code the page shows (template-literal escapes included).
// Per example: `input` is sent to stdin, `noRun: true` skips it (e.g. code that must not compile).
// Examples with a `package` line, JUnit or non-Java languages are skipped.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const javaRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const keep = args.includes('--keep');
const target = args.find(arg => !arg.startsWith('--'));

if (!target) {
  console.error('Usage: node tracks/java/scripts/verify-lessons.mjs <topic-folder>|all [--keep]');
  process.exit(2);
}

function loadTopic(folder) {
  const html = readFileSync(join(javaRoot, 'topics', folder, 'index.html'), 'utf8');
  const own = [...html.matchAll(/<script src="(js\/[^"]+)"/g)].map(match => match[1]);
  const window = {};
  const context = vm.createContext({ window, document: { body: { dataset: {} } }, console });
  context.Java = window.Java = { topics: {} };
  for (const shared of ['js/ns.js', 'js/topics/registry.js', 'js/glossary.js', 'js/topics/core-topic.js']) {
    vm.runInContext(readFileSync(join(javaRoot, shared), 'utf8'), context, { filename: shared });
  }
  for (const file of own) {
    if (/(^|\/)app\.js$/.test(file)) continue;
    vm.runInContext(readFileSync(join(javaRoot, 'topics', folder, file), 'utf8'), context, { filename: `${folder}/${file}` });
  }
  const examples = [];
  for (const [name, topic] of Object.entries(window.Java.topics)) {
    if (name === 'registry' || !topic || !Array.isArray(topic.lessons)) continue;
    for (const lesson of topic.lessons) {
      examples.push({ where: `${lesson.id} (main)`, ...pick(lesson) });
      (lesson.sections || []).forEach((part, index) => {
        if (part.code) examples.push({ where: `${lesson.id} › ${index + 1} ${part.title || ''}`, ...pick(part) });
      });
    }
  }
  return { files: own, examples };
}

function pick(item) {
  return { code: item.code, fileName: item.fileName, language: item.codeLanguage, output: item.output, input: item.input, noRun: item.noRun };
}

function mainClass(code, fileName) {
  const pub = code.match(/\bpublic\s+(?:final\s+|abstract\s+)?(?:class|record|enum|interface)\s+([A-Za-z_$][\w$]*)/);
  if (pub) return pub[1];
  if (fileName && fileName.endsWith('.java')) return fileName.split('/').pop().replace(/\.java$/, '');
  const any = code.match(/\b(?:class|record|enum)\s+([A-Za-z_$][\w$]*)/);
  return any ? any[1] : 'Main';
}

// JDK-internal line numbers (`at java.base/...(Integer.java:565)`) change between JDK versions.
const normalize = text => String(text || '').replace(/\r/g, '').split('\n')
  .map(line => line.trimEnd().replace(/^(\s*at java\.[\w.]+\/.*\(\w+\.java):\d+\)$/, '$1)'))
  .join('\n').trim();

function runExample(example, work) {
  const language = (example.language || 'java').toLowerCase();
  if (!example.code) return { status: 'skip', why: 'no code' };
  if (language !== 'java') return { status: 'skip', why: language };
  if (example.noRun) return { status: 'skip', why: 'noRun' };
  if (/^\s*package\s+[\w.]+\s*;/m.test(example.code)) return { status: 'skip', why: 'package' };
  if (/org\.junit|org\.springframework/.test(example.code)) return { status: 'skip', why: 'library' };
  if (!/static\s+void\s+main\s*\(/.test(example.code)) return { status: 'skip', why: 'no main' };

  const name = mainClass(example.code, example.fileName);
  const dir = mkdtempSync(join(work, `${name}-`));
  writeFileSync(join(dir, `${name}.java`), example.code);
  const compile = spawnSync('javac', ['--release', '21', '-d', join(dir, 'out'), `${name}.java`], { cwd: dir, encoding: 'utf8' });
  if (compile.status !== 0) return { status: 'fail', why: 'compile error', detail: compile.stderr };
  const run = spawnSync('java', ['-cp', join(dir, 'out'), name], { cwd: dir, encoding: 'utf8', input: example.input || '', timeout: 15000 });
  const printed = normalize((run.stdout || '') + (run.stderr || ''));
  if (example.output === undefined) return { status: 'warn', why: 'no output field', detail: printed };
  if (printed !== normalize(example.output)) {
    return { status: 'fail', why: 'output differs', detail: `expected:\n${normalize(example.output)}\n--- got:\n${printed}` };
  }
  return { status: 'ok' };
}

function lineReport(folder) {
  const problems = [];
  const walk = dir => {
    const entries = readdirSync(dir, { withFileTypes: true });
    const files = entries.filter(entry => entry.isFile() && !entry.name.startsWith('.'));
    if (files.length > 5) problems.push(`${dir}: ${files.length} files (max 5)`);
    for (const entry of entries) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (/\.(js|html)$/.test(entry.name)) {
        const lines = readFileSync(path, 'utf8').split('\n').length;
        if (lines > 450) problems.push(`${path}: ${lines} lines (soft cap ~400)`);
      }
    }
  };
  walk(join(javaRoot, 'topics', folder));
  return problems;
}

const folders = target === 'all'
  ? readdirSync(join(javaRoot, 'topics')).filter(name => existsSync(join(javaRoot, 'topics', name, 'index.html')))
  : [target];

const work = mkdtempSync(join(tmpdir(), 'java-lessons-'));
mkdirSync(work, { recursive: true });
let failed = 0;

for (const folder of folders) {
  const { examples } = loadTopic(folder);
  const counts = { ok: 0, skip: 0, warn: 0, fail: 0 };
  console.log(`\n# ${folder}: ${examples.filter(item => item.code).length} code examples`);
  for (const example of examples) {
    if (!example.code) continue;
    const result = runExample(example, work);
    counts[result.status] += 1;
    if (result.status === 'fail' || result.status === 'warn') {
      console.log(`  ${result.status.toUpperCase()} ${example.where}: ${result.why}`);
      if (result.detail) console.log(result.detail.split('\n').map(line => `      ${line}`).join('\n'));
    }
  }
  for (const problem of lineReport(folder)) console.log(`  SIZE ${problem}`);
  console.log(`  ok ${counts.ok} · skipped ${counts.skip} · warnings ${counts.warn} · failed ${counts.fail}`);
  failed += counts.fail;
}

if (!keep) rmSync(work, { recursive: true, force: true });
else console.log(`\nKept the compiled examples in ${work}`);
process.exit(failed ? 1 : 0);
