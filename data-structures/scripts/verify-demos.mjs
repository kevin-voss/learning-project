#!/usr/bin/env node
/**
 * Smoke test: every demoType in curriculum data must resolve in init.js runners.
 * Run: node data-structures/scripts/verify-demos.mjs
 */
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const initSrc = readFileSync(join(root, 'js/demos/init.js'), 'utf8');
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
const lessonIds = new Set();
for (const entry of readdirSync(join(root, 'js/data'), { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.js')) {
    const src = readFileSync(join(root, 'js/data', entry.name), 'utf8');
    const re = /id:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = re.exec(src)) !== null) lessonIds.add(match[1]);
  }
}
collectDemoTypes(join(root, 'js/data/concepts')).forEach(t => demoTypes.add(t));

const missing = [];
for (const type of demoTypes) {
  if (!runnerKeys.has(type)) missing.push(type);
}

if (missing.length) {
  console.error('Missing runner keys for demoType values:');
  missing.forEach(t => console.error(`  - ${t}`));
  process.exit(1);
}

console.log(`OK: ${demoTypes.size} demoType values resolve in init.js (${runnerKeys.size} runner keys)`);
