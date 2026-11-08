import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

function walk(dir) {
  if (!existsSync(join(root, dir))) return [];
  const out = [];
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const rel = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel));
    else if (entry.name.endsWith(".js")) out.push(rel.split("\\").join("/"));
  }
  return out;
}

const scripts = [
  "js/core/ns.js",
  "js/core/config.js",
  "js/course/skills.js",
  "js/course/blueprint.js",
  "js/progress/model/mastery.js",
  "js/progress/model/readiness.js",
  "js/progress/model/schedule.js",
  "js/progress/store/migrate.js",
  "js/progress/store/backup.js",
  "js/course/study-guide.js",
  "js/course/chapters.js",
  "js/core/storage.js",
  ...walk("js/content").sort(),
  ...walk("js/questions/examtopics").sort(),
  ...walk("js/questions/certsafari").sort(),
  "js/questions/data/practice.js",
  "js/questions/data/kept-map.js",
  ...walk("js/questions/original").sort(),
  "js/course/render.js",
  "js/exam/question-bank.js",
  "js/exam/bank-views.js",
  "js/exam/form.js",
  "js/exam/quiz.js",
  "js/exam/stats-view.js",
  "js/progress/views/readiness.js",
  "js/progress/views/pool.js",
  "js/labs/check.js",
  "js/labs/data/level-1.js",
  "js/labs/data/level-2.js",
  "js/labs/data/level-3.js",
  "js/labs/catalog.js",
  "js/labs/view.js",
  "js/path/micro.js",
  "js/path/capstone.js",
  "js/path/pages.js",
  "js/core/routes.js",
  "js/core/pwa.js",
  "js/app.js"
];

const indexPath = join(root, "index.html");
const index = readFileSync(indexPath, "utf8");
const cacheVersion = "13";
const tags = scripts.map((file) => `  <script src="${file}?v=${cacheVersion}"></script>`).join("\n");
const scriptBlock = /<!-- aip-scripts:start -->[\s\S]*<!-- aip-scripts:end -->/;
if (!scriptBlock.test(index)) throw new Error("index.html is missing aip-scripts markers");
const nextIndex = index.replace(scriptBlock, `<!-- aip-scripts:start -->\n${tags}\n  <!-- aip-scripts:end -->`);
if (nextIndex !== index) writeFileSync(indexPath, nextIndex);

const staticAssets = [
  "./index.html",
  "./manifest.webmanifest",
  "./css/main.css",
  "./css/tokens.css",
  "./css/base.css",
  "./css/layout.css",
  "./css/components/overview.css",
  "./css/components/topic.css",
  "./css/components/topic-detail.css",
  "./css/components/quiz.css",
  "./css/components/responsive.css",
  ...scripts.map((file) => `./${file}`),
  "./icons/icon.svg",
  "./icons/app/icon-192.png",
  "./icons/app/icon-512.png",
  "./icons/app/icon-512-maskable.png",
  "./icons/browser/apple-touch-icon.png",
  "./icons/browser/favicon-32.png",
  "./icons/browser/favicon-48.png"
];
const swPath = join(root, "sw.js");
let sw = readFileSync(swPath, "utf8");
sw = sw.replace(/var CACHE = "[^"]+";/, 'var CACHE = "aip-c01-v' + cacheVersion + '";');
const body = staticAssets.map((file) => `  "${file}"`).join(",\n");
sw = sw.replace(/\/\* aip-precache:start \*\/[\s\S]*\/\* aip-precache:end \*\//, `/* aip-precache:start */\n${body}\n  /* aip-precache:end */`);
if (!sw.includes("aip-precache:start")) throw new Error("sw.js is missing precache markers");
writeFileSync(swPath, sw);
console.log("wired " + scripts.length + " scripts");
