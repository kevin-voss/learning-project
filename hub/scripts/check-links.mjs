// Checks every internal link of the built site (dist/site): plain HTML pages and
// the markdown inside sheet pages. Prints each broken link and exits with 1 if
// there is one. Run after build-site.mjs: node hub/scripts/check-links.mjs

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const OUT = join(ROOT, 'dist/site')

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path, files)
    else if (entry.name.endsWith('.html')) files.push(path)
  }
  return files
}

// Links a reader can click: href/src outside scripts, plus markdown links in sheets.
function linksOf(html) {
  const links = []
  const sheet = html.match(/<script type="application\/json" id="sheet-md">([\s\S]*?)<\/script>/)
  if (sheet) {
    const markdown = JSON.parse(sheet[1])
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`\n]*`/g, '')
    for (const m of markdown.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) links.push(m[1].replace(/\.md(?=$|[#?])/, '.html'))
    for (const m of markdown.matchAll(/(?:href|src)="([^"]+)"/g)) links.push(m[1].replace(/\.md(?=$|[#?])/, '.html'))
  }
  const markup = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
  for (const m of markup.matchAll(/\s(?:href|src)="([^"]+)"/g)) links.push(m[1])
  return links
}

function isInternal(link) {
  return link && !/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(link) && !/\$\{|\{\{/.test(link)
}

function exists(page, link) {
  const path = decodeURI(link.replace(/[#?].*$/, ''))
  const target = path.startsWith('/') ? join(OUT, path) : join(dirname(page), path)
  if (!existsSync(target)) return false
  return statSync(target).isDirectory() ? existsSync(join(target, 'index.html')) : true
}

if (!existsSync(OUT)) {
  console.error('dist/site is missing. Run: node hub/scripts/build-site.mjs')
  process.exit(1)
}

const broken = []
let checked = 0
for (const page of walk(OUT)) {
  for (const link of linksOf(readFileSync(page, 'utf8')).filter(isInternal)) {
    checked++
    if (!exists(page, link)) broken.push(`${relative(OUT, page)}  →  ${link}`)
  }
}

for (const line of broken) console.log(`broken: ${line}`)
console.log(`${checked} internal links checked, ${broken.length} broken`)
process.exit(broken.length ? 1 : 0)
