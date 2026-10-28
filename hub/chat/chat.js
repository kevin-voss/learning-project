// Floating tutor chat on student exercise / task pages and their subpages (Becky only).
// Hidden until a 5-second press on the Test button next to "The task (from the sheet)".
// The unlock is saved in localStorage and stays on after a reload.
// Covers task roots, my-solution/, solution/, and code viewers under a task.
// Several chats per page in localStorage; each chat caps at 3 messages, then a new one starts.
// At most 10 chats kept — the 11th drops the oldest. Daily cap 50 sends.
// Replies from POST /api/chat (needs Vercel + OPENAI_API_KEY).
(function () {
  const STORAGE_PREFIX = 'learning-project:chat:v2:'
  const STORAGE_PREFIX_V1 = 'learning-project:chat:v1:'
  const RATE_KEY = 'learning-project:chat:rate:v1:becky'
  const ALLOWED_STUDENT = 'becky'
  const MAX_MESSAGES = 3
  const MAX_CHATS = 10
  const MAX_INPUT = 500
  const DAILY_LIMIT = 50

  const ICON_HISTORY = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><path d="M12 7v5l3 2"/></svg>'
  const ICON_NEW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
  const ICON_CLOSE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
  const ICON_TRASH = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>'

  // Fixed tutor commands — Becky can pick them, not edit the list.
  const COMMANDS = [
    { id: 'question', label: '/question', blurb: 'Ask about a word or idea on this page' },
    { id: 'stuck', label: '/stuck', blurb: 'Get a small hint when you are stuck' },
    { id: 'review', label: '/review', blurb: 'Check your thinking — no full answer' },
  ]
  const COMMAND_IDS = new Set(COMMANDS.map((c) => c.id))

  // Task / exercise roots and every subpage under them (my-solution/, solution/,
  // code viewers like Foo.java.html). Chat history stays keyed to the task/exercise.
  function parseScope(pathname) {
    let path = pathname.replace(/\/(index|README)\.html$/i, '/')
    path = path.replace(/\/[^/]+\.html$/i, '/')
    path = path.replace(/\/+$/, '/') || '/'

    const task = path.match(
      /^\/students\/([^/]+)\/([^/]+)\/exercises\/(exercise-[^/]+)\/(task-[^/]+)(?:\/|$)/,
    )
    if (task) {
      const root = `/students/${task[1]}/${task[2]}/exercises/${task[3]}/${task[4]}/`
      return {
        kind: 'task',
        student: task[1],
        subject: task[2],
        exercise: task[3],
        task: task[4],
        atRoot: path === root,
        scopeId: `${task[1]}/${task[2]}/${task[3]}/${task[4]}`,
      }
    }
    const exercise = path.match(
      /^\/students\/([^/]+)\/([^/]+)\/exercises\/(exercise-[^/]+)(?:\/|$)/,
    )
    if (exercise) {
      const root = `/students/${exercise[1]}/${exercise[2]}/exercises/${exercise[3]}/`
      return {
        kind: 'exercise',
        student: exercise[1],
        subject: exercise[2],
        exercise: exercise[3],
        task: null,
        atRoot: path === root,
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

  async function fetchSheetMarkdown(url) {
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

  async function fetchExerciseMarkdown(scope) {
    if (scope.kind !== 'task') return ''
    return fetchSheetMarkdown(
      `/students/${scope.student}/${scope.subject}/exercises/${scope.exercise}/`,
    )
  }

  // On my-solution / solution / code pages, load the task sheet — not the page body
  // (so the tutor still sees the task, not the sample solution text).
  async function fetchTaskMarkdown(scope) {
    if (scope.kind !== 'task' || scope.atRoot) return ''
    return fetchSheetMarkdown(
      `/students/${scope.student}/${scope.subject}/exercises/${scope.exercise}/${scope.task}/`,
    )
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

  function pruneToMaxChats(store) {
    if (store.chats.length <= MAX_CHATS) return store
    store.chats = store.chats.slice(-MAX_CHATS)
    if (!store.chats.some((c) => c.id === store.activeId)) {
      store.activeId = store.chats.at(-1).id
    }
    return store
  }

  function saveStore(key, store) {
    try {
      pruneToMaxChats(store)
      localStorage.setItem(key, JSON.stringify({ chats: store.chats, activeId: store.activeId }))
    } catch {
      // Private mode: history lasts until the tab closes.
    }
  }

  function todayStamp() {
    // Local calendar day so the limit resets at midnight for the student.
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  function loadRate() {
    try {
      const raw = localStorage.getItem(RATE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (data && data.day === todayStamp()) {
          return { day: data.day, count: Math.max(0, Number(data.count) || 0) }
        }
      }
    } catch {}
    return { day: todayStamp(), count: 0 }
  }

  function saveRate(rate) {
    try {
      localStorage.setItem(RATE_KEY, JSON.stringify(rate))
    } catch {}
  }

  function remainingToday() {
    return Math.max(0, DAILY_LIMIT - loadRate().count)
  }

  function recordSend() {
    const rate = loadRate()
    rate.count += 1
    saveRate(rate)
    return rate
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
  if (!scope || scope.student !== ALLOWED_STUDENT) return

  const UNLOCK_KEY = 'learning-project:chat:unlocked'
  const HOLD_MS = 5000
  let chatStarted = false

  function isUnlocked() {
    try {
      return localStorage.getItem(UNLOCK_KEY) === '1'
    } catch {
      return false
    }
  }

  function markUnlocked() {
    try {
      localStorage.setItem(UNLOCK_KEY, '1')
    } catch {}
  }

  function whenReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn)
    else fn()
  }

  // Small "Test" control beside the task heading. A short click does nothing.
  // Holding it for 5 seconds turns the chat on for this browser.
  function installUnlock(onUnlock) {
    const heading = [...document.querySelectorAll('#sheet h2, .lp-sheet h2')].find(
      (node) => node.textContent.trim() === 'The task (from the sheet)',
    )
    if (!heading || heading.closest('.lp-task-head')) return

    const row = document.createElement('div')
    row.className = 'lp-task-head'
    heading.replaceWith(row)
    row.append(heading)

    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'lp-chat-unlock'
    btn.textContent = 'Test'
    row.append(btn)

    let timer = 0
    let frame = 0
    let start = 0

    function stopHold() {
      clearTimeout(timer)
      timer = 0
      cancelAnimationFrame(frame)
      frame = 0
      btn.classList.remove('is-holding')
      btn.style.setProperty('--hold', '0')
    }

    function tick() {
      const progress = Math.min(1, (performance.now() - start) / HOLD_MS)
      btn.style.setProperty('--hold', String(progress))
      if (timer) frame = requestAnimationFrame(tick)
    }

    btn.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return
      event.preventDefault()
      try { btn.setPointerCapture(event.pointerId) } catch {}
      stopHold()
      start = performance.now()
      btn.classList.add('is-holding')
      timer = window.setTimeout(() => {
        stopHold()
        markUnlocked()
        row.replaceWith(heading)
        onUnlock()
      }, HOLD_MS)
      frame = requestAnimationFrame(tick)
    })

    function cancelHold() {
      if (!timer) return
      stopHold()
    }

    btn.addEventListener('pointerup', cancelHold)
    btn.addEventListener('pointercancel', cancelHold)
    btn.addEventListener('contextmenu', (event) => event.preventDefault())
    btn.addEventListener('click', (event) => event.preventDefault())
  }

  function bootChat() {
    if (chatStarted) return
    chatStarted = true

  const storageKey = STORAGE_PREFIX + scope.scopeId
  let store = pruneToMaxChats(loadStore(storageKey))
  saveStore(storageKey, store) // keep the same active chat across close / reopen
  let title = pageTitle()
  let exerciseMarkdown = ''
  let taskMarkdown = scope.kind === 'task' && scope.atRoot ? sheetMarkdown() : ''
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
    const dropped = store.chats.length > MAX_CHATS
    pruneToMaxChats(store)
    saveStore(storageKey, store)
    if (opts.warn) {
      warning = `This chat hit the limit of ${MAX_MESSAGES} messages. Started a new chat — open History to see older ones.`
    } else if (dropped) {
      warning = `History keeps the last ${MAX_CHATS} chats. The oldest one was removed.`
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
          <div class="lp-chat-compose">
            <ul class="lp-chat-slash" role="listbox" aria-label="Commands" hidden></ul>
            <textarea name="message" rows="2" placeholder="Ask… or type / for commands" maxlength="${MAX_INPUT}" required></textarea>
          </div>
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
  const slashEl = form.querySelector('.lp-chat-slash')
  const input = form.querySelector('textarea')
  const sendBtn = form.querySelector('button[type="submit"]')

  let slashOpen = false
  let slashIndex = 0
  let slashMatches = COMMANDS.slice()

  function parseCommand(text) {
    const match = String(text || '').match(/^\/([a-zA-Z][\w-]*)(?:\s+([\s\S]*))?$/)
    if (!match) return { command: null, rest: String(text || '').trim() }
    const id = match[1].toLowerCase()
    if (!COMMAND_IDS.has(id)) return { command: null, rest: String(text || '').trim() }
    return { command: id, rest: (match[2] || '').trim() }
  }

  function slashQuery() {
    const value = input.value
    const caret = input.selectionStart ?? value.length
    // Only at the start of the message: "/…" or "/partial" with caret in that token.
    const before = value.slice(0, caret)
    const match = before.match(/^\/([a-zA-Z][\w-]*)?$/)
    if (!match) return null
    if (value.slice(caret).match(/^\S/)) return null
    return (match[1] || '').toLowerCase()
  }

  function hideSlash() {
    slashOpen = false
    slashEl.hidden = true
    slashEl.replaceChildren()
    input.removeAttribute('aria-activedescendant')
  }

  function showSlash(matches, active) {
    slashMatches = matches
    slashIndex = Math.max(0, Math.min(active, matches.length - 1))
    slashOpen = matches.length > 0
    slashEl.hidden = !slashOpen
    slashEl.replaceChildren()
    if (!slashOpen) {
      input.removeAttribute('aria-activedescendant')
      return
    }
    matches.forEach((cmd, i) => {
      const li = document.createElement('li')
      li.id = `lp-chat-slash-${cmd.id}`
      li.role = 'option'
      li.className = 'lp-chat-slash-item'
      li.setAttribute('aria-selected', i === slashIndex ? 'true' : 'false')
      if (i === slashIndex) li.dataset.active = '1'
      li.innerHTML = `<span class="lp-chat-slash-label"></span><span class="lp-chat-slash-blurb"></span>`
      li.querySelector('.lp-chat-slash-label').textContent = cmd.label
      li.querySelector('.lp-chat-slash-blurb').textContent = cmd.blurb
      li.addEventListener('mousedown', (event) => {
        event.preventDefault()
        pickSlash(cmd)
      })
      slashEl.append(li)
    })
    input.setAttribute('aria-activedescendant', `lp-chat-slash-${matches[slashIndex].id}`)
  }

  function refreshSlash() {
    if (busy || input.disabled) {
      hideSlash()
      return
    }
    const query = slashQuery()
    if (query === null) {
      hideSlash()
      return
    }
    const matches = COMMANDS.filter((c) => c.id.startsWith(query))
    const prevId = slashMatches[slashIndex]?.id
    const keep = matches.findIndex((c) => c.id === prevId)
    showSlash(matches, keep >= 0 ? keep : 0)
  }

  function pickSlash(cmd) {
    input.value = `${cmd.label} `
    hideSlash()
    input.focus()
    const pos = input.value.length
    input.setSelectionRange(pos, pos)
  }

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
      hideSlash()
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

  // Open the panel with the composer prefilled (e.g. from the selection toolbar).
  // Does not send — the student can edit, then hit Send.
  function openDraft(draft) {
    const text = String(draft || '').slice(0, MAX_INPUT)
    const chat = activeChat()
    if (chat && conversationMessages(chat).length > 0) {
      startNewChat()
    }
    warning = ''
    showHistory = false
    setOpen(true)
    input.value = text
    hideSlash()
    const pos = input.value.length
    input.setSelectionRange(pos, pos)
    input.focus()
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

  function setBusy(next) {
    busy = next
    applyFormState()
  }

  function applyFormState() {
    const limited = remainingToday() <= 0
    sendBtn.disabled = busy || limited
    input.disabled = busy || limited
    sendBtn.textContent = busy ? 'Thinking…' : 'Send'
    form.toggleAttribute('aria-busy', busy)
    if (limited && !busy) {
      input.placeholder = `Daily limit reached (${DAILY_LIMIT}). Try again tomorrow.`
    } else {
      input.placeholder = 'Ask… or type / for commands'
    }
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
    applyFormState()

    list.replaceChildren()
    if (!messages.length && !busy) {
      const empty = document.createElement('p')
      empty.className = 'lp-chat-empty'
      empty.textContent =
        `Type / for /question, /stuck, /review. Short hints, not the full answer. ` +
        `Up to ${MAX_MESSAGES} messages per chat · ${DAILY_LIMIT}/day · ${remainingToday()} left today.`
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
    if (busy) {
      const thinking = document.createElement('div')
      thinking.className = 'lp-chat-msg lp-chat-thinking'
      thinking.dataset.role = 'assistant'
      thinking.setAttribute('aria-label', 'Thinking')
      thinking.innerHTML =
        '<span class="lp-chat-thinking-label">Thinking</span>' +
        '<span class="lp-chat-thinking-dots" aria-hidden="true"><i></i><i></i><i></i></span>'
      list.append(thinking)
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
    hideSlash()
    const text = input.value.trim()
    if (!text || busy) return

    if (text.length > MAX_INPUT) {
      warning = `Keep it under ${MAX_INPUT} characters.`
      render()
      return
    }

    if (remainingToday() <= 0) {
      warning = `Daily limit reached (${DAILY_LIMIT} questions). Try again tomorrow.`
      render()
      return
    }

    const { command } = parseCommand(text)
    if (text.startsWith('/') && !command) {
      warning = 'Unknown command. Try /question, /stuck, or /review.'
      refreshSlash()
      render()
      return
    }

    let chat = activeChat()
    if (userCount(chat) >= MAX_MESSAGES) {
      startNewChat({ warn: true })
      chat = activeChat()
    }

    chat.messages.push({ role: 'user', content: text })
    input.value = ''
    persist()
    setBusy(true)
    render()

    const payload = {
      scope: {
        student: scope.student,
        subject: scope.subject,
        exercise: scope.exercise,
        task: scope.task,
        title,
      },
      context: {
        taskMarkdown: scope.kind === 'task' ? taskMarkdown : '',
        exerciseMarkdown: scope.kind === 'exercise' ? sheetMarkdown() : exerciseMarkdown,
      },
      command: command || undefined,
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
      recordSend()
      chat.messages.push({
        role: 'assistant',
        content: String(data.reply || '').trim() || '(empty reply)',
      })
      persist()
      if (userCount(chat) >= MAX_MESSAGES) {
        warning = `This chat hit the limit of ${MAX_MESSAGES} messages. Your next message starts a new chat — older ones stay in History (max ${MAX_CHATS}).`
      }
    } catch (err) {
      chat.messages.push({
        role: 'error',
        content: err.message || 'Something went wrong. Try again.',
      })
    }

    setBusy(false)
    render()
    input.focus()
  })

  input.addEventListener('input', () => {
    refreshSlash()
  })

  input.addEventListener('keydown', (event) => {
    if (slashOpen) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        showSlash(slashMatches, slashIndex + 1)
        return
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        showSlash(slashMatches, slashIndex - 1)
        return
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        hideSlash()
        return
      }
      if ((event.key === 'Enter' || event.key === 'Tab') && slashMatches[slashIndex]) {
        event.preventDefault()
        pickSlash(slashMatches[slashIndex])
        return
      }
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      form.requestSubmit()
    }
  })

  input.addEventListener('blur', () => {
    // Delay so a mousedown on an option can fire first.
    setTimeout(() => {
      if (document.activeElement !== input) hideSlash()
    }, 120)
  })

  function boot() {
    title = pageTitle()
    scopeEl.textContent = title
    if (scope.kind === 'task') {
      fetchExerciseMarkdown(scope).then((md) => {
        exerciseMarkdown = md
      })
      if (!scope.atRoot) {
        fetchTaskMarkdown(scope).then((md) => {
          if (md) taskMarkdown = md
        })
      }
    }
  }

  // Floating bar above a text selection: Copy, or Ask AI (opens chat prefilled).
  // Mobile: never show while a finger is down (that steals the selection handles).
  // Only appear after the gesture settles; hide as soon as a new touch starts.
  const selBar = document.createElement('div')
  selBar.className = 'lp-sel-bar'
  selBar.setAttribute('role', 'toolbar')
  selBar.setAttribute('aria-label', 'Selection actions')
  selBar.hidden = true
  selBar.innerHTML =
    '<button type="button" data-action="copy">Copy</button>' +
    '<button type="button" data-action="ask">Ask AI</button>'
  document.body.append(selBar)

  const coarsePointer = () =>
    window.matchMedia('(pointer: coarse)').matches ||
    (navigator.maxTouchPoints || 0) > 0

  let lastSelectedText = ''
  let selTimer = 0
  let pointersDown = 0

  function clearSelTimer() {
    clearTimeout(selTimer)
    selTimer = 0
  }

  function hideSelBar() {
    clearSelTimer()
    selBar.hidden = true
    lastSelectedText = ''
  }

  function sheetRoot() {
    return document.querySelector('main.lp-sheet, .lp-sheet, #sheet') || document.body
  }

  function selectedInSheet() {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null
    const text = sel.toString().replace(/\s+/g, ' ').trim()
    if (!text) return null
    const range = sel.getRangeAt(0)
    const node = range.commonAncestorContainer
    const el = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement
    if (!el) return null
    if (root.contains(el) || selBar.contains(el)) return null
    if (el.closest('textarea, input, select, [contenteditable="true"]')) return null
    const sheet = sheetRoot()
    if (sheet !== document.body && !sheet.contains(el) && !document.body.contains(el)) return null
    return { text, range }
  }

  function selectionRect(range) {
    // Prefer the first line so the bar sits above the start handle, not over it.
    const rects = [...range.getClientRects()].filter((r) => r.width || r.height)
    return rects[0] || range.getBoundingClientRect()
  }

  function placeSelBar(range) {
    const rect = selectionRect(range)
    if (!rect || (rect.width === 0 && rect.height === 0)) {
      hideSelBar()
      return
    }
    selBar.hidden = false
    const barW = selBar.offsetWidth || 140
    const barH = selBar.offsetHeight || 40
    const gap = coarsePointer() ? 14 : 8
    let top = rect.top - barH - gap
    let left = rect.left + (rect.width - barW) / 2
    left = Math.max(8, Math.min(left, window.innerWidth - barW - 8))
    if (top < 8) top = Math.min(rect.bottom + gap, window.innerHeight - barH - 8)
    selBar.style.top = `${Math.round(top)}px`
    selBar.style.left = `${Math.round(left)}px`
  }

  function refreshSelBar() {
    if (pointersDown > 0) return
    clearSelTimer()
    const picked = selectedInSheet()
    if (!picked) {
      if (!selBar.contains(document.activeElement)) hideSelBar()
      return
    }
    lastSelectedText = picked.text
    placeSelBar(picked.range)
  }

  function scheduleSelBar() {
    clearSelTimer()
    // Touch UIs need time after handle-drag; desktop can be snappier.
    const delay = coarsePointer() ? 320 : 10
    selTimer = setTimeout(refreshSelBar, delay)
  }

  // New touch/click outside the bar: clear it so the user can select again
  // or drag native handles without our overlay in the way.
  document.addEventListener(
    'pointerdown',
    (event) => {
      if (selBar.contains(event.target)) return
      pointersDown += 1
      hideSelBar()
    },
    true,
  )

  function onPointerRelease(event) {
    if (selBar.contains(event.target)) return
    pointersDown = Math.max(0, pointersDown - 1)
    if (pointersDown === 0) scheduleSelBar()
  }
  document.addEventListener('pointerup', onPointerRelease, true)
  document.addEventListener('pointercancel', onPointerRelease, true)

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift' || event.key.startsWith('Arrow')) scheduleSelBar()
  })

  document.addEventListener('selectionchange', () => {
    if (pointersDown > 0) return
    const sel = window.getSelection()
    if (sel && !sel.isCollapsed) {
      // Desktop: follow the drag. Mobile: wait for pointerup (scheduleSelBar).
      if (!coarsePointer()) scheduleSelBar()
      return
    }
    clearSelTimer()
    selTimer = setTimeout(() => {
      if (selBar.contains(document.activeElement)) return
      const still = window.getSelection()
      if (still && !still.isCollapsed) return
      hideSelBar()
    }, 180)
  })

  window.addEventListener(
    'scroll',
    () => {
      if (selBar.hidden) return
      // Keep the bar if the selection is still there; otherwise drop it.
      if (pointersDown > 0 || !selectedInSheet()) hideSelBar()
      else refreshSelBar()
    },
    { passive: true },
  )
  window.addEventListener('resize', hideSelBar)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !selBar.hidden) hideSelBar()
  })

  // Keep the highlight while tapping the bar (do not steal focus into the button).
  selBar.addEventListener('pointerdown', (event) => {
    event.preventDefault()
  })

  selBar.querySelector('[data-action="copy"]').addEventListener('click', async () => {
    const text = lastSelectedText || selectedInSheet()?.text || ''
    if (!text) return
    const btn = selBar.querySelector('[data-action="copy"]')
    try {
      await navigator.clipboard.writeText(text)
      btn.textContent = 'Copied'
      setTimeout(() => {
        btn.textContent = 'Copy'
      }, 1200)
    } catch {
      btn.textContent = 'Copy failed'
      setTimeout(() => {
        btn.textContent = 'Copy'
      }, 1200)
    }
  })

  selBar.querySelector('[data-action="ask"]').addEventListener('click', () => {
    const text = lastSelectedText || selectedInSheet()?.text || ''
    if (!text) return
    hideSelBar()
    window.getSelection()?.removeAllRanges()
    openDraft(`/question ${text}`)
  })

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot)
  } else {
    setTimeout(boot, 0)
    window.addEventListener('load', () => {
      title = pageTitle()
      if (root.hasAttribute('data-open')) scopeEl.textContent = title
    }, { once: true })
  }
  }

  if (isUnlocked()) bootChat()
  else whenReady(() => installUnlock(bootChat))
})()
