// Writes the generated part of hub/index.html (between the catalog markers):
// every track, sheet, project, practice set, doc and student task found on disk.
// Nothing is listed by hand, so a new folder shows up on the landing page by itself.
//
// Runs inside build-site.mjs and students/scripts/new-task.mjs. By hand, from anywhere:
//   node hub/scripts/catalog.mjs

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const HUB = join(ROOT, 'hub')
const START = '<!-- catalog:start -->'
const END = '<!-- catalog:end -->'
const SKIP = new Set(['node_modules', 'dist', 'target', 'solutions', '_template', 'scripts'])
// Authoring notes: still published, just not listed for learners.
const HIDDEN = new Set(['tracks/ai/content/README.md'])

// Top-level cards: a short title and one sentence. Folders missing here still
// appear, with the README heading and first paragraph instead.
const META = {
  'tracks/computer-science': { tag: 'cs', title: 'Computer science', blurb: '52 interactive lessons: memory, data structures, algorithms, Linux, networks, Git and Docker intros.' },
  'tracks/java': { tag: 'java', title: 'Java hub', blurb: 'The main language path. One topic per page, from setup to design patterns.' },
  'tracks/spring-boot': { tag: 'java', title: 'Spring Boot · ParcelPilot', blurb: 'Build one backend product step by step, from a first API to queues, services and JWT. Layer F.' },
  'tracks/architecture': { tag: 'systems', title: 'Architecture & system design', blurb: 'Load balancing, caches, layers, data and messaging trade-offs, with diagrams.' },
  'tracks/ai': { tag: 'systems', title: 'AI engineering field guide', blurb: '31 chapters: LLM internals, tokens, RAG, tools and MCP, agents, memory, security, evals.' },
  'tracks/certifications/aws-genai-pro': { tag: 'certs', title: 'AWS GenAI Pro (AIP-C01)', blurb: 'Exam prep app: 28 chapters, question bank and mock exams.' },
  'drills/javascript': { tag: 'js', title: 'JavaScript drills', blurb: 'Eight topics with ten tested tasks each. Run them with make test.' },
  'programs/code-for-cleaning': { tag: 'java', title: 'Code for Cleaning', blurb: 'Real-life Java tasks in rounds: passwords, budgets, calendars, a small server check.' },
  'projects/docs/java': { tag: 'java', blurb: 'Layers A–C in one page: files, packages, types, collections, Maven, plus the server picture for Layer D.' },
  'docs/learner-memory': { tag: 'cs', title: 'Learner memory', blurb: 'The long-term learner profile: schema, events and integrations.' },
}

const ORDER = {
  tracks: ['computer-science', 'java', 'spring-boot', 'architecture', 'ai', 'certifications'],
  'projects/docs': ['setup', 'git', 'html', 'css', 'javascript', 'java', 'docker', 'nodejs', 'npm', 'react', 'typescript'],
  projects: ['00-static-page', '01-weather-dashboard', '05-java-weather-cli', '02-docker-portfolio', '03-cli-tool', '04-react-todo-app'],
}

const SHEET_TAGS = { java: 'java', docker: 'systems', git: 'cs', setup: 'cs' }

const escape = (text) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const read = (file) => readFileSync(join(ROOT, file), 'utf8')
const isDir = (path) => existsSync(join(ROOT, path)) && statSync(join(ROOT, path)).isDirectory()
const href = (path) => relative('hub', path).split('\\').join('/')

function plain(markdown) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*|__|[*`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function pretty(name) {
  const text = name.replace(/\.(md|html)$/, '').replace(/-/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function isRedirect(file) {
  return file.endsWith('.html') && /http-equiv=["']?refresh/i.test(read(file))
}

function decode(text) {
  return text.replace(/&(amp|lt|gt|quot|#39);/g, (m, e) => ({ amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'" })[e])
}

function pageTitle(file) {
  if (file.endsWith('.md')) {
    const heading = read(file).match(/^#\s+(.+)$/m)?.[1]
    return heading ? plain(heading) : pretty(basename(file))
  }
  const title = decode(read(file).match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? '')
  if (!title) return pretty(basename(file))
  const parts = title.split(' · ')
  return parts.length > 1 ? parts.slice(0, -1).join(' · ') : title
}

function firstParagraph(file) {
  if (!file?.endsWith('.md')) return ''
  const blocks = read(file).split(/\n\s*\n/).map((b) => b.trim())
  // Skip headings, tables, lists, code and "**Scope:** …" label lines.
  const text = blocks.find((b) => b && !/^(#|\||```|<|-|\d+\.|>)/.test(b) && !/^\*\*[^*]*(:\*\*|\*\*:)/.test(b)) ?? ''
  const clean = plain(text)
  return clean.length > 150 ? `${clean.slice(0, 147).replace(/\s+\S*$/, '')}…` : clean
}

function entryOf(dir) {
  for (const name of ['index.html', 'README.md']) {
    const path = join(dir, name)
    if (existsSync(join(ROOT, path)) && !HIDDEN.has(path)) return path
  }
  return null
}

function sortNames(names, order = []) {
  const rank = (name) => (order.includes(name) ? order.indexOf(name) : order.length)
  return [...names].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b, 'en', { numeric: true }))
}

function children(dir) {
  return sortNames(readdirSync(join(ROOT, dir)).filter((name) => !name.startsWith('.') && !SKIP.has(name)), ORDER[dir])
}

// A folder as a tree: its loose pages plus one branch per subfolder with pages.
function tree(dir) {
  const items = []
  for (const name of children(dir)) {
    const path = join(dir, name)
    if (isDir(path)) {
      const branch = tree(path)
      const entry = entryOf(path)
      if (entry || branch.length) items.push({ title: entry ? pageTitle(entry) : pretty(name), path: entry, items: branch })
    } else if (/\.(md|html)$/.test(name) && !['README.md', 'index.html'].includes(name) && !isRedirect(path)) {
      items.push({ title: pageTitle(path), path })
    }
  }
  return items
}

const countPages = (items) => items.reduce((sum, item) => sum + (item.path ? 1 : 0) + countPages(item.items ?? []), 0)

function renderTree(items) {
  const lis = items.map((item) => {
    const label = item.path ? `<a href="${href(item.path)}">${escape(item.title)}</a>` : `<span>${escape(item.title)}</span>`
    return `<li>${label}${item.items?.length ? renderTree(item.items) : ''}</li>`
  })
  return `<ul class="tree">${lis.join('')}</ul>`
}

function card(dir, tag = 'cs') {
  const entry = entryOf(dir)
  const meta = META[dir] ?? {}
  let items = tree(dir)
  // A lone folder without its own page (like tracks/java/topics) adds no information.
  if (items.length === 1 && !items[0].path) items = items[0].items
  const pages = countPages(items)
  const title = meta.title ?? (entry ? pageTitle(entry) : pretty(basename(dir)))
  const blurb = meta.blurb ?? firstParagraph(entry ?? '')
  const heading = entry ? `<a href="${href(entry)}">${escape(title)}</a>` : escape(title)
  return `<article class="card ${meta.tag ?? tag}">
            <div class="card-path">${escape(dir)}/</div>
            <h3>${heading}</h3>
            ${blurb ? `<p>${escape(blurb)}</p>` : ''}
            ${pages ? `<details><summary>Show ${pages} page${pages === 1 ? '' : 's'}</summary>${renderTree(items)}</details>` : ''}
          </article>`
}

// Folders without their own entry page (like tracks/certifications) are unpacked.
function cardDirs(root, filter = () => true) {
  return children(root)
    .map((name) => join(root, name))
    .filter((path) => isDir(path) && filter(basename(path)))
    .flatMap((path) => (entryOf(path) ? [path] : cardDirs(path)))
}

function section({ id, eyebrow, title, intro, body }) {
  return `<section class="section" id="${id}">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">${eyebrow}</div>
            <h2>${title}</h2>
          </div>
          <p>${intro}</p>
        </div>
        ${body}
      </div>
    </section>`
}

const grid = (cards) => `<div class="card-grid">
          ${cards.join('\n          ')}
        </div>`

// Status per task comes from the subject README table: | 04 | [Title](04-slug/README.md) | todo |
function taskStatus(subjectDir) {
  const file = join(subjectDir, 'README.md')
  const status = {}
  if (!existsSync(join(ROOT, file))) return status
  for (const match of read(file).matchAll(/^\|[^|\n]*\|\s*\[[^\]]*\]\(([^/)]+)\/[^)]*\)\s*\|\s*([^|\n]+?)\s*\|/gm)) {
    status[match[1]] = match[2]
  }
  return status
}

function studentCard(studentDir) {
  const name = pageTitle(join(studentDir, 'README.md'))
  const subjects = cardDirs(studentDir).map((subjectDir) => {
    const status = taskStatus(subjectDir)
    const tasks = children(subjectDir).filter((task) => isDir(join(subjectDir, task)) && entryOf(join(subjectDir, task)))
    const rows = tasks.map((task) => {
      const dir = join(subjectDir, task)
      const state = status[task] ?? 'todo'
      const parts = [['Task', 'TASK.md'], ['Starter', 'starter/README.md'], ['Solution', 'solution/README.md']]
        .filter(([, file]) => existsSync(join(ROOT, dir, file)))
        .map(([label, file]) => `<a href="${href(join(dir, file))}">${label}</a>`)
      return `<li><span class="task-num">${escape(task.split('-')[0])}</span><a class="task-title" href="${href(join(dir, 'README.md'))}">${escape(pageTitle(join(dir, 'README.md')).replace(/^\d+\s*·\s*/, ''))}</a><span class="status ${escape(state.replace(/\s+/g, '-'))}">${escape(state)}</span><span class="task-links">${parts.join('')}</span></li>`
    })
    return `<h4><a href="${href(join(subjectDir, 'README.md'))}">${escape(pageTitle(join(subjectDir, 'README.md')).split(' · ').pop())}</a></h4>
            <ul class="task-list">${rows.join('') || '<li>No tasks yet.</li>'}</ul>`
  })
  return `<article class="card student">
            <div class="card-path">${escape(studentDir)}/</div>
            <h3><a href="${href(join(studentDir, 'README.md'))}">${escape(name)}</a></h3>
            ${subjects.join('\n            ')}
          </article>`
}

export function renderCatalog() {
  const students = cardDirs('students').filter((dir) => existsSync(join(ROOT, dir, 'README.md')))
  const sections = [
    {
      id: 'tracks', eyebrow: 'Deep courses', title: 'Tracks',
      intro: 'One canonical home per subject. Sheets and projects link here instead of repeating it.',
      body: grid(cardDirs('tracks').map((dir) => card(dir))),
    },
    {
      id: 'sheets', eyebrow: 'Read in 5–20 minutes', title: 'Sheets',
      intro: 'Short topic pages you read right before a project. <a href="../projects/docs/README.md">Sheet library</a> · <a href="../projects/docs/roadmap.md">Project roadmap</a>.',
      body: grid(cardDirs('projects/docs').map((dir) => card(dir, SHEET_TAGS[basename(dir)] ?? 'js'))),
    },
    {
      id: 'projects', eyebrow: 'Build in hours, not weeks', title: 'Projects',
      intro: 'Small builds in roadmap order. Each has a step-by-step guide and help pages. <a href="../projects/README.md">Projects overview</a>.',
      body: grid(cardDirs('projects', (name) => /^\d+-/.test(name)).map((dir) => card(dir, 'projects'))),
    },
    {
      id: 'practice', eyebrow: 'Repetition', title: 'Practice',
      intro: 'Drills and task programs to run locally after you clone the repo.',
      body: grid([...cardDirs('drills'), ...cardDirs('programs')].map((dir) => card(dir, 'js'))),
    },
    {
      id: 'students', eyebrow: 'Personal tasks', title: 'Students',
      intro: 'Every student has a folder with one box per task: read me, task, starter, solution. Everyone can see every task. <a href="../students/README.md">How tasks work</a>.',
      body: grid(students.map(studentCard)),
    },
    {
      id: 'docs', eyebrow: 'Reference', title: 'Docs',
      intro: 'The roadmap in full and the long-term learner profile.',
      body: grid([
        `<article class="card cs">
            <div class="card-path">docs/LEARNING_PATH.md</div>
            <h3><a href="../docs/LEARNING_PATH.md">Learning path</a></h3>
            <p>The one ordered roadmap with phases, gates and the project map.</p>
          </article>`,
        ...cardDirs('docs').map((dir) => card(dir)),
      ]),
    },
  ]
  return sections.map(section).join('\n\n    ')
}

export function writeCatalog() {
  const file = join(HUB, 'index.html')
  const html = readFileSync(file, 'utf8')
  const start = html.indexOf(START)
  const end = html.indexOf(END)
  if (start === -1 || end < start) throw new Error(`no catalog markers in ${relative(process.cwd(), file)}`)
  const next = `${html.slice(0, start)}${START}\n    ${renderCatalog()}\n    ${html.slice(end)}`
  if (next !== html) writeFileSync(file, next)
  return next !== html
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(writeCatalog() ? 'Updated hub/index.html' : 'hub/index.html is up to date')
}
