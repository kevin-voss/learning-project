import assert from "node:assert/strict";
import test from "node:test";
import { engineFiles, loadAip } from "../load-aip.mjs";

const AIP = loadAip(engineFiles);

function pool(counts) {
  const questions = [];
  for (const [domain, n] of Object.entries(counts)) {
    for (let i = 0; i < n; i++) {
      questions.push({ id: `q-${domain}-${i}`, domain: Number(domain), source: "original", review: "approved" });
    }
  }
  return questions;
}

test("an untouched M3 bank fits a diagnostic and then two mocks", () => {
  const questions = pool({ 1: 58, 2: 50, 3: 38, 4: 23, 5: 21 });
  const offer = AIP.poolOffer(questions, {}, { reserve: false });
  assert.equal(offer.mockCapacity, 2);
  const seen = {};
  for (const domain of [1, 2, 3, 4, 5]) {
    const quota = Number(AIP.FORM_QUOTA.diagnostic[domain]);
    questions.filter((q) => q.domain === domain).slice(0, quota).forEach((q) => { seen[q.id] = 1; });
  }
  assert.equal(AIP.formCapacity(AIP.freshCounts(questions, seen), AIP.FORM_QUOTA.mock), 2);
});

test("300 questions fit three fresh mocks and not four", () => {
  const questions = pool({ 1: 93, 2: 78, 3: 60, 4: 36, 5: 33 });
  const fresh = AIP.freshCounts(questions, {});
  assert.equal(AIP.formCapacity(fresh, AIP.FORM_QUOTA.mock), 3);
  assert.ok(fresh[2] < 80);
});

test("mini-mock scales by the scarcest domain", () => {
  const fresh = { 1: 12, 2: 19, 3: 19, 4: 10, 5: 10 };
  const mini = AIP.miniForm(fresh);
  assert.equal(mini.count, 37);
  assert.equal(mini.quotas[1], 12);
  assert.equal(mini.quotas[2], 10);
  assert.equal(mini.quotas[3], 7);
  assert.equal(mini.quotas[4], 4);
  assert.equal(mini.quotas[5], 4);
});

test("reserve holds back one fresh mock", () => {
  const questions = pool({ 1: 46, 2: 40, 3: 30, 4: 18, 5: 16 });
  const offer = AIP.poolOffer(questions, {}, { reserve: true });
  assert.equal(offer.mockCapacity, 2);
  assert.equal(offer.offeredMocks, 1);
});

test("score keeps fresh and repeat apart", () => {
  const score = AIP.scoreForm(
    [{ repeat: false }, { repeat: false }, { repeat: true }],
    [true, false, true]
  );
  assert.equal(score.fresh, 0.5);
  assert.equal(score.repeat, 1);
  assert.equal(Math.round(score.freshRatio * 100), 67);
});

test("browser check language accepts the agent-or-workflow answer", () => {
  const result = AIP.runChecks({ decision: "step-functions" }, [{ op: "equals", path: "decision", value: "step-functions" }]);
  assert.equal(result.ok, true);
});
