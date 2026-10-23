// Writes the generated parts of hub/index.html:
//   header    the site header from header.mjs (the same one every page gets)
//   path      the learning path from hub/path.mjs (checked: every link must exist)
//   students  short cards per student (full lists live on students/<name>/tasks.html)
//   catalog   "look it up": every course, sheet, project, practice set and doc on disk
// Also writes students/<name>/tasks.html: subjects → exercises → tasks, each toggleable.
// Only the path order is written by hand; new folders show up by themselves.
//
// Runs inside build-site.mjs and students/scripts/new-exercise.mjs. By hand, from anywhere:
//   node hub/scripts/catalog.mjs

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { LEVELS, STAGES } from '../path.mjs'
import { HEADER } from './header.mjs'

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
const hrefFrom = (fromDir, path) => relative(fromDir, path).split('\\').join('/')

const THEME_INIT = `<script>try { const t = JSON.parse(localStorage.getItem('learning-project:theme')); if (t) document.documentElement.dataset.theme = t } catch {}</script>`
const THEME_HEAD = [THEME_INIT, ...['tokens.css', 'components.css', 'anim/anim.css']
  .map((file) => `<link rel="stylesheet" href="/hub/theme/${file}">`)].join('\n  ')
const THEME_BODY = ['/hub/theme/anim/scenes.js', '/hub/theme/anim/player.js', '/hub/progress.js']
  .map((src) => `<script src="${src}" defer></script>`).join('\n  ')

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

// Status per task comes from the exercise README table:
//   | 04_1 | [File folders](task-04-1-file-folders/README.md) | todo |
function taskStatus(exerciseDir) {
  const status = {}
  for (const match of read(join(exerciseDir, 'README.md')).matchAll(/^\|[^|\n]*\|\s*\[[^\]]*\]\(([^/)]+)\/[^)]*\)\s*\|\s*([^|\n]+?)\s*\|/gm)) {
    status[match[1]] = match[2]
  }
  return status
}

const subfolders = (dir, prefix) => children(dir).filter((name) => name.startsWith(prefix) && isDir(join(dir, name)))

function tally(states) {
  const counts = { done: 0, 'in progress': 0, todo: 0, total: states.length }
  for (const state of states) counts[state] = (counts[state] ?? 0) + 1
  return counts
}

function formatCounts(counts) {
  const parts = []
  if (counts.done) parts.push(`${counts.done} done`)
  if (counts['in progress']) parts.push(`${counts['in progress']} in progress`)
  if (counts.todo) parts.push(`${counts.todo} todo`)
  return parts.join(' · ') || 'No tasks yet'
}

// students/<student>/<subject>/exercises/exercise-NN-…/task-NN-k-…/
function studentData(studentDir) {
  const subjects = cardDirs(studentDir).map((subjectDir) => {
    const exercisesDir = join(subjectDir, 'exercises')
    const exercises = (isDir(exercisesDir) ? subfolders(exercisesDir, 'exercise-') : []).map((exercise) => {
      const exerciseDir = join(exercisesDir, exercise)
      const status = taskStatus(exerciseDir)
      const tasks = subfolders(exerciseDir, 'task-').map((task) => {
        const dir = join(exerciseDir, task)
        const state = status[task] ?? 'todo'
        const [, nn, k] = task.split('-')
        const links = [['My solution', 'my-solution/README.md'], ['Sample solution', 'solution/README.md']]
          .filter(([, file]) => existsSync(join(ROOT, dir, file)))
          .map(([label, file]) => ({ label, path: join(dir, file) }))
        return {
          id: `${nn}_${k}`,
          title: pageTitle(join(dir, 'README.md')).replace(/^Task\s+\S+\s*·\s*/, ''),
          path: join(dir, 'README.md'),
          state,
          links,
        }
      })
      return {
        title: pageTitle(join(exerciseDir, 'README.md')),
        path: join(exerciseDir, 'README.md'),
        tasks,
        counts: tally(tasks.map((task) => task.state)),
      }
    })
    const states = exercises.flatMap((exercise) => exercise.tasks.map((task) => task.state))
    return {
      title: pageTitle(join(subjectDir, 'README.md')).split(' · ').pop(),
      path: join(subjectDir, 'README.md'),
      exercises,
      counts: tally(states),
    }
  })
  const states = subjects.flatMap((subject) => subject.exercises.flatMap((exercise) => exercise.tasks.map((task) => task.state)))
  const next = subjects.flatMap((subject) => subject.exercises.flatMap((exercise) => exercise.tasks)).find((task) => task.state !== 'done') ?? null
  return {
    id: basename(studentDir),
    title: pageTitle(join(studentDir, 'README.md')),
    dir: studentDir,
    subjects,
    counts: tally(states),
    next,
  }
}

function renderTaskRow(task, fromDir) {
  const links = task.links.map(({ label, path }) => `<a href="${hrefFrom(fromDir, path)}">${escape(label)}</a>`).join('')
  return `<li><span class="task-num">${escape(task.id)}</span><a class="task-title" href="${hrefFrom(fromDir, task.path)}">${escape(task.title)}</a><span class="status ${escape(task.state.replace(/\s+/g, '-'))}">${escape(task.state)}</span><span class="task-links">${links}</span></li>`
}

function studentSummaryCard(student) {
  const tasksPage = join(student.dir, 'tasks.html')
  const next = student.next
    ? `<p class="student-next">Continue: <a href="${href(student.next.path)}">${escape(student.next.title)}</a></p>`
    : student.counts.total
      ? '<p class="student-next">All tasks done.</p>'
      : ''
  const subjects = student.subjects.map((subject) => {
    const done = subject.counts.done
    const total = subject.counts.total
    return `<li><a href="${href(subject.path)}">${escape(subject.title)}</a><span class="student-count">${done}/${total}</span></li>`
  }).join('')
  return `<article class="card student" data-student="${escape(student.id)}">
            <div class="card-path">${escape(student.dir)}/</div>
            <h3><a href="${href(join(student.dir, 'README.md'))}">${escape(student.title)}</a></h3>
            <p class="student-summary">${escape(formatCounts(student.counts))}</p>
            ${next}
            ${subjects ? `<ul class="student-subjects">${subjects}</ul>` : '<p>No subjects yet.</p>'}
            <p class="student-open"><a href="${href(tasksPage)}">Open all tasks →</a></p>
          </article>`
}

function studentTasksPage(student) {
  const fromDir = student.dir
  const next = student.next
    ? `<p class="student-next">Continue: <a href="${hrefFrom(fromDir, student.next.path)}">${escape(student.next.title)}</a> <span class="status ${escape(student.next.state.replace(/\s+/g, '-'))}">${escape(student.next.state)}</span></p>`
    : student.counts.total
      ? '<p class="student-next">All tasks done.</p>'
      : '<p class="student-next">No tasks yet.</p>'
  const nextPath = student.next?.path
  const subjects = student.subjects.map((subject) => {
    const hasOpen = subject.exercises.some((exercise) =>
      exercise.tasks.some((task) => task.path === nextPath || task.state === 'in progress'))
    const exercises = subject.exercises.map((exercise) => {
      const open = exercise.tasks.some((task) => task.path === nextPath || task.state === 'in progress')
      const rows = exercise.tasks.map((task) => renderTaskRow(task, fromDir)).join('')
      return `<details class="tasks-exercise"${open ? ' open' : ''}>
          <summary><span class="tasks-title"><a href="${hrefFrom(fromDir, exercise.path)}">${escape(exercise.title)}</a></span><span class="student-count">${exercise.counts.done}/${exercise.counts.total}</span></summary>
          <ul class="task-list">${rows || '<li>No tasks yet.</li>'}</ul>
        </details>`
    }).join('\n        ')
    return `<details class="tasks-subject"${hasOpen ? ' open' : ''}>
        <summary><span class="tasks-title"><a href="${hrefFrom(fromDir, subject.path)}">${escape(subject.title)}</a></span><span class="student-count">${subject.counts.done}/${subject.counts.total}</span></summary>
        ${exercises || '<p>No exercises yet.</p>'}
      </details>`
  }).join('\n      ')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escape(student.title)} · My tasks · Learning Project</title>
  ${THEME_HEAD}
</head>
<body class="lp-page lp-tasks-page">
  ${HEADER}
  <nav class="lp-crumbs" aria-label="You are here"><a href="/hub/">Home</a> › <a href="/hub/#tasks">My tasks</a> › <span aria-current="page">${escape(student.title)}</span></nav>
  <main class="lp-sheet lp-tasks">
    <h1>${escape(student.title)} · My tasks</h1>
    <p>${escape(formatCounts(student.counts))}. Open a subject or exercise to see its tasks. Status comes from each exercise README.</p>
    ${next}
    ${subjects || '<p>No subjects yet.</p>'}
    <p class="student-room"><a href="./">← Back to ${escape(student.title)}'s room</a> · <a href="/hub/#tasks">All students</a></p>
  </main>
  ${THEME_BODY}
</body>
</html>
`
}

function writeStudentTasksPages() {
  let changed = false
  for (const dir of cardDirs('students').filter((path) => existsSync(join(ROOT, path, 'README.md')))) {
    const file = join(ROOT, dir, 'tasks.html')
    const next = studentTasksPage(studentData(dir))
    const prev = existsSync(file) ? readFileSync(file, 'utf8') : null
    if (prev !== next) {
      writeFileSync(file, next)
      changed = true
    }
  }
  return changed
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
  const students = cardDirs('students').filter((dir) => existsSync(join(ROOT, dir, 'README.md'))).map(studentData)
  const options = students.map((student) => `<option value="${escape(student.id)}">${escape(student.title)}</option>`)
  return `<label class="student-pick">I am <select id="student-select"><option value="">pick your name</option>${options.join('')}</select></label>
        <div class="card-grid">
          ${students.map(studentSummaryCard).join('\n          ')}
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

const REGIONS = { header: () => HEADER, path: renderPath, students: renderStudents, catalog: renderLibrary }

// Fills every <!-- name:start --> … <!-- name:end --> region of hub/index.html
// and refreshes students/<name>/tasks.html.
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
  let changed = false
  if (next !== html) {
    writeFileSync(file, next)
    changed = true
  }
  if (writeStudentTasksPages()) changed = true
  return changed
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(writeCatalog() ? 'Updated hub/index.html' : 'hub/index.html is up to date')
}
