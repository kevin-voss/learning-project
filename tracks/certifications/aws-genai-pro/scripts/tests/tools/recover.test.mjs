import assert from "node:assert/strict";
import test from "node:test";
import { recoveryPlan, manualRecoverySteps } from "../../tools/aws/lib/cost.mjs";
import { auditResult } from "../../tools/aws/recovery/lab-audit.mjs";
import { checkStack } from "../../../labs/bootstrap/reaper/check.mjs";
import { sweep } from "../../../labs/bootstrap/reaper/sweep.mjs";
import { bucketsToEmpty } from "../../../labs/bootstrap/reaper/empty-bucket.mjs";

test("delete failure empties lab buckets and never force-deletes", () => {
  const steps = recoveryPlan("DELETE_FAILED").join(" ");
  assert.match(steps, /Empty lp-lab/);
  assert.match(steps, /never uses FORCE_DELETE_STACK/);
  assert.deepEqual(bucketsToEmpty(["lp-lab-a", "other"]), ["lp-lab-a"]);
});

test("manual recovery records physical ids before force delete", () => {
  const steps = manualRecoverySteps().join(" ");
  assert.match(steps, /physical IDs/);
  assert.match(steps, /retain-resources only in DELETE_FAILED/);
});

test("sweep deletes expired stacks and only alerts on orphans", () => {
  const result = sweep([
    { name: "lp-lab-old", expiresAt: 10 },
    { name: "lp-lab-orphan", orphan: true, expiresAt: 10 },
    { name: "prod", expiresAt: 10 }
  ], 20);
  assert.deepEqual(result.deleteStacks, ["lp-lab-old"]);
  assert.deepEqual(result.alertOrphans, ["lp-lab-orphan"]);
  assert.equal(result.forceDelete, false);
});

test("audit names leftovers without claiming zero charges", () => {
  assert.equal(auditResult({ stackExists: false, tagsRemain: false, prefixHits: false, createsUnchecked: false }), "NO-LAB-RESOURCES-FOUND");
  assert.equal(auditResult({ stackExists: false, tagsRemain: true }), "PENDING-AWS-CLEANUP");
  assert.equal(auditResult({ stackExists: true }), "LEFTOVERS-FOUND");
  assert.equal(auditResult({}), "AUDIT-INCOMPLETE");
  const checked = checkStack({ status: "DELETE_FAILED", tries: 0 });
  assert.equal(checked.action, "recheck-in-30-minutes");
});
