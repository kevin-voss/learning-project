#!/usr/bin/env node
/**
 * Smoke test: every demoType in curriculum data must resolve in init.js runners.
 * Also checks folder layout (≤5 files per folder, ≤420 lines per file), index.html script
 * paths, unique lesson ids, relatedIds and lesson aliases.
 * Run: node tracks/computer-science/scripts/verify-demos.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
import vm from 'vm';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const MAX_DEMO_FILES_PER_DIR = 5;
const DEMO_ROOT_FILES = new Set(['init.js', 'ui.js', 'playground.js']);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const demosRoot = join(root, 'js/demos');
const layoutErrors = [];

function countDemoJsInDir(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.js'))
    .length;
}

function walkDemoLayout(dir) {
  const count = countDemoJsInDir(dir);
  if (count > MAX_DEMO_FILES_PER_DIR) {
    layoutErrors.push(
      `${dir.replace(root + '/', '')}: ${count} .js files (max ${MAX_DEMO_FILES_PER_DIR})`
    );
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) walkDemoLayout(join(dir, entry.name));
  }
}

const rootJs = readdirSync(demosRoot).filter(name => name.endsWith('.js'));
for (const name of rootJs) {
  if (!DEMO_ROOT_FILES.has(name)) {
    layoutErrors.push(`js/demos/${name}: topic demos must live in subfolders`);
  }
}
walkDemoLayout(demosRoot);

const indexSrc = readFileSync(join(root, 'index.html'), 'utf8');
const scriptPaths = [];
const scriptRe = /src="(js\/demos\/[^"]+\.js)"/g;
let scriptMatch;
while ((scriptMatch = scriptRe.exec(indexSrc)) !== null) scriptPaths.push(scriptMatch[1]);

const missingScripts = scriptPaths.filter(rel => !existsSync(join(root, rel)));
const onDiskTopicDemos = new Set();

function collectTopicDemoPaths(dir, prefix = 'js/demos') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) {
      collectTopicDemoPaths(join(dir, entry.name), rel);
    } else if (entry.name.endsWith('.js') && !DEMO_ROOT_FILES.has(entry.name)) {
      onDiskTopicDemos.add(rel);
    }
  }
}
collectTopicDemoPaths(demosRoot);

const scriptSet = new Set(scriptPaths);
const unlisted = [...onDiskTopicDemos].filter(p => !scriptSet.has(p));
const stale = scriptPaths.filter(
  p => !DEMO_ROOT_FILES.has(p.split('/').pop()) && !onDiskTopicDemos.has(p)
);

const initSrc = readFileSync(join(demosRoot, 'init.js'), 'utf8');
const runnersBlock = initSrc.match(/DS\.demoRunners[\s\S]*?return\s*\{([\s\S]*?)\};/);
if (!runnersBlock) {
  console.error('Could not parse DS.demoRunners from init.js');
  process.exit(1);
}
const runnerKeys = new Set();
const keyRe = /['"]([a-z0-9-]+)['"]\s*:/g;
let m;
while ((m = keyRe.exec(runnersBlock[1])) !== null) runnerKeys.add(m[1]);

function collectDemoTypes(dir) {
  const types = new Set();
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectDemoTypes(full).forEach(t => types.add(t));
    } else if (entry.name.endsWith('.js')) {
      const src = readFileSync(full, 'utf8');
      const re = /demoType:\s*['"]([^'"]+)['"]/g;
      let match;
      while ((match = re.exec(src)) !== null) types.add(match[1]);
    }
  }
  return types;
}

const demoTypes = collectDemoTypes(join(root, 'js/data'));

// Folder and file size rules for the whole track (docs/STYLE.md).
const MAX_FILES_PER_DIR = 5;
const MAX_LINES = 420;
function walkLayout(dir) {
  const entries = readdirSync(dir, { withFileTypes: true }).filter(e => !e.name.startsWith('.'));
  const files = entries.filter(e => e.isFile());
  const rel = dir.replace(root + '/', '');
  if (files.length > MAX_FILES_PER_DIR && !rel.startsWith('js/demos')) {
    layoutErrors.push(`${rel}: ${files.length} files (max ${MAX_FILES_PER_DIR})`);
  }
  for (const f of files) {
    if (!/\.(js|css|mjs)$/.test(f.name)) continue;
    const lines = readFileSync(join(dir, f.name), 'utf8').split('\n').length;
    if (lines > MAX_LINES) layoutErrors.push(`${rel}/${f.name}: ${lines} lines (max ${MAX_LINES})`);
  }
  for (const e of entries) if (e.isDirectory()) walkLayout(join(dir, e.name));
}
['js/data', 'js/app', 'css', 'js/demos'].forEach(d => walkLayout(join(root, d)));

// Every lesson file is loaded by index.html.
const dataScripts = new Set([...indexSrc.matchAll(/src="(js\/data\/[^"]+\.js)"/g)].map(m => m[1]));
function collectFiles(dir, prefix, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) collectFiles(join(dir, e.name), `${prefix}/${e.name}`, out);
    else if (e.name.endsWith('.js')) out.push(`${prefix}/${e.name}`);
  }
  return out;
}
const dataFiles = collectFiles(join(root, 'js/data'), 'js/data');
dataFiles.filter(f => !dataScripts.has(f)).forEach(f => layoutErrors.push(`${f}: not loaded in index.html`));
[...dataScripts].filter(f => !existsSync(join(root, f))).forEach(f => layoutErrors.push(`index.html loads missing ${f}`));

// Load the lessons like the browser does and check ids and links between lessons.
const sandbox = { window: {}, DS: {} };
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const f of [...dataScripts]) vm.runInContext(readFileSync(join(root, f), 'utf8'), sandbox, { filename: f });
const lessons = sandbox.DS.curriculum || [];
const lessonIds = new Set();
const lessonErrors = [];
for (const l of lessons) {
  if (lessonIds.has(l.id)) lessonErrors.push(`lesson id "${l.id}" is used twice`);
  lessonIds.add(l.id);
}
for (const l of lessons) {
  const rel = [...(l.relatedIds || []), ...(l.subPages || []).flatMap(p => p.relatedIds || [])];
  rel.filter(id => !lessonIds.has(id)).forEach(id => lessonErrors.push(`${l.id}: relatedIds has unknown lesson "${id}"`));
  const subIds = (l.subPages || []).map(p => p.id).filter(Boolean);
  if (new Set(subIds).size !== subIds.length) lessonErrors.push(`${l.id}: sub-lesson ids are not unique`);
}
for (const a of sandbox.DS.lessonAliases || []) {
  const [lid, sub] = a.to.split('/');
  const target = lessons.find(l => l.id === lid);
  if (!target) lessonErrors.push(`alias ${a.id}: unknown lesson "${lid}"`);
  else if (sub && !(target.subPages || []).some(p => p.id === sub)) lessonErrors.push(`alias ${a.id}: unknown sub-lesson "${a.to}"`);
  if (lessonIds.has(a.id)) lessonErrors.push(`alias ${a.id} is also a lesson id`);
}

const missing = [];
for (const type of demoTypes) {
  if (!runnerKeys.has(type)) missing.push(type);
}

let failed = false;

if (layoutErrors.length) {
  failed = true;
  console.error('Demo folder layout:');
  layoutErrors.forEach(msg => console.error(`  - ${msg}`));
}
if (missingScripts.length) {
  failed = true;
  console.error('index.html references missing demo scripts:');
  missingScripts.forEach(p => console.error(`  - ${p}`));
}
if (unlisted.length) {
  failed = true;
  console.error('Topic demo files not listed in index.html:');
  unlisted.forEach(p => console.error(`  - ${p}`));
}
if (stale.length) {
  failed = true;
  console.error('index.html demo scripts not on disk:');
  stale.forEach(p => console.error(`  - ${p}`));
}
if (lessonErrors.length) {
  failed = true;
  console.error('Lessons:');
  lessonErrors.forEach(msg => console.error(`  - ${msg}`));
}
if (missing.length) {
  failed = true;
  console.error('Missing runner keys for demoType values:');
  missing.forEach(t => console.error(`  - ${t}`));
}

if (failed) process.exit(1);

console.log(
  `OK: ${demoTypes.size} demoType values resolve in init.js (${runnerKeys.size} runner keys); ` +
    `${onDiskTopicDemos.size} topic demos in index.html; ${lessons.length} lessons; layout ≤${MAX_DEMO_FILES_PER_DIR} per folder`
);
