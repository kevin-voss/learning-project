// Java editor on a Programmieren my-solution page.
// The draft stays in this browser. Tests still run with make test-task.

import { createSourceEditor } from './editor.js'

const STORE = 'learning-project:java:v1'
const STATUS = 'learning-project:desk:v1'

function readStore() {
  try {
    const data = JSON.parse(localStorage.getItem(STORE) || '{}')
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

function writeStore(data) {
  try { localStorage.setItem(STORE, JSON.stringify(data)) } catch { /* private mode */ }
}

function taskKey() {
  const match = location.pathname.match(/\/students\/([^/]+)\/([^/]+)\/exercises\/(exercise-[^/]+)\/(task-[^/]+)\//)
  return match ? `${match[1]}/${match[2]}/${match[3]}/${match[4]}` : ''
}

function isProgramPage() {
  return /\/students\/[^/]+\/computer-science\/exercises\/exercise-[^/]+\/task-[^/]+\/my-solution\/(?:|index\.html|README\.html)$/.test(location.pathname)
}

function fileName() {
  const raw = document.getElementById('sheet-md')?.textContent || ''
  return raw.match(/Create a file `([^`]+\.java)`/)?.[1] || ''
}

function markStarted(code) {
  const key = taskKey()
  if (!key) return
  let store = {}
  try { store = JSON.parse(localStorage.getItem(STATUS) || '{}') || {} } catch { store = {} }
  const rec = store[key] || { taskDone: false, parts: {} }
  if (rec.taskDone) return
  rec.parts ||= {}
  rec.parts.program = { values: { code: code.trim() ? 'started' : '' }, done: false, passed: false, misses: 0 }
  store[key] = rec
  try { localStorage.setItem(STATUS, JSON.stringify(store)) } catch { /* private mode */ }
}

async function loadCode(key, file) {
  const saved = readStore()[key]
  if (saved && saved.file === file && typeof saved.code === 'string') return saved.code
  try {
    const res = await fetch(new URL(file, location.href))
    if (res.ok) {
      const type = res.headers.get('content-type') || ''
      if (!type.includes('text/html')) return await res.text()
    }
  } catch { /* empty file */ }
  return ''
}

export function mountJavaEditor(onEdit) {
  if (document.getElementById('java-desk') || !isProgramPage()) return
  const sheet = document.getElementById('sheet')
  const file = fileName()
  if (!sheet || !file || sheet.textContent.includes('Loading')) return
  const key = taskKey()
  const host = document.createElement('div')
  host.id = 'java-desk'
  const note = document.createElement('p')
  note.className = 'lp-java-note'
  note.textContent = `Write the program here. Copy it into ${file}, then run the tests below. Your typing stays in this browser.`
  const box = document.createElement('div')
  host.append(note, box)
  const heading = [...sheet.querySelectorAll('h2')].find((node) => node.textContent.trim() === 'How to run it')
  if (heading) heading.before(host)
  else sheet.prepend(host)

  loadCode(key, file).then((code) => {
    createSourceEditor(box, {
      file,
      code,
      onChange(next) {
        const data = readStore()
        data[key] = { file, code: next }
        writeStore(data)
        markStarted(next)
        onEdit?.(next)
      },
    })
  })
}
