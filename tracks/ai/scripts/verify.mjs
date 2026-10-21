#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, normalize, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const errors = [];
const read = (path) => readFileSync(join(root, path), 'utf8');
const filesUnder = (directory) => readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? filesUnder(path) : [path];
});
const appSource = read('tracks/ai/js/runtime/data.js');
const routes = [...appSource.matchAll(/file:\s*'([^']+\.html)'/g)].map((match) => match[1]);
if (routes.length < 1) errors.push('Runtime metadata lists no topic routes');
if (new Set(routes).size !== routes.length) errors.push('Runtime metadata contains duplicate topic routes');
const index = read('tracks/ai/index.html');
const indexRoutes = [...index.matchAll(/<a\b[^>]*class="card"[^>]*href="content\/([^"]+\.html)"/g)].map((match) => match[1]);
if (routes.join('|') !== indexRoutes.join('|')) errors.push('AI index routes do not match runtime topic order');
if (!index.includes('href="../../hub/index.html"')) errors.push('Source AI index is missing the Learning hub link');
if ((index.match(/>Learning hub<\/a>/g) || []).length !== 1) errors.push('AI index should contain one Learning hub link');
if (index.includes('topbar-static')) errors.push('AI index disables the sticky header');

const idsFor = (html) => [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
for (const route of routes) {
  const path = `tracks/ai/content/${route}`;
  if (!existsSync(join(root, path))) { errors.push(`Missing topic page: ${path}`); continue; }
  const html = read(path);
  const ids = idsFor(html);
  const idSet = new Set(ids);
  if (ids.length !== idSet.size) errors.push(`${path}: duplicate heading or element IDs`);
  if (!/<h1\b/i.test(html)) errors.push(`${path}: missing primary heading`);
  for (const [, heading] of html.matchAll(/<h[23]\b([^>]*)>/gi)) {
    if (!/\bid=["'][^"']+["']/i.test(heading)) errors.push(`${path}: h2/h3 heading is missing a stable ID`);
  }
  if (!/\.\.\/\.\.\/\.\.\/\.\.\/hub\/index\.html/.test(html)) errors.push(`${path}: Learning hub URL is not rooted at repository hub`);
  if ((html.match(/>Learning hub<\/a>/g) || []).length !== 1) errors.push(`${path}: expected one header Learning hub link`);
  for (const [, href] of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    if (href.startsWith('#')) {
      const fragment = decodeURIComponent(href.slice(1));
      if (fragment && !idSet.has(fragment)) errors.push(`${path}: missing local anchor #${fragment}`);
      continue;
    }
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|mailto:|tel:|data:)/i.test(href)) continue;
    const [localPath, fragment] = href.split('#');
    const targetPath = normalize(join(dirname(path), localPath || path)).split(sep).join('/');
    if (!existsSync(join(root, targetPath))) { errors.push(`${path}: missing local target ${href}`); continue; }
    if (fragment && /\.html?$/.test(targetPath)) {
      let target;
      try { target = idsFor(read(targetPath)); } catch { target = []; }
      if (!target.includes(decodeURIComponent(fragment))) errors.push(`${path}: ${href} points to a missing anchor`);
    }
  }
  for (const [, href] of html.matchAll(/<link\b[^>]*\bhref=["']([^"']+\.css)["']/gi)) {
    const asset = normalize(join(dirname(path), href)).split(sep).join('/');
    if (!existsSync(join(root, asset))) errors.push(`${path}: missing stylesheet ${href}`);
  }
  const diagrams = [...html.matchAll(/<pre\b[^>]*class=["'][^"']*\bmermaid\b[^"']*["'][^>]*>([\s\S]*?)<\/pre>/gi)];
  for (const [, source] of diagrams) {
    const first = source.replace(/<!--[^]*?-->/g, '').trim().split(/\s+/)[0];
    if (!/^(?:flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|mindmap|timeline|sankey-beta|block-beta|packet-beta|architecture-beta|xychart-beta|quadrantChart|gitGraph)$/.test(first)) errors.push(`${path}: unrecognized Mermaid diagram declaration: ${first}`);
  }
}

const stylesheetPaths = ['tokens.css', 'base.css', 'components.css', 'flow.css'];
for (const route of routes) {
  const html = read(`tracks/ai/content/${route}`);
  const links = [...html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)/gi)].map((match) => match[1]);
  const local = links.filter((href) => href.startsWith('../../css/')).map((href) => href.slice('../../css/'.length));
  if (local.join('|') !== stylesheetPaths.join('|')) errors.push(`${route}: expected the stable four shared stylesheet URLs`);
}

const sourceFiles = filesUnder('tracks/ai').filter((path) => /\.(?:html?|css|m?js)$/.test(path));
for (const path of sourceFiles) {
  const source = read(path);
  const lines = source.split(/\r?\n/).length;
  if (lines > 400) errors.push(`${path}: ${lines} lines exceeds the 400-line source limit`);
  if (path.startsWith('tracks/ai/js/') && /\.innerHTML\s*=/.test(source)) errors.push(`${path}: runtime markup must not be stored as HTML strings`);
  if (path.startsWith('tracks/ai/js/') && /<(?:h[1-6]|p|section|article|table|li)\b[^>]*>/i.test(source)) errors.push(`${path}: lesson markup must remain in HTML pages`);
}
const htmlFiles = filesUnder('tracks/ai').filter((path) => path.endsWith('.html') && !path.includes('/content/'));
for (const path of htmlFiles) if (statSync(join(root, path)).isFile() && read(path).includes('Learning hub')) {
  const html = read(path);
  if (path.endsWith('index.html') && !html.includes('href="../../hub/index.html"')) errors.push(`${path}: incorrect Learning hub route`);
}
if (/max-width:\s*760px/.test(read('tracks/ai/css/base.css')) || /--content-w/.test(read('tracks/ai/css/tokens.css'))) errors.push('Topic content container still has the old narrow width cap');
if (/\.diagram svg\s*\{[^}]*max-width:\s*[^n]/s.test(read('tracks/ai/css/components.css'))) errors.push('Mermaid SVG retains a CSS max-width cap');

if (errors.length) {
  console.error(`AI verifier: ${errors.length} issue(s)`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`AI verifier: passed (${routes.length} ordered topic routes, local links and anchors, shared assets, Mermaid declarations, and source limits)`);
}
