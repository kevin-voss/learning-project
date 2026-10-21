// Creates an Übung with its Aufgaben for one student from students/_template/:
//   students/<student>/<subject>/uebungen/uebung-<NN>-<slug>/aufgabe-<NN>-<k>-<slug>/
//     README.md · meine-loesung/README.md · musterloesung/README.md
// Creates the student, subject and uebungen folders if they are new, keeps every
// index page in sync (students, student, Übungen list, Übung) and refreshes the
// landing page (hub/index.html). Run it again with the same --number to add
// more Aufgaben to an existing Übung.
//
// Run from anywhere:
//   node students/scripts/new-uebung.mjs --student becky --subject computer-science \
//     --number 04 --title "Verzweigungen" --aufgaben "Aktenordner, Dreieck, Datum" [--language Java]

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeCatalog } from '../../hub/scripts/catalog.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TEMPLATE = join(ROOT, '_template')
const START = '<!-- index:start -->'
const END = '<!-- index:end -->'

const USAGE = `Usage:
  node students/scripts/new-uebung.mjs --student <name> --subject <subject> --number <NN>
                                       --title "<Übung title>" --aufgaben "<title 1>, <title 2>, …"
                                       [--slug <slug>] [--language <language>]

Example:
  node students/scripts/new-uebung.mjs --student becky --subject computer-science \\
    --number 05 --title "Schleifen" --aufgaben "Einmaleins, Zahlenraten" --language Java`

function fail(message, code = 1) {
  console.error(`Error: ${message}\n\n${USAGE}`)
  process.exit(code)
}

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]
    const value = argv[i + 1]
    if (!key.startsWith('--') || value === undefined || value.startsWith('--')) {
      fail(`expected "--name value" pairs, got "${key}"`, 2)
    }
    args[key.slice(2)] = value.trim()
  }
  return args
}

// Lowercase, a-z 0-9 and dashes only. This also blocks "../" and slashes.
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function displayName(slug) {
  return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function fill(text, values) {
  return text.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => values[key] ?? match)
}

function copyTemplate(fromDir, toDir, values) {
  mkdirSync(toDir, { recursive: true })
  for (const name of readdirSync(fromDir)) {
    const from = join(fromDir, name)
    const to = join(toDir, name)
    if (statSync(from).isDirectory()) copyTemplate(from, to, values)
    else writeFileSync(to, fill(readFileSync(from, 'utf8'), values))
  }
}

function writeFromTemplate(file, templateName, values) {
  if (existsSync(file)) return false
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, fill(readFileSync(join(TEMPLATE, templateName), 'utf8'), values))
  return true
}

// Puts one line between the index markers. A line whose `key` is already there is
// replaced, so a row can grow (e.g. more Aufgaben). `header` lines start an empty table.
function upsertIndex(file, line, { key = line, header = [] } = {}) {
  const text = readFileSync(file, 'utf8')
  const start = text.indexOf(START)
  const end = text.indexOf(END)
  if (start === -1 || end === -1 || end < start) {
    console.warn(`Warning: no index markers in ${relative(process.cwd(), file)}, add this line by hand:\n  ${line}`)
    return
  }
  const body = text.slice(start + START.length, end).split('\n').filter((l) => l.trim() !== '')
  const at = body.findIndex((l) => l.startsWith(key))
  const lines = at >= 0 ? body.map((l, i) => (i === at ? line : l)) : body.length ? [...body, line] : [...header, line]
  writeFileSync(file, `${text.slice(0, start)}${START}\n${lines.join('\n')}\n${text.slice(end)}`)
}

const folders = (dir, prefix) => (existsSync(dir) ? readdirSync(dir).filter((name) => name.startsWith(prefix)).sort() : [])

const args = parseArgs(process.argv.slice(2))
const student = slugify(args.student ?? '')
const subject = slugify(args.subject ?? '')
const title = args.title ?? ''
const titles = (args.aufgaben ?? '').split(',').map((t) => t.trim()).filter(Boolean)
if (!student) fail('--student is required')
if (!subject) fail('--subject is required')
if (!/^\d{1,3}$/.test(args.number ?? '')) fail('--number is required, digits only, e.g. 04', 2)
if (!title) fail('--title is required')
if (!titles.length) fail('--aufgaben needs at least one title')
if (titles.some((t) => !slugify(t))) fail('every Aufgabe title needs letters or digits', 2)

const number = String(Number(args.number)).padStart(2, '0')
const studentDir = join(ROOT, student)
const subjectDir = join(studentDir, subject)
const uebungenDir = join(subjectDir, 'uebungen')
const existing = folders(uebungenDir, `uebung-${number}-`)[0]
const uebungFolder = existing ?? `uebung-${number}-${slugify(args.slug ?? title)}`
const uebungDir = join(uebungenDir, uebungFolder)

const values = {
  STUDENT: student,
  STUDENT_NAME: displayName(student),
  SUBJECT: subject,
  SUBJECT_NAME: displayName(subject),
  UEBUNG: number,
  UEBUNG_TITLE: title,
  LANGUAGE: args.language || 'TODO',
  DATE: new Date().toISOString().slice(0, 10),
}

const newStudent = writeFromTemplate(join(studentDir, 'README.md'), 'student.md', values)
const newSubject = writeFromTemplate(join(subjectDir, 'README.md'), 'subject.md', values)
writeFromTemplate(join(uebungenDir, 'README.md'), 'uebungen.md', values)
const newUebung = writeFromTemplate(join(uebungDir, 'README.md'), 'uebung/README.md', values)

const used = folders(uebungDir, `aufgabe-${number}-`).map((name) => Number(name.split('-')[2]))
let next = used.length ? Math.max(...used) + 1 : 1
const created = []
for (const aufgabeTitle of titles) {
  const k = next++
  const folder = `aufgabe-${number}-${k}-${slugify(aufgabeTitle)}`
  const id = `${number}_${k}`
  copyTemplate(join(TEMPLATE, 'aufgabe'), join(uebungDir, folder), { ...values, AUFGABE: id, AUFGABE_TITLE: aufgabeTitle })
  upsertIndex(join(uebungDir, 'README.md'), `| ${id} | [${aufgabeTitle}](${folder}/README.md) | todo |`, {
    key: `| ${id} |`,
    header: ['| Aufgabe | Thema | Status |', '|---------|-------|--------|'],
  })
  created.push(folder)
}

const ids = folders(uebungDir, `aufgabe-${number}-`).map((name) => `${number}_${name.split('-')[2]}`)
// The Übung keeps the title it was created with ("# Übung 04 · Verzweigungen").
const uebungTitle = readFileSync(join(uebungDir, 'README.md'), 'utf8').match(/^#\s+.*?·\s*(.+)$/m)?.[1]?.trim() ?? title
upsertIndex(join(ROOT, 'README.md'), `- [${values.STUDENT_NAME}](${student}/README.md)`)
upsertIndex(join(studentDir, 'README.md'), `- [${values.SUBJECT_NAME}](${subject}/README.md)`)
upsertIndex(join(uebungenDir, 'README.md'), `| ${number} | [${uebungTitle}](${uebungFolder}/README.md) | ${ids.join(' · ')} |`, {
  key: `| ${number} |`,
  header: ['| Übung | Thema | Aufgaben |', '|-------|-------|----------|'],
})
writeCatalog()

console.log(`${newUebung ? 'Created' : 'Updated'} ${relative(process.cwd(), uebungDir)}/`)
for (const folder of created) console.log(`  new Aufgabe: ${folder}/`)
if (newStudent) console.log(`  new student: ${values.STUDENT_NAME}`)
if (newSubject) console.log(`  new subject: ${values.SUBJECT_NAME}`)
console.log(`
Next: replace every TODO in
  ${uebungFolder}/README.md   story, every new idea explained simply, words to know
  aufgabe-…/README.md         original task, simply said, test examples, helpers
  aufgabe-…/meine-loesung/    half-ready files with TODOs (never the answer)
  aufgabe-…/musterloesung/    the complete solution + walkthrough`)
