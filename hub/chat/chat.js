// Floating tutor chat on student exercise / task pages.
// History in localStorage; replies from POST /api/chat (needs Vercel + OPENAI_API_KEY).
(function () {
  const STORAGE_PREFIX = 'learning-project:chat:v1:'

  // /students/<student>/<subject>/exercises/exercise-…[/task-…][/]
  // Not my-solution/ or solution/.
  function parseScope(pathname) {
    const path = pathname.replace(/\/(index|README)\.html$/i, '/').replace(/\/+$/, '/') || '/'
    const task = path.match(
      /^\/students\/([^/]+)\/([^/]+)\/exercises\/(exercise-[^/]+)\/(task-[^/]+)\/?$/,
    )
    if (task) {
      return {
        kind: 'task',
        student: task[1],
        subject: task[2],
        exercise: task[3],
        task: task[4],
        scopeId: `${task[1]}/${task[2]}/${task[3]}/${task[4]}`,
      }
    }
    const exercise = path.match(
      /^\/students\/([^/]+)\/([^/]+)\/exercises\/(exercise-[^/]+)\/?$/,
    )
    if (exercise) {
      return {
        kind: 'exercise',
        student: exercise[1],
        subject: exercise[2],
        exercise: exercise[3],
        task: null,
        scopeId: `${exercise[1]}/${exercise[2]}/${exercise[3]}`,
      }
    }
    return null
  }

  function pageTitle() {
    const h1 = document.querySelector('.lp-sheet h1, #sheet h1, main h1')
    if (h1?.textContent?.trim()) return h1.textContent.trim()
    return document.title.replace(/\s*·\s*Learning Project\s*$/i, '').trim() || 'This page'
  }

  function sheetMarkdown() {
    const el = document.getElementById('sheet-md')
    if (!el) return ''
    try {
      return JSON.parse(el.textContent)
    } catch {
      return ''
    }
  }

  async function fetchExerciseMarkdown(scope) {
    if (scope.kind !== 'task') return ''
    const url = `/students/${scope.student}/${scope.subject}/exercises/${scope.exercise}/`
    try {
      const res = await fetch(url)
      if (!res.ok) return ''
      const html = await res.text()
      const match = html.match(/<script type="application\/json" id="sheet-md">([\s\S]*?)<\/script>/)
      if (!match) return ''
      return JSON.parse(match[1])
    } catch {
      return ''
    }
  }

  function load(key) {
    try {
      const value = localStorage.getItem(key)
      if (value === null) return { messages: [] }
      const data = JSON.parse(value)
      return { messages: Array.isArray(data.messages) ? data.messages : [] }
    } catch {
      return { messages: [] }
    }
  }

  function save(key, messages) {
    try {
      localStorage.setItem(key, JSON.stringify({ messages }))
    } catch {
      // Private mode: history lasts until the tab closes.
    }
  }

  const scope = parseScope(location.pathname)
  if (!scope) return

  let title = pageTitle()
  let messages = load(STORAGE_PREFIX + scope.scopeId).messages
  let exerciseMarkdown = ''
  let busy = false

  const root = document.createElement('div')
  root.className = 'lp-chat'
  root.innerHTML = `
    <button type="button" class="lp-chat-fab" aria-label="Open help chat">Help</button>
    <div class="lp-chat-panel" role="dialog" aria-label="Exercise help chat" hidden>
      <div class="lp-chat-head">
        <div class="lp-chat-head-text">
          <p class="lp-chat-label">You are on</p>
          <p class="lp-chat-scope"></p>
        </div>
        <button type="button" data-action="new" title="Clear this chat">New chat</button>
        <button type="button" data-action="close" aria-label="Close chat">Close</button>
      </div>
      <div class="lp-chat-messages" aria-live="polite"></div>
      <form class="lp-chat-form">
        <textarea name="message" rows="2" placeholder="Ask a question…" required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  `
  document.body.append(root)

  const fab = root.querySelector('.lp-chat-fab')
  const panel = root.querySelector('.lp-chat-panel')
  const scopeEl = root.querySelector('.lp-chat-scope')
  const list = root.querySelector('.lp-chat-messages')
  const form = root.querySelector('.lp-chat-form')
  const input = form.querySelector('textarea')
  const sendBtn = form.querySelector('button[type="submit"]')

  function setOpen(open) {
    root.toggleAttribute('data-open', open)
    panel.hidden = !open
    if (open) {
      render()
      input.focus()
    }
  }

  function render() {
    scopeEl.textContent = title
    list.replaceChildren()
    if (!messages.length) {
      const empty = document.createElement('p')
      empty.className = 'lp-chat-empty'
      empty.textContent = 'Ask about this task. Short hints, not the full answer.'
      list.append(empty)
      return
    }
    for (const m of messages) {
      const bubble = document.createElement('div')
      bubble.className = 'lp-chat-msg'
      bubble.dataset.role = m.role
      bubble.textContent = m.content
      list.append(bubble)
    }
    list.scrollTop = list.scrollHeight
  }

  function persist() {
    save(STORAGE_PREFIX + scope.scopeId, messages.filter((m) => m.role !== 'error'))
  }

  fab.addEventListener('click', () => setOpen(true))
  root.querySelector('[data-action="close"]').addEventListener('click', () => setOpen(false))
  root.querySelector('[data-action="new"]').addEventListener('click', () => {
    messages = []
    try {
      localStorage.removeItem(STORAGE_PREFIX + scope.scopeId)
    } catch {}
    render()
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const text = input.value.trim()
    if (!text || busy) return

    messages.push({ role: 'user', content: text })
    input.value = ''
    persist()
    render()

    busy = true
    sendBtn.disabled = true
    sendBtn.textContent = '…'

    const payload = {
      scope: {
        student: scope.student,
        subject: scope.subject,
        exercise: scope.exercise,
        task: scope.task,
        title,
      },
      context: {
        taskMarkdown: scope.kind === 'task' ? sheetMarkdown() : '',
        exerciseMarkdown: scope.kind === 'exercise' ? sheetMarkdown() : exerciseMarkdown,
      },
      messages: messages.filter((m) => m.role === 'user' || m.role === 'assistant'),
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
      messages.push({ role: 'assistant', content: String(data.reply || '').trim() || '(empty reply)' })
      persist()
    } catch (err) {
      messages.push({
        role: 'error',
        content: err.message || 'Something went wrong. Try again.',
      })
    }

    busy = false
    sendBtn.disabled = false
    sendBtn.textContent = 'Send'
    render()
  })

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      form.requestSubmit()
    }
  })

  function boot() {
    title = pageTitle()
    scopeEl.textContent = title
    if (scope.kind === 'task') {
      fetchExerciseMarkdown(scope).then((md) => {
        exerciseMarkdown = md
      })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    // sheet.js may still be painting the h1 — wait a tick.
    setTimeout(boot, 0)
    window.addEventListener('load', () => {
      title = pageTitle()
      if (root.hasAttribute('data-open')) scopeEl.textContent = title
    }, { once: true })
  }
})()
