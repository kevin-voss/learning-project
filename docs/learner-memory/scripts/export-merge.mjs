#!/usr/bin/env node
/**
 * Write browser localStorage export or merge stub into .learner/profile.json
 * Usage:
 *   node docs/learner-memory/scripts/export-merge.mjs [input.json]
 * If input.json is omitted, writes a fresh empty v1 profile template.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const outDir = join(root, ".learner");
const outFile = join(outDir, "profile.json");

function emptyProfile() {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    preferences: { explanationDepth: "normal", pace: "normal", preferredSurfaces: [] },
    completions: {},
    struggles: [],
    questions: [],
    feedback: [],
    behavior: { topics: {} },
    events: [],
  };
}

const input = process.argv[2];
let profile = emptyProfile();

if (input) {
  const raw = await readFile(input, "utf8");
  const parsed = JSON.parse(raw);
  if (parsed?.version === 1) profile = { ...profile, ...parsed };
  else console.warn("Input missing version:1; writing template only.");
}

await mkdir(outDir, { recursive: true });
profile.updatedAt = new Date().toISOString();
await writeFile(outFile, JSON.stringify(profile, null, 2) + "\n", "utf8");
console.log("Wrote", outFile);
