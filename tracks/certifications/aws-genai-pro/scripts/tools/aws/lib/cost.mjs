export const COST = {
  level3TwoRuns: [4, 27],
  capstonesV1toV3: [15, 45],
  capstoneV4: [10, 25],
  safetyStack: 4,
  drill: 0.5,
  total: [30, 110],
  optional: [3, 8],
  note: "Budgets alert. They do not cap spending. Cleanup never claims zero charges."
};

export function recoveryPlan(status) {
  const steps = ["Scheduler retries, then the DLQ alert."];
  if (status === "DELETE_FAILED") {
    steps.push("Empty lp-lab-* buckets.");
    steps.push("Retry twice, after 30 and 60 minutes.");
  } else if (status) {
    steps.push("Alert with the resources, reasons, and command.");
  }
  steps.push("Daily sweep deletes expired lp-lab-* stacks and alerts on orphans without deleting them.");
  steps.push("The reaper never uses FORCE_DELETE_STACK.");
  return steps;
}

export function manualRecoverySteps() {
  return [
    "Empty buckets.",
    "Retry once with an elevated role, then fix the role file.",
    "Remove whatever blocks the delete.",
    "Use --retain-resources only in DELETE_FAILED, then delete directly.",
    "FORCE_DELETE_STACK only after the physical IDs are recorded.",
    "For a DLQ message, show the error code and fix the input.",
    "Delete orphans per service after typed confirmation."
  ];
}
