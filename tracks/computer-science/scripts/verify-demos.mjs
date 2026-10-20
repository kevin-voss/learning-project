#!/usr/bin/env node
/**
 * Smoke test: every demoType in curriculum data must resolve in init.js runners.
 * Also checks demo folder layout and index.html script paths.
 * Run: node tracks/computer-science/scripts/verify-demos.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'fs';
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
collectDemoTypes(join(root, 'js/data/concepts')).forEach(t => demoTypes.add(t));

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
if (missing.length) {
  failed = true;
  console.error('Missing runner keys for demoType values:');
  missing.forEach(t => console.error(`  - ${t}`));
}

if (failed) process.exit(1);

console.log(
  `OK: ${demoTypes.size} demoType values resolve in init.js (${runnerKeys.size} runner keys); ` +
    `${onDiskTopicDemos.size} topic demos in index.html; layout ≤${MAX_DEMO_FILES_PER_DIR} per folder`
);
