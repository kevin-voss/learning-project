// Creates a new task folder for one student from students/_template/.
// Also creates the student and subject folders if they are new, and adds a
// line to every index page (students/README.md, student, subject).
//
// Run from anywhere:
//   node students/scripts/new-task.mjs --student becky --subject computer-science \
//     --title "Branches" [--number 04] [--slug branches] [--language Java]

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TEMPLATE = join(ROOT, '_template')
const START = '<!-- index:start -->'
const END = '<!-- index:end -->'

const USAGE = `Usage:
  node students/scripts/new-task.mjs --student <name> --subject <subject> --title "<title>"
                                     [--number <NN>] [--slug <slug>] [--language <language>]

Example:
  node students/scripts/new-task.mjs --student becky --subject computer-science --title "Loops"`

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

function nextNumber(subjectDir) {
  if (!existsSync(subjectDir)) return 1
  const numbers = readdirSync(subjectDir)
    .map((name) => /^(\d+)-/.exec(name))
    .filter(Boolean)
    .map((match) => Number(match[1]))
  return numbers.length ? Math.max(...numbers) + 1 : 1
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

// Adds one line between the index markers. `header` lines are written first
// when the index is still empty (used for markdown tables).
function addToIndex(file, line, header = []) {
  const text = readFileSync(file, 'utf8')
  const start = text.indexOf(START)
  const end = text.indexOf(END)
  if (start === -1 || end === -1 || end < start) {
    console.warn(`Warning: no index markers in ${relative(process.cwd(), file)}, add this line by hand:\n  ${line}`)
    return
  }
  const body = text.slice(start + START.length, end).split('\n').filter((l) => l.trim() !== '')
  if (body.includes(line)) return
  const lines = body.length ? [...body, line] : [...header, line]
  writeFileSync(file, `${text.slice(0, start)}${START}\n${lines.join('\n')}\n${text.slice(end)}`)
}

const args = parseArgs(process.argv.slice(2))
const student = slugify(args.student ?? '')
const subject = slugify(args.subject ?? '')
const title = args.title ?? ''
const slug = slugify(args.slug ?? title)
if (!student) fail('--student is required')
if (!subject) fail('--subject is required')
if (!title || !slug) fail('--title is required')
if (args.number !== undefined && !/^\d{1,3}$/.test(args.number)) fail('--number must be digits, e.g. 04', 2)

const studentDir = join(ROOT, student)
const subjectDir = join(studentDir, subject)
const number = String(args.number ? Number(args.number) : nextNumber(subjectDir)).padStart(2, '0')
const folder = `${number}-${slug}`
const taskDir = join(subjectDir, folder)

const taken = existsSync(subjectDir) && readdirSync(subjectDir).find((name) => name.startsWith(`${number}-`))
if (taken) fail(`number ${number} is already used by ${relative(ROOT, join(subjectDir, taken))}`)

const values = {
  STUDENT: student,
  STUDENT_NAME: displayName(student),
  SUBJECT: subject,
  SUBJECT_NAME: displayName(subject),
  TITLE: title,
  NUMBER: number,
  LANGUAGE: args.language || 'TODO',
  DATE: new Date().toISOString().slice(0, 10),
}

const newStudent = writeFromTemplate(join(studentDir, 'README.md'), 'student.md', values)
const newSubject = writeFromTemplate(join(subjectDir, 'README.md'), 'subject.md', values)
copyTemplate(join(TEMPLATE, 'task'), taskDir, values)

addToIndex(join(ROOT, 'README.md'), `- [${values.STUDENT_NAME}](${student}/README.md)`)
addToIndex(join(studentDir, 'README.md'), `- [${values.SUBJECT_NAME}](${subject}/README.md)`)
addToIndex(
  join(subjectDir, 'README.md'),
  `| ${number} | [${title}](${folder}/README.md) | todo |`,
  ['| # | Task | Status |', '|---|------|--------|'],
)

console.log(`Created ${relative(process.cwd(), taskDir)}/`)
if (newStudent) console.log(`  new student: ${values.STUDENT_NAME}`)
if (newSubject) console.log(`  new subject: ${values.SUBJECT_NAME}`)
console.log(`
Next: replace every TODO in
  README.md          what the student learns (explained simply)
  TASK.md            the original task + simple version + test examples
  starter/           half-ready files for the student
  solution/          the complete solution + explanation`)
