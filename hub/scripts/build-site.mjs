// Builds the static site Vercel serves (see /vercel.json).
// Refreshes the landing page (path, students, catalog), writes hub/path.json for
// the step bar, copies the content buckets into dist/site, turns
// every .md into an .html page (rendered in the browser with marked) and gives
// every source file (.java, .py, …) a readable code page next to it.
// Run from anywhere: node hub/scripts/build-site.mjs

import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathSteps, writeCatalog } from './catalog.mjs'
import { HEADER } from './header.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const OUT = join(ROOT, 'dist/site')
const BUCKETS = ['hub', 'docs', 'sheets', 'tracks', 'projects', 'drills', 'programs', 'students']
// scripts/ folders are tooling (builders, verifiers, scrapers), not pages.
const SKIP = new Set(['node_modules', 'dist', 'target', 'solutions', '_template', 'scripts'])
const CODE = { '.java': 'java', '.py': 'python', '.sql': 'sql', '.sh': 'bash', '.kt': 'kotlin', '.go': 'go' }
const MARKED = 'https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.12/marked.min.js'
const HLJS = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0'
const MERMAID = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js'

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

// One theme on every page (hub/theme/): tokens and components in <head>,
// the animation player and the progress script at the end of <body>.
const THEME_INIT = `<script>try { const t = JSON.parse(localStorage.getItem('learning-project:theme')); if (t) document.documentElement.dataset.theme = t } catch {}</script>`
const THEME_HEAD = [THEME_INIT, ...['tokens.css', 'components.css', 'anim/anim.css']
  .map((file) => `<link rel="stylesheet" href="/hub/theme/${file}">`)].join('\n  ')
const THEME_BODY = ['/hub/theme/anim/scenes.js', '/hub/theme/anim/player.js', '/hub/progress.js']
  .map((src) => `<script src="${src}" defer></script>`).join('\n  ')

// "Home › sheets › javascript › dom.md": every folder that has a page is a link.
function crumbs(file) {
  const parts = file.split('/')
  const links = parts.slice(0, -1).map((name, i) => {
    const dir = parts.slice(0, i + 1).join('/')
    const page = ['index.html', 'README.md'].some((entry) => existsSync(join(ROOT, dir, entry)))
    return page && !(basename(file) === 'README.md' && i === parts.length - 2)
      ? `<a href="/${dir}/">${escape(name)}</a>`
      : `<span>${escape(name)}</span>`
  })
  const here = basename(file) === 'README.md' ? parts.at(-2) : parts.at(-1)
  if (basename(file) === 'README.md') links.pop()
  return `<nav class="lp-crumbs" aria-label="You are here"><a href="/hub/">Home</a> › ${[...links, `<span aria-current="page">${escape(here)}</span>`].join(' › ')}</nav>`
}

function shell(title, file, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escape(title)} · Learning Project</title>
  ${THEME_HEAD}
</head>
<body class="lp-page">
  ${HEADER}
  ${crumbs(file)}
  <main class="lp-sheet">
${body}
  </main>
  <script src="${HLJS}/highlight.min.js" defer></script>
  <script src="${MERMAID}" defer></script>
  <script src="/hub/sheet.js" defer></script>
  ${THEME_BODY}
</body>
</html>
`
}

// The markdown is rendered in the browser by hub/sheet.js (boxes, mermaid, code, links).
function sheetPage(markdown, title, file) {
  const data = JSON.stringify(markdown).replace(/</g, '\\u003c')
  return shell(title, file, `    <article id="sheet">Loading…</article>
  <script type="application/json" id="sheet-md">${data}</script>
  <script src="${MARKED}"></script>`)
}

function codePage(source, file) {
  const language = CODE[extname(file)]
  const dir = dirname(join(ROOT, file))
  const folder = ['README.md', 'index.html'].some((name) => existsSync(join(dir, name))) ? '<a href="./">← Folder</a> · ' : ''
  return shell(basename(file), file, `    <h1>${escape(basename(file))}</h1>
    <p>${folder}<a href="${basename(file)}" download>Download ${escape(basename(file))}</a></p>
    <pre><code class="language-${language}">${escape(source)}</code></pre>`)
}

// Every page outside the hub gets the theme, the site header and the progress
// script: it shows which path step the page is and lets the student tick it
// (see hub/progress.js).
function withTheme(html) {
  if (!html.includes('</body>')) return html
  const head = html.includes('</head>') ? html.replace('</head>', `  ${THEME_HEAD}\n</head>`) : html
  return head.replace(/<body[^>]*>/, (body) => `${body}\n  ${HEADER}`).replace('</body>', `${THEME_BODY}\n</body>`)
}

// Source files next to a README are listed under it, so my-solution/ and solution/
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
    // Hub pages and generated student task pages already include the theme + header.
    writeFileSync(target, file.startsWith('hub/') || html.includes('lp-global') ? html : withTheme(html))
  } else {
    copyFileSync(source, target)
    if (CODE[extname(file)]) writeFileSync(`${target}.html`, codePage(readFileSync(source, 'utf8'), file))
  }
}

const steps = pathSteps().map(({ id, n, title, url, optional }) => ({ id, n, title, url, optional }))
writeFileSync(join(OUT, 'hub/path.json'), JSON.stringify(steps))

console.log(`Built ${relative(process.cwd(), OUT) || '.'}`)
