// Written my-solution desk: one step, plain inputs, a local check, then Done.
import { checkField } from './normalize.mjs'
import { createForm } from './written.js'
import { mountJavaEditor } from './java/page.js'

const STORE = 'learning-project:desk:v1'

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

function keyFromPath(pathname) {
  const match = pathname.match(/\/students\/([^/]+)\/([^/]+)\/exercises\/(exercise-[^/]+)\/(task-[^/]+)\//)
  if (!match) return null
  return `${match[1]}/${match[2]}/${match[3]}/${match[4]}`
}

function keyFromHref(href) {
  if (!href || /^(https?:|mailto:|#)/.test(href)) return null
  try {
    return keyFromPath(new URL(href, location.href).pathname)
  } catch {
    return null
  }
}

function recordState(rec) {
  if (!rec) return null
  if (rec.taskDone) return 'done'
  const parts = Object.values(rec.parts || {})
  const started = parts.some((part) => part.done || Object.values(part.values || {}).some((value) => String(value).trim()))
  return started ? 'in progress' : null
}

function statusPill(anchor) {
  const item = anchor.closest('li')
  const pill = item?.querySelector('.status')
  if (pill) {
    if (!pill.dataset.deskOriginal) pill.dataset.deskOriginal = pill.textContent.trim()
    return pill
  }
  const cell = anchor.closest('tr')?.lastElementChild
  if (!cell) return null
  const word = (cell.dataset.deskOriginal || cell.textContent).trim().toLowerCase()
  if (word !== 'todo' && word !== 'in progress' && word !== 'done') return null
  if (!cell.dataset.deskOriginal) cell.dataset.deskOriginal = cell.textContent.trim()
  let inner = cell.querySelector(':scope > .status')
  if (!inner) {
    inner = document.createElement('span')
    inner.className = 'status'
    inner.dataset.deskOriginal = cell.dataset.deskOriginal
    cell.textContent = ''
    cell.append(inner)
  }
  return inner
}

function paintPill(pill, state) {
  const git = (pill.dataset.deskOriginal || '').trim().toLowerCase()
  if (git === 'done') return
  const next = state || git || 'todo'
  pill.textContent = next
  pill.classList.remove('todo', 'in-progress', 'done')
  pill.classList.add('status', next.replace(/\s+/g, '-'))
  pill.dataset.deskState = next
  pill.title = state === 'done' ? 'Checked in this browser' : state === 'in progress' ? 'Started in this browser' : ''
}

function paintLists() {
  const store = readStore()
  const seen = new Set()
  for (const anchor of document.querySelectorAll('a[href]')) {
    const key = keyFromHref(anchor.getAttribute('href'))
    if (!key) continue
    const pill = statusPill(anchor)
    if (!pill || seen.has(pill)) continue
    seen.add(pill)
    const state = recordState(store[key])
    if (!state && !pill.dataset.deskState) continue
    paintPill(pill, state)
  }
}

function freshPart() {
  return { values: {}, done: false, passed: false, misses: 0 }
}

function boot(mount) {
  if (mount.dataset.ready) return
  mount.dataset.ready = '1'
  const key = keyFromPath(location.pathname)
  if (!key) return
  mount.replaceChildren()
  const loading = document.createElement('p')
  loading.className = 'lp-desk-loading'
  loading.textContent = 'Opening the steps…'
  mount.append(loading)

  fetch(new URL('../checks.json', location.href))
    .then((res) => (res.ok ? res.json() : null))
    .then((spec) => {
      if (!spec || !Array.isArray(spec.parts) || !spec.parts.length) {
        mount.replaceChildren()
        const note = document.createElement('p')
        note.textContent = 'This desk has no editor yet. Write your answer in the page below.'
        mount.append(note)
        return
      }
      renderDesk(mount, key, spec)
    })
    .catch(() => {
      mount.replaceChildren()
      const note = document.createElement('p')
      note.textContent = 'The editor could not load. Refresh the page.'
      mount.append(note)
    })
}

function renderDesk(mount, key, spec) {
  const store = readStore()
  const rec = store[key] || { taskDone: false, parts: {} }
  rec.parts ||= {}
  for (const part of spec.parts) rec.parts[part.id] ||= freshPart()
  store[key] = rec

  let currentId = ''
  let editor = null
  let justFinished = false

  mount.replaceChildren()
  const prompt = document.createElement('p')
  prompt.className = 'lp-desk-prompt'
  const host = document.createElement('div')
  host.className = 'lp-desk-host'
  const feedback = document.createElement('p')
  feedback.className = 'lp-desk-feedback'
  feedback.setAttribute('aria-live', 'polite')
  const actions = document.createElement('div')
  actions.className = 'lp-desk-actions'
  const checkBtn = button('check', 'Check')
  const doneBtn = button('done', 'Done')
  const skipBtn = button('skip', 'Skip')
  const reviewBtn = button('review', 'Review')
  actions.append(checkBtn, doneBtn, skipBtn, reviewBtn)
  const banner = document.createElement('div')
  banner.className = 'lp-desk-banner'
  banner.hidden = true
  mount.append(prompt, host, feedback, actions, banner)

  function save() {
    rec.taskDone = spec.parts.filter((part) => part.required !== false).every((part) => rec.parts[part.id].done)
    writeStore(store)
    paintLists()
  }

  function partById(id) {
    return spec.parts.find((part) => part.id === id) || spec.parts[0]
  }

  function valuesOf(part) {
    return { ...(rec.parts[part.id].values || {}) }
  }

  function showFeedback(kind, text, link) {
    feedback.className = `lp-desk-feedback${kind ? ` is-${kind}` : ''}`
    feedback.replaceChildren()
    if (text) feedback.append(document.createTextNode(text))
    if (link) {
      feedback.append(document.createTextNode(' '))
      const anchor = document.createElement('a')
      anchor.href = '../#check-examples'
      anchor.textContent = 'Open the check table'
      feedback.append(anchor)
    }
  }

  function syncActions(part) {
    const row = rec.parts[part.id]
    doneBtn.disabled = !row.passed
    skipBtn.hidden = part.required !== false || row.done
    reviewBtn.hidden = !window.LpChat?.isUnlocked?.()
  }

  function syncBanner() {
    banner.hidden = !rec.taskDone
    banner.replaceChildren()
    if (!rec.taskDone) return
    const title = document.createElement('p')
    title.className = 'lp-desk-banner-title'
    title.textContent = 'All required steps match.'
    banner.append(title)
    if (spec.nextTask || spec.nextHref) {
      const link = document.createElement('a')
      link.href = spec.nextTask ? `../../${spec.nextTask}/my-solution/` : spec.nextHref
      link.textContent = spec.nextLabel || 'Next task'
      banner.append(link)
    }
    if (justFinished) {
      justFinished = false
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      banner.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' })
    }
  }

  function show(id, updateHash = true) {
    const part = partById(id)
    currentId = part.id
    const row = rec.parts[part.id]
    if (row.passed && !part.fields.every((field) => checkField(field, row.values?.[field.id] || '').ok)) {
      row.passed = false
    }
    prompt.textContent = part.prompt || part.label
    editor = createForm(host, {
      fields: part.fields,
      values: valuesOf(part),
      tabs: spec.parts.map((item) => ({
        id: item.id,
        file: item.file || `${item.label}.java`,
        label: item.label,
        current: item.id === part.id,
        done: Boolean(rec.parts[item.id].done),
        dirty: !rec.parts[item.id].done && Object.values(rec.parts[item.id].values || {}).some((value) => String(value).trim()),
      })),
      onTab(next) {
        if (next !== currentId) show(next)
      },
      onChange(values) {
        const live = rec.parts[part.id]
        live.values = values
        if (live.passed || live.done) {
          live.passed = false
          live.done = false
        }
        save()
        editor?.setMarks({})
        showFeedback('', '')
        syncActions(part)
        syncBanner()
        refreshTabs()
      },
      onSubmit: runCheck,
    })
    if (row.passed) {
      const marks = {}
      for (const field of part.fields) marks[field.id] = 'ok'
      editor.setMarks(marks)
      showFeedback('ok', 'That matches.')
    } else {
      showFeedback('', '')
    }
    syncActions(part)
    syncBanner()
    if (updateHash) {
      const next = `#${part.id}`
      if (location.hash !== next) history.replaceState(null, '', next)
    }
    editor.focus()
  }

  function refreshTabs() {
    const tabs = [...host.querySelectorAll('.lp-step')]
    spec.parts.forEach((item, index) => {
      const tab = tabs[index]
      if (!tab) return
      const row = rec.parts[item.id]
      const done = Boolean(row.done)
      const dirty = !done && Object.values(row.values || {}).some((value) => String(value).trim())
      tab.classList.toggle('is-done', done)
      tab.classList.toggle('is-dirty', dirty)
      const saved = tab.querySelector('.lp-editor-saved')
      if (done && !saved) {
        const mark = document.createElement('span')
        mark.className = 'lp-editor-saved'
        mark.textContent = '✓'
        tab.append(mark)
      } else if (!done && saved) {
        saved.remove()
      }
    })
  }

  function runCheck() {
    const part = partById(currentId)
    const values = editor?.getValues() || valuesOf(part)
    rec.parts[part.id].values = values
    const marks = {}
    let allOk = true
    let hint = ''
    for (const field of part.fields) {
      const result = checkField(field, values[field.id] || '')
      marks[field.id] = result.ok ? 'ok' : 'bad'
      if (!result.ok) {
        allOk = false
        if (!hint) hint = result.hint
      }
    }
    editor?.setMarks(marks)
    const row = rec.parts[part.id]
    const typed = part.fields.some((field) => String(values[field.id] || '').trim())
    if (allOk) {
      row.passed = true
      showFeedback('ok', 'That matches.')
      syncActions(part)
      save()
      doneBtn.focus()
      return
    }
    row.passed = false
    if (typed) row.misses = (row.misses || 0) + 1
    showFeedback('bad', hint || 'Not yet.', typed && row.misses >= 3)
    syncActions(part)
    save()
  }

  function finishPart() {
    const part = partById(currentId)
    const row = rec.parts[part.id]
    if (!row.passed) return
    const wasDone = rec.taskDone
    row.done = true
    save()
    if (rec.taskDone && !wasDone) justFinished = true
    const next = spec.parts.slice(spec.parts.indexOf(part) + 1).find((item) => !rec.parts[item.id].done)
    show(next ? next.id : part.id)
  }

  function skipPart() {
    const part = partById(currentId)
    if (part.required !== false) return
    const wasDone = rec.taskDone
    rec.parts[part.id].done = true
    save()
    if (rec.taskDone && !wasDone) justFinished = true
    const next = spec.parts.slice(spec.parts.indexOf(part) + 1).find((item) => !rec.parts[item.id].done)
    show(next ? next.id : part.id)
  }

  function reviewPart() {
    const part = partById(currentId)
    const values = editor?.getValues() || valuesOf(part)
    const wrote = part.fields.map((field) => `${field.label}=${values[field.id] || '…'}`).join(', ')
    window.LpChat?.review?.(`/review ${part.label}. I wrote ${wrote}.`.slice(0, 500))
  }

  checkBtn.addEventListener('click', runCheck)
  doneBtn.addEventListener('click', finishPart)
  skipBtn.addEventListener('click', skipPart)
  reviewBtn.addEventListener('click', reviewPart)
  window.addEventListener('lp-chat-ready', () => syncActions(partById(currentId)))
  window.addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.slice(1))
    if (id && id !== currentId && spec.parts.some((part) => part.id === id)) show(id, false)
  })

  const fromHash = decodeURIComponent(location.hash.slice(1))
  const start = spec.parts.some((part) => part.id === fromHash)
    ? fromHash
    : (spec.parts.find((part) => !rec.parts[part.id].done) || spec.parts[0]).id
  show(start)
  save()
}

function button(action, label) {
  const el = document.createElement('button')
  el.type = 'button'
  el.dataset.action = action
  el.textContent = label
  return el
}

function start() {
  const mount = document.getElementById('desk')
  if (mount) boot(mount)
  else mountJavaEditor(paintLists)
  paintLists()
  const sheet = document.getElementById('sheet')
  if (sheet && sheet.textContent.includes('Loading')) {
    const obs = new MutationObserver(() => {
      if (sheet.textContent.includes('Loading')) return
      obs.disconnect()
      const el = document.getElementById('desk')
      if (el) boot(el)
      else mountJavaEditor(paintLists)
      paintLists()
    })
    obs.observe(sheet, { childList: true, subtree: true })
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start)
else start()
