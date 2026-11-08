import assert from "node:assert/strict";
import test from "node:test";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { root } from "../load-aip.mjs";
import { loadTemplate, templateFindings } from "../../tools/aws/lib/template.mjs";

function jsonFiles(dir) {
  return readdirSync(join(root, dir)).filter((name) => name.endsWith(".json")).map((name) => join(dir, name));
}

test("lab templates follow the safety rules", () => {
  const files = ["labs/bootstrap/template.base.json", ...jsonFiles("labs/cfn/level3"), ...jsonFiles("labs/cfn/capstones")];
  for (const file of files) {
    const findings = templateFindings(loadTemplate(join(root, file)));
    assert.deepEqual(findings, [], file + " " + findings.join("; "));
  }
});
