// Writes the generated parts of hub/index.html:
//   path      the learning path from hub/path.mjs (checked: every link must exist)
//   students  every student and task found under students/
//   catalog   "look it up": every course, sheet, project, practice set and doc on disk
// Only the path order is written by hand; new folders show up by themselves.
//
// Runs inside build-site.mjs and students/scripts/new-uebung.mjs. By hand, from anywhere:
//   node hub/scripts/catalog.mjs

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { LEVELS, STAGES } from '../path.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const HUB = join(ROOT, 'hub')
const SKIP = new Set(['node_modules', 'dist', 'target', 'solutions', '_template', 'scripts'])
// Authoring notes: still published, just not listed for learners.
const HIDDEN = new Set(['tracks/ai/content/README.md'])

// Top-level cards: a short title and one sentence. Folders missing here still
// appear, with the README heading and first paragraph instead.
const META = {
  'tracks/computer-science': { tag: 'cs', title: 'Computer science', blurb: '49 interactive lessons with demos: terminal, Git, memory, data structures, algorithms, the web, databases, Docker.' },
  'tracks/java': { tag: 'java', title: 'Java hub', blurb: 'The main language path. One topic per page, from setup to design patterns.' },
  'tracks/spring-boot': { tag: 'java', title: 'Spring Boot · ParcelPilot', blurb: 'Build one backend product step by step, from a first API to queues, services and JWT.' },
  'tracks/architecture': { tag: 'systems', title: 'Architecture & system design', blurb: 'Load balancing, caches, layers, data and messaging trade-offs, with diagrams.' },
  'tracks/ai': { tag: 'systems', title: 'AI engineering field guide', blurb: '31 chapters: LLM internals, tokens, RAG, tools and MCP, agents, memory, security, evals.' },
  'tracks/certifications/aws-genai-pro': { tag: 'certs', title: 'AWS GenAI Pro (AIP-C01)', blurb: 'Exam prep app: 28 chapters, question bank and mock exams.' },
  'drills/javascript': { tag: 'js', title: 'JavaScript drills', blurb: 'Eight topics with ten tested tasks each. Run them with make test.' },
  'programs/code-for-cleaning': { tag: 'java', title: 'Code for Cleaning', blurb: 'Real-life Java tasks in rounds: passwords, budgets, calendars, a small server check.' },
  'sheets/java': { tag: 'java', blurb: 'Where each Java topic lives, plus the server picture: controller, service, repository.' },
  'projects/extras': { tag: 'projects', title: 'Extra projects', blurb: 'Optional builds off the main path: Docker for your page, a React todo app.' },
  'docs/learner-memory': { tag: 'cs', title: 'Learner memory', blurb: 'The long-term learner profile: schema, events and integrations.' },
}

const ORDER = {
  tracks: ['computer-science', 'java', 'spring-boot', 'architecture', 'ai', 'certifications'],
  sheets: ['start', 'setup', 'git', 'html', 'css', 'javascript', 'java', 'nodejs', 'npm', 'react', 'typescript'],
}

const SHEET_TAGS = { java: 'java', git: 'cs', setup: 'cs', start: 'cs' }

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

const grid = (cards) => `<div class="card-grid">
          ${cards.join('\n          ')}
        </div>`

// Status per Aufgabe comes from the Übung README table:
//   | 04_1 | [Aktenordner](aufgabe-04-1-aktenordner/README.md) | todo |
function aufgabeStatus(uebungDir) {
  const status = {}
  for (const match of read(join(uebungDir, 'README.md')).matchAll(/^\|[^|\n]*\|\s*\[[^\]]*\]\(([^/)]+)\/[^)]*\)\s*\|\s*([^|\n]+?)\s*\|/gm)) {
    status[match[1]] = match[2]
  }
  return status
}

const subfolders = (dir, prefix) => children(dir).filter((name) => name.startsWith(prefix) && isDir(join(dir, name)))

// students/<student>/<subject>/uebungen/uebung-NN-…/aufgabe-NN-k-…/
function studentCard(studentDir) {
  const subjects = cardDirs(studentDir).map((subjectDir) => {
    const uebungenDir = join(subjectDir, 'uebungen')
    const uebungen = isDir(uebungenDir) ? subfolders(uebungenDir, 'uebung-') : []
    const blocks = uebungen.map((uebung) => {
      const uebungDir = join(uebungenDir, uebung)
      const status = aufgabeStatus(uebungDir)
      const rows = subfolders(uebungDir, 'aufgabe-').map((aufgabe) => {
        const dir = join(uebungDir, aufgabe)
        const state = status[aufgabe] ?? 'todo'
        const [, nn, k] = aufgabe.split('-')
        const links = [['Meine Lösung', 'meine-loesung/README.md'], ['Musterlösung', 'musterloesung/README.md']]
          .filter(([, file]) => existsSync(join(ROOT, dir, file)))
          .map(([label, file]) => `<a href="${href(join(dir, file))}">${label}</a>`)
        const title = pageTitle(join(dir, 'README.md')).replace(/^Aufgabe\s+\S+\s*·\s*/, '')
        return `<li><span class="task-num">${escape(`${nn}_${k}`)}</span><a class="task-title" href="${href(join(dir, 'README.md'))}">${escape(title)}</a><span class="status ${escape(state.replace(/\s+/g, '-'))}">${escape(state)}</span><span class="task-links">${links.join('')}</span></li>`
      })
      return `<p class="uebung"><a href="${href(join(uebungDir, 'README.md'))}">${escape(pageTitle(join(uebungDir, 'README.md')))}</a></p>
            <ul class="task-list">${rows.join('') || '<li>No Aufgaben yet.</li>'}</ul>`
    })
    return `<h4><a href="${href(join(subjectDir, 'README.md'))}">${escape(pageTitle(join(subjectDir, 'README.md')).split(' · ').pop())}</a></h4>
            ${blocks.join('\n            ') || '<p>No Übungen yet.</p>'}`
  })
  return `<article class="card student">
            <div class="card-path">${escape(studentDir)}/</div>
            <h3><a href="${href(join(studentDir, 'README.md'))}">${escape(pageTitle(join(studentDir, 'README.md')))}</a></h3>
            ${subjects.join('\n            ')}
          </article>`
}

// Turns a path href into the URL the site serves, the way the browser sees it:
// .md becomes .html, index.html / README.html become the folder.
function siteURL(path) {
  const [file, hash = ''] = path.split('#')
  return `/${file.replace(/\.md$/, '.html').replace(/(index|README)\.html$/, '')}${hash ? `#${hash}` : ''}`
}

// Every step, numbered, with its site URL. Optional steps get no number.
export function pathSteps() {
  let n = 0
  return STAGES.flatMap((stage) => stage.steps.map((step) => {
    if (step.href) {
      const [file, hash] = step.href.split('#')
      if (!existsSync(join(ROOT, file))) throw new Error(`path step "${step.id}": ${file} does not exist`)
      if (hash && !CS_LESSONS.has(hash)) throw new Error(`path step "${step.id}": no computer-science lesson "${hash}"`)
    }
    return { ...step, stage: stage.id, optional: Boolean(stage.optional), n: stage.optional ? null : ++n, url: step.href ? siteURL(step.href) : null }
  }))
}

// Lesson ids of the computer-science track, so '#lesson-id' links can be checked.
function lessonIds(dir, ids = new Set()) {
  for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) lessonIds(path, ids)
    else for (const m of read(path).matchAll(/\bid:\s*['"]([a-z0-9-]+)['"]/g)) ids.add(m[1])
  }
  return ids
}
const CS_LESSONS = lessonIds('tracks/computer-science/js/data')

const TYPE_LABEL = { read: 'Read', do: 'Do', check: 'Check' }

function renderStage(stage, number, steps) {
  const items = steps.filter((step) => step.stage === stage.id).map((step) => {
    const label = step.href ? `<a href="${href(step.href)}">${escape(step.title)}</a>` : `<span>${escape(step.title)}</span>`
    return `<li class="step ${step.type}" id="${step.id}" data-step="${step.id}" data-type="${step.type}"${step.time ? ` data-time="${escape(step.time)}"` : ''}${step.optional ? ' data-optional' : ''}>
            <input type="checkbox" aria-label="Done: ${escape(step.title)}">
            <span class="step-num">${step.n ?? '+'}</span>
            <span class="step-type">${TYPE_LABEL[step.type]}</span>
            <span class="step-title">${label}</span>
            ${step.time ? `<span class="step-time">${escape(step.time)}</span>` : ''}
          </li>`
  })
  return `<details class="stage" data-stage="${stage.id}"${stage.optional ? ' data-optional' : ''}>
        <summary><span class="stage-num">${stage.optional ? 'Extra' : `Stage ${number}`}</span><span class="stage-title">${escape(stage.title)}</span><span class="stage-count"></span></summary>
        <p class="stage-goal">${escape(stage.goal)}</p>
        <ol class="steps">
          ${items.join('\n          ')}
        </ol>
      </details>`
}

// Levels → stages → steps. Stage numbers run on across levels; extras come last.
function renderPath() {
  const steps = pathSteps()
  const main = STAGES.filter((stage) => !stage.optional)
  const levels = LEVELS.map((level, index) => {
    const stages = main.filter((stage) => stage.level === level.id)
    return `<section class="level" data-level="${level.id}" data-level-title="Level ${index + 1} · ${escape(level.title)}">
        <header class="level-head"><span class="level-num">Level ${index + 1}</span><h3>${escape(level.title)}</h3><p>${escape(level.goal)}</p><span class="level-count"></span></header>
        ${stages.map((stage) => renderStage(stage, main.indexOf(stage) + 1, steps)).join('\n        ')}
      </section>`
  })
  const extras = STAGES.filter((stage) => stage.optional).map((stage) => renderStage(stage, null, steps))
  return [...levels, ...extras].join('\n      ')
}

function renderStudents() {
  const students = cardDirs('students').filter((dir) => existsSync(join(ROOT, dir, 'README.md')))
  const options = students.map((dir) => `<option value="${escape(basename(dir))}">${escape(pageTitle(join(dir, 'README.md')))}</option>`)
  return `<label class="student-pick">I am <select id="student-select"><option value="">pick your name</option>${options.join('')}</select></label>
        <div class="card-grid">
          ${students.map((dir) => studentCard(dir).replace('<article class="card student">', `<article class="card student" data-student="${escape(basename(dir))}">`)).join('\n          ')}
        </div>`
}

function renderLibrary() {
  const groups = [
    ['Courses', 'Big topics with many lessons.', cardDirs('tracks').map((dir) => card(dir))],
    ['Short sheets', 'One topic on one page.', cardDirs('sheets').map((dir) => card(dir, SHEET_TAGS[basename(dir)] ?? 'js'))],
    ['Projects', 'Every build with all its help pages.', [...cardDirs('projects', (name) => /^\d+-/.test(name)), 'projects/extras'].map((dir) => card(dir, 'projects'))],
    ['Practice', 'Drills and task rounds.', [...cardDirs('drills'), ...cardDirs('programs')].map((dir) => card(dir, 'js'))],
    ['Docs', 'Background for teachers.', [
      `<article class="card cs">
            <div class="card-path">docs/LEARNING_PATH.md</div>
            <h3><a href="../docs/LEARNING_PATH.md">Learning path in detail</a></h3>
            <p>Why the path has this order, with the gates explained.</p>
          </article>`,
      ...cardDirs('docs').map((dir) => card(dir)),
    ]],
  ]
  return groups.map(([title, intro, cards]) => `<h3 class="library-title">${title}</h3>
        <p class="library-intro">${intro}</p>
        ${grid(cards)}`).join('\n        ')
}

const REGIONS = { path: renderPath, students: renderStudents, catalog: renderLibrary }

// Fills every <!-- name:start --> … <!-- name:end --> region of hub/index.html.
export function writeCatalog() {
  const file = join(HUB, 'index.html')
  const html = readFileSync(file, 'utf8')
  let next = html
  for (const [name, render] of Object.entries(REGIONS)) {
    const start = `<!-- ${name}:start -->`
    const end = `<!-- ${name}:end -->`
    const a = next.indexOf(start)
    const b = next.indexOf(end)
    if (a === -1 || b < a) throw new Error(`no ${name} markers in ${relative(process.cwd(), file)}`)
    const indent = next.slice(next.lastIndexOf('\n', a) + 1, a)
    next = `${next.slice(0, a)}${start}\n${indent}${render()}\n${indent}${next.slice(b)}`
  }
  if (next !== html) writeFileSync(file, next)
  return next !== html
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(writeCatalog() ? 'Updated hub/index.html' : 'hub/index.html is up to date')
}
