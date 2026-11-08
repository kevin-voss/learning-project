import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const files = [
  "app/progress.test.mjs",
  "exam/mastery.test.mjs",
  "exam/form.test.mjs",
  "tools/deploy-guard.test.mjs",
  "tools/verify-allowlist.test.mjs",
  "tools/recover.test.mjs",
  "bank/coverage.test.mjs"
];
const result = spawnSync(process.execPath, ["--test", ...files.map((file) => join(here, file))], { stdio: "inherit" });
process.exit(result.status == null ? 1 : result.status);
