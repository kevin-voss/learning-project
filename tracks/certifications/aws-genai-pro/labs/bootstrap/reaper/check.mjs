import { recoveryPlan } from "../../../scripts/tools/aws/lib/cost.mjs";

export function checkStack(event) {
  const status = event && event.status;
  const tries = Number(event && event.tries) || 0;
  if (tries >= 4) return { action: "alert", reason: "Re-check stopped after 4 attempts." };
  return { action: "recheck-in-30-minutes", steps: recoveryPlan(status), tries: tries + 1 };
}
