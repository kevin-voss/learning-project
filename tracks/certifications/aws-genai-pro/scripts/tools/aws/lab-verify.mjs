import { templateFindings, loadTemplate } from "./lib/template.mjs";

const findings = [];
for (const path of process.argv.slice(2)) findings.push(...templateFindings(loadTemplate(path)).map((item) => path + ": " + item));
if (findings.length) {
  console.error(findings.join("\n"));
  process.exit(1);
}
console.log("templates ok");
