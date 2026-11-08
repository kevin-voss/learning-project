import assert from "node:assert/strict";
import test from "node:test";
import { engineFiles, loadAip } from "../load-aip.mjs";

const AIP = loadAip(engineFiles);
const day = 86400000;
const now = Date.parse("2026-06-01T00:00:00Z");

function attempt(partial) {
  return Object.assign({ at: now, correct: true, mode: "practice", exp: 1, difficulty: 2 }, partial);
}

test("three easy practice answers are too little evidence", () => {
  const report = AIP.taskEvidence([
    attempt({ difficulty: 1 }),
    attempt({ difficulty: 1 }),
    attempt({ difficulty: 1 })
  ], now);
  assert.equal(report.nLabel, 1.44);
  assert.equal(report.level, "too little");
});

test("twenty answers on two questions stay too little", () => {
  const attempts = [];
  for (let q = 0; q < 2; q++) {
    for (let i = 0; i < 10; i++) {
      attempts.push(attempt({ exp: AIP.exposureForIndex(i) }));
    }
  }
  const report = AIP.taskEvidence(attempts, now);
  assert.ok(Math.abs(report.n - 3.12) < 0.02);
  assert.equal(report.level, "too little");
});

test("ten fresh level-2 mock answers are strong", () => {
  const attempts = Array.from({ length: 10 }, () => attempt({ mode: "mock" }));
  const report = AIP.taskEvidence(attempts, now);
  assert.equal(Math.round(report.L * 100) / 100, 0.86);
  assert.equal(report.level, "strong");
});

test("the same answers 120 days later have no evidence", () => {
  const attempts = Array.from({ length: 10 }, () => attempt({ mode: "mock", at: now - 120 * day }));
  const report = AIP.taskEvidence(attempts, now);
  assert.equal(report.nLabel, 0.63);
  assert.equal(report.level, "no evidence");
});

test("eight of ten fresh level-3 answers are proficient", () => {
  const attempts = Array.from({ length: 10 }, (_, i) => attempt({ mode: "mock", difficulty: 3, correct: i < 8 }));
  const report = AIP.taskEvidence(attempts, now);
  assert.equal(Math.round(report.L * 100) / 100, 0.62);
  assert.equal(report.level, "proficient");
});

test("skill weights reproduce the task totals", () => {
  const totals = {};
  for (const domain of [1, 2, 3, 4, 5]) {
    for (const row of AIP.allocateDomain(domain)) totals[row.task] = (totals[row.task] || 0) + row.count;
  }
  for (const task of AIP.TASKS) assert.equal(totals[task.id], task.target, task.id);
  assert.equal(Object.values(totals).reduce((a, b) => a + b, 0), 300);
});
