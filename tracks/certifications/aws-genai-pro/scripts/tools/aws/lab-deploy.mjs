import { approvedName } from "./lib/aws-cli.mjs";
import { loadTemplate, templateFindings } from "./lib/template.mjs";

export function deployGuard(opts) {
  const findings = opts.template ? templateFindings(opts.template) : [];
  if (findings.length) return { ok: false, findings };
  if (!opts.precheck || !opts.precheck.ok) return { ok: false, reason: "Read-only pre-check has not passed." };
  if (!approvedName(opts.stackName)) return { ok: false, reason: "Type the stack name to approve creation and automatic deletion." };
  if (!opts.scheduleFirst) return { ok: false, reason: "Create the lifetime schedule before the stack." };
  return { ok: true, args: ["cloudformation", "create-stack", "--stack-name", opts.stackName, "--role-arn", opts.roleArn || "", "--tags", "Key=lp-lab,Value=" + opts.stackName] };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const template = process.argv[2] ? loadTemplate(process.argv[2]) : null;
  const result = deployGuard({
    template,
    precheck: { ok: false },
    stackName: process.argv[3] || "",
    scheduleFirst: false
  });
  console.log(JSON.stringify(result));
  if (!result.ok) process.exitCode = 2;
}
