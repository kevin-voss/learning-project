import { approvedName } from "./lib/aws-cli.mjs";

export function cleanupGuard(stackName) {
  if (!approvedName(stackName)) {
    return { ok: false, reason: "Type the stack name to approve deletion. The reaper never uses FORCE_DELETE_STACK." };
  }
  return { ok: true, args: ["cloudformation", "delete-stack", "--stack-name", stackName] };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = cleanupGuard(process.argv[2] || "");
  console.log(JSON.stringify(result));
  if (!result.ok) process.exitCode = 2;
}
