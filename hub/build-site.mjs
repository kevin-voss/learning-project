// Builds the static site Vercel serves (see /vercel.json).
// Copies the content buckets into dist/site and turns every .md into an .html
// page (rendered in the browser with marked), so the hub can link to all of it.
// Run from the repo root: node hub/build-site.mjs

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

const OUT = 'dist/site'
const BUCKETS = ['hub', 'docs', 'tracks', 'projects', 'drills', 'programs']
const SKIP = new Set(['node_modules', 'dist', 'target', 'solutions'])
const MARKED = 'https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.12/marked.min.js'

// Relative links ending in .md become .html (absolute URLs are left alone).
const MD_LINK = /(href=")([^":#?]+)\.md([#?][^"]*)?"/g

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || SKIP.has(entry.name)) continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path, files)
    else files.push(path)
  }
  return files
}

function sheetPage(markdown, title) {
  const data = JSON.stringify(markdown).replace(/</g, '\\u003c')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title.replace(/[<&]/g, '')} · Learning Project</title>
  <link rel="stylesheet" href="/hub/landing.css">
  <style>
    .sheet { max-width: 860px; margin: 0 auto; padding: 24px 16px 64px; }
    .sheet table { border-collapse: collapse; display: block; overflow-x: auto; }
    .sheet th, .sheet td { border: 1px solid var(--line); padding: 6px 10px; text-align: left; vertical-align: top; }
    .sheet pre { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 12px; overflow-x: auto; }
    .sheet a { color: var(--cs); }
    .sheet-home { display: inline-block; margin-bottom: 8px; color: var(--muted); }
  </style>
</head>
<body>
  <main class="sheet">
    <a class="sheet-home" href="/hub/">← Learning Project index</a>
    <article id="sheet">Loading…</article>
  </main>
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
  </script>
</body>
</html>
`
}

rmSync(OUT, { recursive: true, force: true })

for (const file of BUCKETS.flatMap((bucket) => walk(bucket))) {
  const target = join(OUT, file)
  mkdirSync(dirname(target), { recursive: true })

  if (file.endsWith('.md')) {
    const markdown = readFileSync(file, 'utf8')
    const title = markdown.match(/^#\s+(.+)$/m)?.[1] ?? relative('.', file)
    const page = sheetPage(markdown, title)
    writeFileSync(target.replace(/\.md$/, '.html'), page)
    // A folder with a README but no index.html opens on the README.
    const index = join(dirname(target), 'index.html')
    if (file.endsWith('README.md') && !existsSync(join(dirname(file), 'index.html'))) {
      writeFileSync(index, page)
    }
  } else if (file.endsWith('.html')) {
    writeFileSync(target, readFileSync(file, 'utf8').replace(MD_LINK, '$1$2.html$3"'))
  } else {
    copyFileSync(file, target)
  }
}

console.log(`Built ${OUT}`)
