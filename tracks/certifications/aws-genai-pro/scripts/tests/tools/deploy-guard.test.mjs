import assert from "node:assert/strict";
import test from "node:test";
import { deployGuard } from "../../tools/aws/lab-deploy.mjs";
import { cleanupGuard } from "../../tools/aws/lab-cleanup.mjs";

test("deploy refuses without a typed stack name", () => {
  delete process.env.LP_LAB_APPROVE;
  const result = deployGuard({ precheck: { ok: true }, stackName: "lp-lab-demo", scheduleFirst: true, template: { Resources: {} } });
  assert.equal(result.ok, false);
});

test("cleanup refuses force delete and unapproved names", () => {
  delete process.env.LP_LAB_APPROVE;
  const result = cleanupGuard("lp-lab-demo");
  assert.equal(result.ok, false);
  assert.match(result.reason, /FORCE_DELETE_STACK/);
});
