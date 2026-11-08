import { createContext, runInContext } from "node:vm";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

export function loadAip(relativeFiles) {
  const memory = new Map();
  const sandbox = {
    console,
    localStorage: {
      getItem(key) { return memory.has(key) ? memory.get(key) : null; },
      setItem(key, value) { memory.set(key, String(value)); },
      removeItem(key) { memory.delete(key); }
    }
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  createContext(sandbox);
  for (const rel of relativeFiles) {
    const path = join(root, rel);
    runInContext(readFileSync(path, "utf8"), sandbox, { filename: path });
  }
  return sandbox.AIP;
}

export const engineFiles = [
  "js/core/ns.js",
  "js/core/config.js",
  "js/course/skills.js",
  "js/course/blueprint.js",
  "js/progress/model/mastery.js",
  "js/progress/model/readiness.js",
  "js/progress/model/schedule.js",
  "js/progress/store/migrate.js",
  "js/progress/store/backup.js",
  "js/core/storage.js",
  "js/exam/form.js",
  "js/labs/check.js"
];
