// Floating tutor chat on student exercise / task pages.
// Several chats per page in localStorage; each chat caps at 3 messages, then a new one starts.
// Replies from POST /api/chat (needs Vercel + OPENAI_API_KEY).
(function () {
  const STORAGE_PREFIX = 'learning-project:chat:v2:'
  const STORAGE_PREFIX_V1 = 'learning-project:chat:v1:'
  const MAX_MESSAGES = 3
  const MAX_CHATS = 30

  const ICON_HISTORY = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l3 2"/></svg>'
  const ICON_NEW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
  const ICON_CLOSE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
  const ICON_TRASH = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>'

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

  function newId() {
    return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
  }

  function emptyStore() {
    const id = newId()
    return { chats: [{ id, createdAt: Date.now(), messages: [] }], activeId: id }
  }

  function loadStore(key) {
    try {
      const raw = localStorage.getItem(key)
      if (raw) {
        const data = JSON.parse(raw)
        if (Array.isArray(data.chats) && data.chats.length) {
          const chats = data.chats.map((c) => ({
            id: c.id || newId(),
            createdAt: c.createdAt || Date.now(),
            messages: Array.isArray(c.messages) ? c.messages.filter((m) => m.role !== 'error') : [],
          }))
          const activeId = chats.some((c) => c.id === data.activeId) ? data.activeId : chats[0].id
          return { chats, activeId }
        }
      }
      // Migrate single-thread v1 history once.
      const v1 = localStorage.getItem(STORAGE_PREFIX_V1 + key.slice(STORAGE_PREFIX.length))
      if (v1) {
        const old = JSON.parse(v1)
        const messages = Array.isArray(old.messages)
          ? old.messages.filter((m) => m.role === 'user' || m.role === 'assistant').slice(0, MAX_MESSAGES)
          : []
        const id = newId()
        try {
          localStorage.removeItem(STORAGE_PREFIX_V1 + key.slice(STORAGE_PREFIX.length))
        } catch {}
        return { chats: [{ id, createdAt: Date.now(), messages }], activeId: id }
      }
    } catch {}
    return emptyStore()
  }

  function saveStore(key, store) {
    try {
      const chats = store.chats.slice(-MAX_CHATS)
      localStorage.setItem(key, JSON.stringify({ chats, activeId: store.activeId }))
      store.chats = chats
    } catch {
      // Private mode: history lasts until the tab closes.
    }
  }

  function chatPreview(chat) {
    const first = chat.messages.find((m) => m.role === 'user')
    if (!first) return 'Empty chat'
    const text = first.content.trim().replace(/\s+/g, ' ')
    return text.length > 48 ? `${text.slice(0, 48)}…` : text
  }

  function formatWhen(ts) {
    try {
      return new Date(ts).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return ''
    }
  }

  const scope = parseScope(location.pathname)
  if (!scope) return

  const storageKey = STORAGE_PREFIX + scope.scopeId
  let store = loadStore(storageKey)
  saveStore(storageKey, store) // keep the same active chat across close / reopen
  let title = pageTitle()
  let exerciseMarkdown = ''
  let busy = false
  let warning = ''
  let showHistory = false

  function activeChat() {
    return store.chats.find((c) => c.id === store.activeId) || store.chats[0]
  }

  function conversationMessages(chat) {
    return chat.messages.filter((m) => m.role === 'user' || m.role === 'assistant')
  }

  function userCount(chat) {
    return chat.messages.filter((m) => m.role === 'user').length
  }

  function listedChats() {
    return store.chats.filter((c) => conversationMessages(c).length > 0)
  }

  function resetToEmptyChat() {
    const id = newId()
    store = { chats: [{ id, createdAt: Date.now(), messages: [] }], activeId: id }
    saveStore(storageKey, store)
  }

  function startNewChat(opts = {}) {
    const id = newId()
    store.chats.push({ id, createdAt: Date.now(), messages: [] })
    store.activeId = id
    if (store.chats.length > MAX_CHATS) store.chats = store.chats.slice(-MAX_CHATS)
    saveStore(storageKey, store)
    if (opts.warn) {
      warning = `This chat hit the limit of ${MAX_MESSAGES} messages. Started a new chat — open History to see older ones.`
    } else {
      warning = ''
    }
  }

  function deleteChat(id) {
    store.chats = store.chats.filter((c) => c.id !== id)
    if (!store.chats.length) {
      resetToEmptyChat()
      showHistory = false
      warning = ''
      return
    }
    if (store.activeId === id) {
      const next = [...store.chats].reverse().find((c) => conversationMessages(c).length > 0)
      store.activeId = (next || store.chats.at(-1)).id
    }
    if (!listedChats().length) showHistory = false
    saveStore(storageKey, store)
    warning = ''
  }

  function deleteAllChats() {
    resetToEmptyChat()
    showHistory = false
    warning = 'All chats deleted.'
  }

  const root = document.createElement('div')
  root.className = 'lp-chat'
  root.innerHTML = `
    <button type="button" class="lp-chat-fab" aria-label="Open help chat">Help</button>
    <div class="lp-chat-panel" role="dialog" aria-label="Exercise help chat" hidden>
      <aside class="lp-chat-history" hidden></aside>
      <div class="lp-chat-main">
        <div class="lp-chat-head">
          <div class="lp-chat-head-text">
            <p class="lp-chat-label">You are on</p>
            <p class="lp-chat-scope"></p>
          </div>
          <div class="lp-chat-actions">
            <button type="button" class="lp-chat-icon" data-action="history" title="Chat history" aria-label="Chat history">${ICON_HISTORY}</button>
            <button type="button" class="lp-chat-icon" data-action="new" title="New chat" aria-label="New chat">${ICON_NEW}</button>
            <button type="button" class="lp-chat-icon" data-action="close" title="Close" aria-label="Close chat">${ICON_CLOSE}</button>
          </div>
        </div>
        <div class="lp-chat-warn" hidden></div>
        <div class="lp-chat-messages" aria-live="polite"></div>
        <form class="lp-chat-form">
          <textarea name="message" rows="2" placeholder="Ask a question…" required></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  `
  document.body.append(root)

  const fab = root.querySelector('.lp-chat-fab')
  const panel = root.querySelector('.lp-chat-panel')
  const scopeEl = root.querySelector('.lp-chat-scope')
  const warnEl = root.querySelector('.lp-chat-warn')
  const historyEl = root.querySelector('.lp-chat-history')
  const historyBtn = root.querySelector('[data-action="history"]')
  const list = root.querySelector('.lp-chat-messages')
  const form = root.querySelector('.lp-chat-form')
  const input = form.querySelector('textarea')
  const sendBtn = form.querySelector('button[type="submit"]')

  // Drop an unused empty chat on close so reopen resumes the last real thread.
  function pruneEmptyActive() {
    const chat = activeChat()
    if (!chat || conversationMessages(chat).length > 0 || store.chats.length <= 1) return
    store.chats = store.chats.filter((c) => c.id !== chat.id)
    const previous = [...store.chats].reverse().find((c) => conversationMessages(c).length > 0)
    store.activeId = (previous || store.chats.at(-1)).id
    saveStore(storageKey, store)
  }

  function setOpen(open) {
    if (!open) {
      pruneEmptyActive()
      saveStore(storageKey, store)
      showHistory = false
      root.removeAttribute('data-history')
    }
    root.toggleAttribute('data-open', open)
    panel.hidden = !open
    if (open) {
      // Resume the same active chat — never auto-create on open.
      store = loadStore(storageKey)
      showHistory = false
      render()
      input.focus()
    }
  }

  function renderHistory() {
    const past = listedChats()
    // Never leave an empty sidebar open.
    if (showHistory && !past.length) showHistory = false

    root.toggleAttribute('data-history', showHistory)
    historyEl.hidden = !showHistory
    historyBtn.disabled = past.length === 0
    historyBtn.title = past.length ? 'Chat history' : 'No past chats yet'
    historyBtn.setAttribute('aria-pressed', showHistory ? 'true' : 'false')
    historyEl.replaceChildren()
    if (!showHistory) return

    const head = document.createElement('div')
    head.className = 'lp-chat-history-head'
    head.innerHTML = `<p class="lp-chat-history-label">Past chats</p>`
    historyEl.append(head)

    const scroll = document.createElement('div')
    scroll.className = 'lp-chat-history-list'
    const ordered = [...past].reverse()
    for (const chat of ordered) {
      const row = document.createElement('div')
      row.className = 'lp-chat-history-row'
      if (chat.id === store.activeId) row.dataset.active = '1'

      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'lp-chat-history-item'
      btn.innerHTML = `<span class="lp-chat-history-preview"></span><span class="lp-chat-history-meta"></span>`
      btn.querySelector('.lp-chat-history-preview').textContent = chatPreview(chat)
      btn.querySelector('.lp-chat-history-meta').textContent =
        `${formatWhen(chat.createdAt)} · ${userCount(chat)}/${MAX_MESSAGES}`
      btn.addEventListener('click', () => {
        store.activeId = chat.id
        saveStore(storageKey, store)
        warning = ''
        render()
        input.focus()
      })

      const del = document.createElement('button')
      del.type = 'button'
      del.className = 'lp-chat-history-del'
      del.title = 'Delete chat'
      del.setAttribute('aria-label', 'Delete chat')
      del.innerHTML = ICON_TRASH
      del.addEventListener('click', (event) => {
        event.stopPropagation()
        deleteChat(chat.id)
        render()
        input.focus()
      })

      row.append(btn, del)
      scroll.append(row)
    }
    historyEl.append(scroll)

    const clear = document.createElement('button')
    clear.type = 'button'
    clear.className = 'lp-chat-history-clear'
    clear.textContent = 'Delete all'
    clear.addEventListener('click', () => {
      if (!confirm('Delete all chats for this page?')) return
      deleteAllChats()
      render()
      input.focus()
    })
    historyEl.append(clear)
  }

  function render() {
    scopeEl.textContent = title
    const chat = activeChat()
    const messages = chat?.messages || []

    if (warning) {
      warnEl.hidden = false
      warnEl.textContent = warning
    } else {
      warnEl.hidden = true
      warnEl.textContent = ''
    }

    renderHistory()

    list.replaceChildren()
    if (!messages.length) {
      const empty = document.createElement('p')
      empty.className = 'lp-chat-empty'
      empty.textContent = `Ask about this task. Short hints, not the full answer. Up to ${MAX_MESSAGES} messages per chat, then a new one starts.`
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
    saveStore(storageKey, store)
  }

  fab.addEventListener('click', () => setOpen(true))
  root.querySelector('[data-action="close"]').addEventListener('click', () => setOpen(false))
  root.querySelector('[data-action="new"]').addEventListener('click', () => {
    const chat = activeChat()
    if (chat && conversationMessages(chat).length === 0) {
      warning = 'You are already in an empty chat.'
      render()
      return
    }
    startNewChat()
    render()
    input.focus()
  })
  historyBtn.addEventListener('click', () => {
    if (!listedChats().length) {
      warning = 'No past chats yet. Send a message first.'
      showHistory = false
      render()
      return
    }
    showHistory = !showHistory
    render()
  })

  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const text = input.value.trim()
    if (!text || busy) return

    let chat = activeChat()
    if (userCount(chat) >= MAX_MESSAGES) {
      startNewChat({ warn: true })
      chat = activeChat()
    }

    chat.messages.push({ role: 'user', content: text })
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
      messages: conversationMessages(chat),
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
      chat.messages.push({
        role: 'assistant',
        content: String(data.reply || '').trim() || '(empty reply)',
      })
      persist()
      if (userCount(chat) >= MAX_MESSAGES) {
        warning = `This chat hit the limit of ${MAX_MESSAGES} messages. Your next message starts a new chat — older ones stay in History.`
      }
    } catch (err) {
      chat.messages.push({
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
    setTimeout(boot, 0)
    window.addEventListener('load', () => {
      title = pageTitle()
      if (root.hasAttribute('data-open')) scopeEl.textContent = title
    }, { once: true })
  }
})()
