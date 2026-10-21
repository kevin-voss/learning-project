// Builds the static site Vercel serves (see /vercel.json).
// Refreshes the hub catalog, copies the content buckets into dist/site, turns
// every .md into an .html page (rendered in the browser with marked) and gives
// every source file (.java, .py, …) a readable code page next to it.
// Run from anywhere: node hub/scripts/build-site.mjs

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeCatalog } from './catalog.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const OUT = join(ROOT, 'dist/site')
const BUCKETS = ['hub', 'docs', 'tracks', 'projects', 'drills', 'programs', 'students']
const SKIP = new Set(['node_modules', 'dist', 'target', 'solutions', '_template'])
const CODE = { '.java': 'java', '.py': 'python', '.sql': 'sql', '.sh': 'bash', '.kt': 'kotlin', '.go': 'go' }
const MARKED = 'https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.12/marked.min.js'
const HLJS = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0'

// Relative links ending in .md become .html (absolute URLs are left alone).
const MD_LINK = /(href=")([^":#?]+)\.md([#?][^"]*)?"/g

function walk(dir, files = []) {
  for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    if (entry.name.startsWith('.') || SKIP.has(entry.name)) continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path, files)
    else files.push(path)
  }
  return files
}

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function shell(title, file, body, head = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escape(title)} · Learning Project</title>
  <link rel="stylesheet" href="/hub/landing.css">
  ${head}
</head>
<body>
  <main class="sheet">
    <nav class="sheet-nav"><a href="/hub/">← Learning Project</a><span>${escape(file)}</span></nav>
${body}
  </main>
</body>
</html>
`
}

function sheetPage(markdown, title, file) {
  const data = JSON.stringify(markdown).replace(/</g, '\\u003c')
  return shell(title, file, `    <article id="sheet">Loading…</article>
  <script type="application/json" id="sheet-md">${data}</script>
  <script src="${MARKED}"></script>
  <script>
    const md = JSON.parse(document.getElementById('sheet-md').textContent)
    const article = document.getElementById('sheet')
    article.innerHTML = marked.parse(md)
    for (const a of article.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href')
      if (!/^[a-z]+:/i.test(href)) a.setAttribute('href', href.replace(/\\.md(?=$|[#?])/, '.html'))
    }
  </script>`)
}

function codePage(source, file) {
  const language = CODE[extname(file)]
  const dir = dirname(join(ROOT, file))
  const folder = ['README.md', 'index.html'].some((name) => existsSync(join(dir, name))) ? '<a href="./">← Folder</a> · ' : ''
  return shell(basename(file), file, `    <p>${folder}<a href="${basename(file)}" download>Download ${escape(basename(file))}</a></p>
    <pre><code class="language-${language}">${escape(source)}</code></pre>
  <script src="${HLJS}/highlight.min.js"></script>
  <script>hljs.highlightAll()</script>`, `<link rel="stylesheet" href="${HLJS}/styles/github.min.css">`)
}

// Pages of the tracks get a small way back to the hub unless they link there already.
const HUB_LINK = '<a class="hub-pill" href="/hub/" style="position:fixed;left:12px;bottom:12px;z-index:9999;padding:6px 12px;border-radius:999px;background:#172033;color:#fff;font:600 13px/1.2 system-ui,sans-serif;text-decoration:none;opacity:.85">← Learning Project</a>'

function withHubLink(html) {
  if (/href="[^"]*hub\/(index\.html)?"/.test(html) || !html.includes('</body>')) return html
  return html.replace('</body>', `${HUB_LINK}\n</body>`)
}

// Source files next to a README are listed under it, so starter/ and solution/
// pages show their code on the website too.
function withCodeList(markdown, dir) {
  const files = readdirSync(join(ROOT, dir)).filter((name) => CODE[extname(name)]).sort()
  if (!files.length) return markdown
  return `${markdown.trimEnd()}\n\n---\n\n**Code files in this folder:** ${files.map((name) => `[${name}](${name}.html)`).join(' · ')}\n`
}

if (writeCatalog()) console.log('Updated hub/index.html catalog')
rmSync(OUT, { recursive: true, force: true })

for (const file of BUCKETS.flatMap((bucket) => walk(bucket))) {
  const target = join(OUT, file)
  mkdirSync(dirname(target), { recursive: true })
  const source = join(ROOT, file)

  if (file.endsWith('.md')) {
    let markdown = readFileSync(source, 'utf8')
    if (basename(file) === 'README.md') markdown = withCodeList(markdown, dirname(file))
    const title = markdown.match(/^#\s+(.+)$/m)?.[1] ?? file
    const page = sheetPage(markdown, title, file)
    writeFileSync(target.replace(/\.md$/, '.html'), page)
    // A folder with a README but no index.html opens on the README.
    if (basename(file) === 'README.md' && !existsSync(join(dirname(source), 'index.html'))) {
      writeFileSync(join(dirname(target), 'index.html'), page)
    }
  } else if (file.endsWith('.html')) {
    const html = readFileSync(source, 'utf8').replace(MD_LINK, '$1$2.html$3"')
    writeFileSync(target, file.startsWith('hub/') ? html : withHubLink(html))
  } else {
    copyFileSync(source, target)
    if (CODE[extname(file)]) writeFileSync(`${target}.html`, codePage(readFileSync(source, 'utf8'), file))
  }
}

console.log(`Built ${relative(process.cwd(), OUT) || '.'}`)
