// Creates a lecture-quiz shelf for one student, and one lecture folder when
// --number and --title are given:
//   students/<student>/<subject>/quizzes/quiz-<NN>-<slug>/
//     README.md · quiz.json
// The same --number again refreshes the question count and checks quiz.json.
// It does not wipe the README or the questions.
//
//   node students/scripts/new-quiz.mjs --student becky --subject statsrecht
//   node students/scripts/new-quiz.mjs --student becky --subject statsrecht \
//     --number 01 --title "The state and the law"

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { questionProblem } from '../../hub/quiz/quiz.js'
import { writeCatalog } from '../../hub/scripts/catalog.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TEMPLATE = join(ROOT, '_template')
const START = '<!-- index:start -->'
const END = '<!-- index:end -->'

const USAGE = `Usage:
  node students/scripts/new-quiz.mjs --student <name> --subject <subject>
                                     [--number <NN> --title "<lecture title>"]

Examples:
  node students/scripts/new-quiz.mjs --student becky --subject statsrecht
  node students/scripts/new-quiz.mjs --student becky --subject statsrecht \\
    --number 01 --title "The state and the law"`

function fail(message, code = 1) {
  console.error(`Error: ${message}\n\n${USAGE}`)
  process.exit(code)
}

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]
    const value = argv[i + 1]
    if (!key?.startsWith('--') || value === undefined || value.startsWith('--')) {
      fail(`expected "--name value" pairs, got "${key ?? ''}"`, 2)
    }
    args[key.slice(2)] = value.trim()
  }
  return args
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const ACRONYMS = { sql: 'SQL', html: 'HTML', css: 'CSS', api: 'API' }

function displayName(slug) {
  return slug.split('-').map((word) => ACRONYMS[word] ?? word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function fill(text, values) {
  return text.replace(/\{\{([A-Z_]+)\}\}/g, (match, key) => values[key] ?? match)
}

function writeFromTemplate(file, templateName, values) {
  if (existsSync(file)) return false
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, fill(readFileSync(join(TEMPLATE, templateName), 'utf8'), values))
  return true
}

function upsertIndex(file, line, { key = line, tail = '', header = [] } = {}) {
  const text = readFileSync(file, 'utf8')
  const start = text.indexOf(START)
  const end = text.indexOf(END)
  if (start === -1 || end === -1 || end < start) {
    console.warn(`Warning: no index markers in ${relative(process.cwd(), file)}, add this line by hand:\n  ${line}`)
    return
  }
  const body = text.slice(start + START.length, end).split('\n').filter((row) => row.trim() !== '')
  const at = body.findIndex((row) => row.startsWith(key) || (tail !== '' && row.endsWith(tail)))
  const lines = at >= 0 ? body.map((row, index) => (index === at ? line : row)) : body.length ? [...body, line] : [...header, line]
  writeFileSync(file, `${text.slice(0, start)}${START}\n${lines.join('\n')}\n${text.slice(end)}`)
}

function checkQuiz(data, file) {
  const problems = []
  if (typeof data.title !== 'string' || !data.title.trim()) problems.push('title is missing')
  if (typeof data.id !== 'string' || !data.id.trim()) problems.push('id is missing')
  if (!Array.isArray(data.questions)) problems.push('questions must be a list')
  const ids = new Set()
  for (const [index, question] of (data.questions ?? []).entries()) {
    const label = question?.id || `question ${index + 1}`
    if (question?.id && ids.has(question.id)) problems.push(`${label}: duplicate id`)
    if (question?.id) ids.add(question.id)
    const problem = questionProblem(question)
    if (problem) problems.push(`${label}: ${problem}`)
  }
  if (!problems.length) return
  console.error(`Error: ${relative(process.cwd(), file)}\n${problems.map((line) => `  ${line}`).join('\n')}`)
  process.exit(1)
}

const folders = (dir, prefix) => (existsSync(dir) ? readdirSync(dir).filter((name) => name.startsWith(prefix) && !name.includes('..')).sort() : [])

const args = parseArgs(process.argv.slice(2))
const student = slugify(args.student ?? '')
const subject = slugify(args.subject ?? '')
const title = (args.title ?? '').replace(/\s+/g, ' ').trim()
if (!student) fail('--student is required')
if (!subject) fail('--subject is required')
const hasLecture = args.number !== undefined
if (hasLecture && !/^\d{1,3}$/.test(args.number)) fail('--number is digits only, e.g. 01', 2)
if (hasLecture && !title) fail('--title is required with --number')
if (hasLecture && !slugify(title)) fail('--title needs letters or digits', 2)

const number = hasLecture ? String(Number(args.number)).padStart(2, '0') : ''
const studentDir = join(ROOT, student)
const subjectDir = join(studentDir, subject)
const quizzesDir = join(subjectDir, 'quizzes')
const values = {
  STUDENT: student,
  STUDENT_NAME: displayName(student),
  SUBJECT: subject,
  SUBJECT_NAME: displayName(subject),
}

const newStudent = writeFromTemplate(join(studentDir, 'README.md'), 'student.md', values)
const newSubject = writeFromTemplate(join(subjectDir, 'README.md'), 'quiz-subject.md', values)
const newQuizzes = writeFromTemplate(join(quizzesDir, 'README.md'), 'quizzes.md', values)
upsertIndex(join(ROOT, 'README.md'), `- [${values.STUDENT_NAME}](${student}/README.md)`, { tail: `](${student}/README.md)` })
upsertIndex(join(studentDir, 'README.md'), `- [${values.SUBJECT_NAME}](${subject}/README.md)`, { tail: `](${subject}/README.md)` })

if (hasLecture) {
  const existing = folders(quizzesDir, `quiz-${number}-`)[0]
  const folder = existing ?? `quiz-${number}-${slugify(title)}`
  const quizDir = join(quizzesDir, folder)
  const anchor = `quiz-${student}-${subject}-${number}`
  const lectureValues = { ...values, NUMBER: number, QUIZ_TITLE: title, ANCHOR: anchor }
  const newReadme = writeFromTemplate(join(quizDir, 'README.md'), 'quiz/README.md', lectureValues)
  const quizFile = join(quizDir, 'quiz.json')
  if (!existsSync(quizFile)) {
    const quiz = { id: `${subject}-${number}`, title, questions: [] }
    writeFileSync(quizFile, `${JSON.stringify(quiz, null, 2)}\n`)
  }
  let data
  try {
    data = JSON.parse(readFileSync(quizFile, 'utf8'))
  } catch {
    console.error(`Error: ${relative(process.cwd(), quizFile)} is not valid JSON`)
    process.exit(1)
  }
  const count = Array.isArray(data.questions) ? data.questions.length : 0
  if (!Array.isArray(data.questions) || count) checkQuiz(data, quizFile)
  const safeTitle = title.replace(/\|/g, '·')
  upsertIndex(join(quizzesDir, 'README.md'), `| ${number} | [${safeTitle}](${folder}/README.md) | ${count} |`, {
    key: `| ${number} |`,
    header: ['| Lecture | Topic | Questions |', '|---------|-------|-----------|'],
  })
  writeCatalog()
  console.log(`${newReadme ? 'Created' : 'Updated'} ${relative(process.cwd(), quizDir)}/`)
  if (!count) console.log('quiz.json has no questions yet.')
} else {
  writeCatalog()
  console.log(`${newSubject ? 'Created' : 'Already there'}: ${relative(process.cwd(), subjectDir)}/`)
  if (newQuizzes) console.log(`  quizzes index: ${relative(process.cwd(), join(quizzesDir, 'README.md'))}`)
  console.log('No lecture yet. Run again with --number and --title when a PDF is ready.')
}
if (newStudent) console.log(`  new student: ${values.STUDENT_NAME}`)
