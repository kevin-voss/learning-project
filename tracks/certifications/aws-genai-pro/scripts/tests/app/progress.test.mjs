import assert from "node:assert/strict";
import test from "node:test";
import { engineFiles, loadAip } from "../load-aip.mjs";

const AIP = loadAip(engineFiles);

test("migration fills mode and exposure on old attempts", () => {
  const quiz = AIP.migrateQuiz({ questions: { "p-00-1": { attempts: [{ at: 1, correct: true }, { correct: false }] } } });
  const attempts = quiz.questions["p-00-1"].attempts;
  assert.equal(attempts[0].mode, "practice");
  assert.equal(attempts[0].exp, 1);
  assert.equal(attempts[1].exp, 0.4);
  assert.equal(attempts[1].mode, "practice");
});

test("a new attempt stores at, correct, mode, and exposure", () => {
  const row = AIP.storage.recordAttempt("p-00-1", true, { mode: "mock" });
  assert.equal(row.attempts[0].mode, "mock");
  assert.equal(row.attempts[0].exp, 1);
  assert.equal(row.attempts[0].correct, true);
  assert.ok(row.attempts[0].at);
});

test("backup version 4 round-trips seen questions", () => {
  AIP.storage.markSeen("p-00-1");
  const payload = AIP.storage.exportBackup();
  assert.equal(payload.version, 4);
  AIP.storage.resetQuizStats();
  AIP.storage.importBackup(payload);
  assert.equal(AIP.storage.seenMap()["p-00-1"] > 0, true);
});
