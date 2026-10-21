// Runs the tests of one student task against the student's own code.
//
//   make test-task TASK=04_2              all tests of task 04_2, on my-solution/
//   make test-task TASK=04_2 PART=a       only the tests of part a)
//   node students/scripts/test-task.mjs 04_2 [--part a] [--student becky] [--solution] [--main Name]
//
// The tests live in the task folder: task-NN-k-<slug>/tests.json. They only look at what the
// program prints for what is typed in, so the student is free to choose file, class and method
// names. --solution runs the same tests on solution/ (teachers use it to prove the tests are right).
//
// tests.json:
// {
//   "task": "04_2",
//   "tests": [
//     { "name": "3 4 5 is right-angled", "part": "a", "input": ["3", "4", "5"],
//       "expect": ["valid: true", "right-angled: true"], "reject": ["error"] }
//   ]
// }
// - input:  the lines the user types, one per Enter (leave it out when the program reads nothing).
// - expect: pieces of output that must appear, in this order. Upper/lower case, extra spaces and
//           line breaks do not matter, and 1041,53 counts the same as 1041.53. Words and numbers
//           match whole: "not" does not match "cannot", "688.45" does not match "688.4505",
//           and "14EUR" counts the same as "14 EUR".
//           Programs run with English (US) settings, so typed numbers use a dot (3.5) on every computer.
// - reject: pieces that must not appear anywhere.
// - lines:  lines that must appear one after another somewhere in the output, exactly as written
//           (spaces and tabs count, only spaces at the line end do not). For a picture or a grid.
// - exact:  the whole output, line by line (only for tasks where the exact look is the point).
import { readFileSync, readdirSync, existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { spawnSync, execFileSync } from 'node:child_process';
import { join, relative, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const TIMEOUT_MS = 10000;

function parseArgs(argv) {
  const opts = { task: '', part: '', student: '', main: '', solution: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--solution') opts.solution = true;
    else if (['--part', '--student', '--main'].includes(arg)) opts[arg.slice(2)] = argv[++i] || '';
    else if (!opts.task) opts.task = arg;
  }
  return opts;
}

function fail(message, code = 2) {
  console.error(message);
  process.exit(code);
}

// All task folders: students/<student>/<subject>/exercises/<exercise>/task-*/
function allTasks() {
  const found = [];
  const studentsDir = join(repo, 'students');
  for (const student of readdirSync(studentsDir)) {
    const subjects = join(studentsDir, student);
    if (student.startsWith('_') || !statSync(subjects).isDirectory()) continue;
    for (const subject of readdirSync(subjects)) {
      const exercises = join(subjects, subject, 'exercises');
      if (!existsSync(exercises)) continue;
      for (const exercise of readdirSync(exercises)) {
        const exerciseDir = join(exercises, exercise);
        if (!statSync(exerciseDir).isDirectory()) continue;
        for (const task of readdirSync(exerciseDir)) {
          if (task.startsWith('task-')) found.push({ student, dir: join(exerciseDir, task) });
        }
      }
    }
  }
  return found;
}

function gitBranch() {
  try {
    return execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: repo, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

function findTask(opts) {
  const tasks = allTasks();
  if (!opts.task) {
    const here = tasks.find(task => (process.cwd() + '/').startsWith(task.dir + '/'));
    if (here) return here.dir;
    fail('Which task? Example: make test-task TASK=04_2');
  }
  const asPath = resolve(opts.task);
  if (existsSync(join(asPath, 'tests.json'))) return asPath;

  const id = opts.task.replace(/[_.]/g, '-');
  let matches = tasks.filter(task => task.dir.split('/').pop().startsWith(`task-${id}-`));
  if (opts.student) matches = matches.filter(task => task.student === opts.student);
  if (matches.length > 1) {
    const branch = gitBranch();
    const mine = matches.filter(task => branch.includes(task.student));
    if (mine.length === 1) matches = mine;
  }
  if (!matches.length) fail(`No task ${opts.task} found. Example: make test-task TASK=04_2`);
  if (matches.length > 1) {
    fail(`Task ${opts.task} exists for ${matches.map(task => task.student).join(', ')}. Add STUDENT=<name>.`);
  }
  return matches[0].dir;
}

// The class to start: the one .java file whose class has a main method. Any name works.
function findMain(folder, files, wanted) {
  const mains = [];
  for (const file of files) {
    const code = readFileSync(join(folder, file), 'utf8').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
    if (!/static\s+void\s+main\s*\(/.test(code)) continue;
    const pkg = (code.match(/^\s*package\s+([\w.]+)\s*;/m) || [])[1];
    const name = file.replace(/\.java$/, '');
    mains.push(pkg ? `${pkg}.${name}` : name);
  }
  if (wanted) {
    const chosen = mains.find(name => name === wanted || name.endsWith(`.${wanted}`));
    if (!chosen) fail(`No class ${wanted} with a main method. Found: ${mains.join(', ') || 'none'}.`);
    return chosen;
  }
  if (!mains.length) fail('No main method found. Your program needs: public static void main(String[] args)', 1);
  if (mains.length > 1) fail(`More than one main method: ${mains.join(', ')}. Add MAIN=<ClassName>.`);
  return mains[0];
}

const normalize = text => String(text).toLowerCase()
  .replace(/(\d),(\d)/g, '$1.$2')
  .replace(/(\d)([a-zäöüß€])/g, '$1 $2')
  .replace(/\s+/g, ' ')
  .trim();

// A piece matches whole words and whole numbers only: "not" does not match "cannot",
// "688.45" does not match "688.4505", but "688.45" matches "688.45EUR".
const isLetter = ch => /[a-zäöüß]/.test(ch || '');
const isDigit = ch => /[0-9]/.test(ch || '');

function findPiece(output, piece, from) {
  for (let at = output.indexOf(piece, from); at !== -1; at = output.indexOf(piece, at + 1)) {
    const first = piece[0];
    const last = piece[piece.length - 1];
    const before = output[at - 1];
    const after = output[at + piece.length];
    const numberBefore = isDigit(before) || (before === '.' && isDigit(output[at - 2]));
    const numberAfter = isDigit(after) || (after === '.' && isDigit(output[at + piece.length + 1]));
    if (isLetter(first) && isLetter(before)) continue;
    if (isDigit(first) && numberBefore) continue;
    if (isLetter(last) && isLetter(after)) continue;
    if (isDigit(last) && numberAfter) continue;
    return at;
  }
  return -1;
}

const lines = text => String(text).replace(/\r/g, '').replace(/\n+$/, '').split('\n').map(line => line.trimEnd());

function judge(test, printed) {
  const problems = [];
  if (test.exact) {
    const want = lines([].concat(test.exact).join('\n'));
    const got = lines(printed);
    const at = want.findIndex((line, index) => line !== got[index]);
    if (at !== -1 || got.length !== want.length) {
      const row = at === -1 ? want.length : at;
      problems.push(`line ${row + 1} should be ${JSON.stringify(want[row] ?? '(nothing more)')}, it is ${JSON.stringify(got[row] ?? '(nothing)')}`);
    }
  }
  if (test.lines) {
    const want = lines([].concat(test.lines).join('\n'));
    const got = lines(printed);
    const found = got.some((_, start) => want.every((line, offset) => got[start + offset] === line));
    if (!found) problems.push(`these lines are missing, exactly like this: ${want.map(line => JSON.stringify(line)).join(', ')}`);
  }
  const output = normalize(printed);
  let from = 0;
  for (const piece of test.expect || []) {
    const at = findPiece(output, normalize(piece), from);
    if (at === -1) {
      problems.push(findPiece(output, normalize(piece), 0) !== -1 ? `"${piece}" is missing here: it is printed earlier, so the order or the number of times is off` : `"${piece}" is missing`);
      continue;
    }
    from = at + normalize(piece).length;
  }
  for (const piece of test.reject || []) {
    if (findPiece(output, normalize(piece), 0) !== -1) problems.push(`"${piece}" should not be printed`);
  }
  return problems;
}

function indent(text, prefix = '        ') {
  const shown = lines(text).slice(0, 30);
  if (lines(text).length > 30) shown.push('…');
  return shown.map(line => prefix + line).join('\n');
}

const opts = parseArgs(process.argv.slice(2));
const taskDir = findTask(opts);
const testsFile = join(taskDir, 'tests.json');
const noTests = `This task has no tests yet (${relative(repo, testsFile)}). In Cursor: /test makes them.`;
if (!existsSync(testsFile)) fail(noTests);

let suite;
try {
  suite = JSON.parse(readFileSync(testsFile, 'utf8'));
} catch (error) {
  fail(`${relative(repo, testsFile)} is not valid JSON: ${error.message}`);
}

if (!Array.isArray(suite.tests) || !suite.tests.length) fail(noTests);
const parts = [...new Set(suite.tests.map(test => test.part).filter(Boolean))];
const tests = opts.part ? suite.tests.filter(test => String(test.part) === opts.part) : suite.tests;
if (!tests.length) fail(`No tests for part ${opts.part}. Parts: ${parts.join(', ') || 'none'}.`);

const deskName = opts.solution ? 'solution' : 'my-solution';
const desk = join(taskDir, deskName);
const sources = existsSync(desk) ? readdirSync(desk).filter(file => file.endsWith('.java')) : [];
const title = `Task ${suite.task || ''} · testing ${deskName}/${opts.part ? ` · part ${opts.part}` : ''}`;
console.log(`\n${title}\n${'─'.repeat(title.length)}`);
if (!sources.length) fail(`No .java file in ${relative(repo, desk)}/ yet. Write your program there first.`, 1);

const build = mkdtempSync(join(tmpdir(), 'task-test-'));
const compile = spawnSync('javac', ['-J-Duser.language=en', '-encoding', 'UTF-8', '-d', build, ...sources], { cwd: desk, encoding: 'utf8' });
if (compile.status !== 0) {
  rmSync(build, { recursive: true, force: true });
  console.log(`❌ Your code does not compile yet. javac says:\n\n${indent(compile.stderr || compile.stdout, '    ')}\n`);
  console.log('Fix the first error first, then run the tests again. Stuck? /stuck in Cursor.');
  process.exit(1);
}

const mainClass = findMain(desk, sources, opts.main);
let passed = 0;
tests.forEach((test, index) => {
  const typed = test.input ? [].concat(test.input).join('\n') + '\n' : '';
  const run = spawnSync('java', ['-Duser.language=en', '-Duser.country=US', '-cp', build, mainClass],
    { input: typed, encoding: 'utf8', timeout: TIMEOUT_MS });
  const printed = (run.stdout || '') + (run.stderr || '');
  const crash = printed.match(/Exception in thread "main" ([\w.$]+)/);
  let problems;
  if (run.error && run.error.code === 'ETIMEDOUT') {
    problems = [`it did not stop within ${TIMEOUT_MS / 1000} seconds (an endless loop, or waiting for more input?)`];
  } else if (crash) {
    problems = [`your program crashed with ${crash[1].split('.').pop()} (red text below)`];
  } else {
    problems = judge(test, printed);
  }
  const label = `${String(index + 1).padStart(2)}  ${test.part ? `${test.part}) ` : ''}${test.name}`;
  if (!problems.length) {
    passed += 1;
    console.log(`✅ ${label}`);
    return;
  }
  console.log(`❌ ${label}`);
  if (test.input) console.log(`      you type:  ${[].concat(test.input).join(' ⏎ ')} ⏎`);
  for (const problem of problems) console.log(`      problem:   ${problem}`);
  console.log(`      your program printed:\n${indent(printed || '(nothing)')}`);
});
rmSync(build, { recursive: true, force: true });

console.log(`\n${passed} of ${tests.length} tests pass.`);
if (passed === tests.length) {
  console.log(opts.part ? `Part ${opts.part} works. On to the next part.` : 'All green. In Cursor: /check for feedback, then /done.');
} else {
  console.log('Fix the first ❌ first, then run the tests again. Stuck? /stuck in Cursor.');
}
if (!opts.part && parts.length > 1) console.log(`Test one part only: make test-task TASK=${suite.task} PART=${parts[0]} (parts: ${parts.join(', ')}).`);
process.exit(passed === tests.length ? 0 : 1);
