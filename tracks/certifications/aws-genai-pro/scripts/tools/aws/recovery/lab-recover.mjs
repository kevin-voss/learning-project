import { manualRecoverySteps } from "../lib/cost.mjs";
import { approvedName } from "../lib/aws-cli.mjs";

export function recoverPlan(stackName) {
  if (!approvedName(stackName)) {
    return { ok: false, reason: "make lab-recover asks you to type the stack name. Nothing was deleted." };
  }
  return { ok: true, retriesMinutes: [1, 2, 4], steps: manualRecoverySteps() };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = recoverPlan(process.argv[2] || "");
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exitCode = 2;
}
