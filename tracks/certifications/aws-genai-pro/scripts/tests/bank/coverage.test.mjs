import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadAip, root } from "../load-aip.mjs";

function walk(dir) {
  if (!existsSync(join(root, dir))) return [];
  const out = [];
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const rel = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel));
    else if (entry.name.endsWith(".js")) out.push(rel);
  }
  return out;
}

function words(text) {
  return String(text || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function windows(text) {
  const list = words(text);
  const out = new Set();
  for (let i = 0; i + 8 <= list.length; i++) out.add(list.slice(i, i + 8).join(" "));
  return out;
}

const files = [
  "js/core/ns.js",
  "js/course/skills.js",
  "js/course/blueprint.js",
  "js/questions/data/practice.js",
  "js/questions/data/kept-map.js",
  ...walk("js/questions/original").sort()
];
const AIP = loadAip(files);

test("five derived questions stay quarantined", () => {
  const quarantined = [...AIP.questions].filter((q) => q.quarantine).map((q) => String(q.id)).sort();
  assert.deepEqual(quarantined, ["p-03-2", "p-05-1", "p-05-2", "p-18-2", "p-20-1"]);
});

test("kept questions fill skills without passing the target", () => {
  const targets = AIP.skillTargets();
  const counts = {};
  AIP.questions.filter((q) => AIP.KEPT_MAP[q.id] && !q.quarantine).forEach((q) => {
    counts[q.skill] = (counts[q.skill] || 0) + 1;
  });
  assert.equal(Object.values(counts).reduce((a, b) => a + b, 0), 51);
  for (const [skill, count] of Object.entries(counts)) assert.ok(count <= targets[skill], skill);
});

test("original questions meet every skill target", () => {
  const targets = AIP.skillTargets();
  const counts = {};
  const originals = AIP.questions.filter((q) => q.source === "original" && !q.quarantine);
  assert.equal(originals.length, 249);
  originals.forEach((q) => { counts[q.skill] = (counts[q.skill] || 0) + 1; });
  const kept = {};
  AIP.questions.filter((q) => AIP.KEPT_MAP[q.id]).forEach((q) => { kept[q.skill] = (kept[q.skill] || 0) + 1; });
  for (const [skill, target] of Object.entries(targets)) {
    assert.equal((counts[skill] || 0) + (kept[skill] || 0), target, skill);
  }
});

test("new questions do not repeat a quarantined phrase", () => {
  const banned = new Set();
  AIP.questions.filter((q) => q.quarantine).forEach((q) => {
    const digest = createHash("sha256").update(words(q.stem).join(" ")).digest("hex");
    banned.add(digest);
    windows(q.stem).forEach((phrase) => banned.add(phrase));
  });
  AIP.questions.filter((q) => q.source === "original").forEach((q) => {
    const digest = createHash("sha256").update(words(q.stem).join(" ")).digest("hex");
    assert.equal(banned.has(digest), false, q.id);
    for (const phrase of windows(q.stem)) assert.equal(banned.has(phrase), false, q.id + " " + phrase);
  });
});

test("service worker lists every script the page loads", () => {
  const index = readFileSync(join(root, "index.html"), "utf8");
  const sw = readFileSync(join(root, "sw.js"), "utf8");
  const tags = [...index.matchAll(/src="(js\/[^"?]+)/g)].map((match) => match[1]);
  for (const tag of tags) assert.match(sw, new RegExp(tag.replace(/[.]/g, "\\.")));
  assert.match(sw, /registration\.scope/);
});
