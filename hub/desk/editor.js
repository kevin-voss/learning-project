// A small Java editor: file tabs, gutter, syntax colours, status bar.
// The coloured layer sits under a transparent textarea so the caret stays native.

function javaPattern() {
  const number = '0x[0-9a-fA-F_]+|0b[01_]+|(?=[0-9a-fA-F]*\\d)[0-9a-fA-F]{1,16}h|(?=[0-9a-fA-F]*[A-Fa-f])[0-9a-fA-F]{2}h|(?=[0-9A-Fa-f]*\\d)(?=[0-9A-Fa-f]*[A-Fa-f])[0-9A-Fa-f]{2}|[01]{4,}b|\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[lLfFdD]?'
  return new RegExp(`\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\\b(?:${number})\\b|\\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|true|false|try|var|void|volatile|while|record|sealed|permits|yield|when)\\b|@[A-Za-z_][\\w]*|\\b[A-Z][A-Za-z0-9_]+\\b`, 'g')
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function tokenClass(token) {
  if (token.startsWith('//') || token.startsWith('/*')) return 'hljs-comment'
  if (token.startsWith('"') || token.startsWith("'")) return 'hljs-string'
  if (token.startsWith('@')) return 'hljs-meta'
  if (isNumber(token)) return 'hljs-number'
  if (/^[A-Z]/.test(token)) return 'hljs-title'
  return 'hljs-keyword'
}

function isNumber(token) {
  return /^(?:0x[0-9a-fA-F_]+|0b[01_]+|(?=[0-9a-fA-F]*\d)[0-9a-fA-F]+h|(?=[0-9a-fA-F]*[A-Fa-f])[0-9a-fA-F]{2}h|(?=[0-9A-Fa-f]*\d)(?=[0-9A-Fa-f]*[A-Fa-f])[0-9A-Fa-f]{2}|[01]{4,}b|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?[lLfFdD]?)$/i.test(token)
}

export function highlightJava(line) {
  let html = ''
  let cursor = 0
  for (const match of line.matchAll(javaPattern())) {
    html += escapeHtml(line.slice(cursor, match.index))
    html += `<span class="${tokenClass(match[0])}">${escapeHtml(match[0])}</span>`
    cursor = match.index + match[0].length
  }
  html += escapeHtml(line.slice(cursor))
  return html
}

function lineStart(text, line) {
  const parts = text.split('\n')
  let pos = 0
  for (let i = 0; i < line && i < parts.length; i++) pos += parts[i].length + 1
  return pos
}

export function createEditor(parent, options) {
  const fields = options.fields || []
  const multiline = fields.length === 1 && fields[0].kind === 'note'
  const state = { values: { ...options.values } }

  const root = document.createElement('div')
  root.className = 'lp-editor lp-hl'
  root.innerHTML = `
    <div class="lp-editor-tabs" role="tablist"></div>
    <div class="lp-editor-main">
      <div class="lp-editor-gutter" aria-hidden="true"></div>
      <div class="lp-editor-code">
        <div class="lp-editor-active"></div>
        <pre class="lp-editor-hl"></pre>
        <textarea class="lp-editor-input" wrap="off" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" data-gramm="false"></textarea>
      </div>
    </div>
    <footer class="lp-editor-status">
      <span class="lp-editor-problems"></span>
      <span class="lp-editor-spacer"></span>
      <span class="lp-editor-cursor">Ln 1, Col 1</span>
      <span>Spaces: 2</span>
      <span>UTF-8</span>
      <span class="lp-editor-mode">Java</span>
    </footer>`

  const tabs = root.querySelector('.lp-editor-tabs')
  const gutter = root.querySelector('.lp-editor-gutter')
  const code = root.querySelector('.lp-editor-code')
  const active = root.querySelector('.lp-editor-active')
  const pre = root.querySelector('.lp-editor-hl')
  const input = root.querySelector('.lp-editor-input')
  const problems = root.querySelector('.lp-editor-problems')
  const cursor = root.querySelector('.lp-editor-cursor')
  const rows = []

  input.setAttribute('aria-label', `Java editor, ${options.file || 'Answer.java'}`)

  for (const tab of options.tabs || []) {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'lp-editor-tab'
    button.setAttribute('role', 'tab')
    button.setAttribute('aria-selected', tab.current ? 'true' : 'false')
    button.title = tab.label || tab.file
    if (tab.current) button.classList.add('is-active')
    if (tab.done) button.classList.add('is-done')
    else if (tab.dirty) button.classList.add('is-dirty')
    const badge = document.createElement('span')
    badge.className = 'lp-editor-j'
    badge.textContent = 'J'
    const name = document.createElement('span')
    name.className = 'lp-editor-filename'
    name.textContent = tab.file || 'Answer.java'
    button.append(badge, name)
    if (tab.done) {
      const saved = document.createElement('span')
      saved.className = 'lp-editor-saved'
      saved.textContent = '✓'
      button.append(saved)
    }
    button.addEventListener('click', () => options.onTab?.(tab.id))
    tabs.append(button)
  }

  const copy = document.createElement('button')
  copy.type = 'button'
  copy.className = 'lp-editor-copy'
  copy.textContent = 'Copy'
  copy.addEventListener('click', () => {
    const text = textFrom(state.values)
    navigator.clipboard?.writeText(text).then(() => {
      copy.textContent = 'Copied'
      setTimeout(() => { copy.textContent = 'Copy' }, 1500)
    })
  })
  tabs.append(copy)

  fields.forEach((field, index) => {
    const row = document.createElement('div')
    row.className = 'lp-editor-line'
    row.dataset.field = field.id
    if (fields.length > 1 && field.label) {
      const label = document.createElement('span')
      label.className = 'lp-editor-name'
      label.textContent = field.label
      row.append(label)
    }
    const num = document.createElement('span')
    num.className = 'lp-editor-num'
    num.textContent = String(index + 1)
    row.append(num)
    gutter.append(row)
    rows.push(row)
  })

  function textFrom(values) {
    if (multiline) return String(values[fields[0].id] ?? '')
    return fields.map((field) => String(values[field.id] ?? '').replace(/\n/g, '')).join('\n')
  }

  function valuesFrom(text) {
    if (multiline) return { [fields[0].id]: text }
    const lines = text.replace(/\r\n/g, '\n').split('\n')
    const values = {}
    fields.forEach((field, index) => {
      values[field.id] = lines[index] ?? ''
    })
    return values
  }

  function paint() {
    const lines = multiline
      ? String(state.values[fields[0].id] ?? '').split('\n')
      : fields.map((field) => String(state.values[field.id] ?? ''))
    pre.innerHTML = lines.map((line, index) => {
      if (line) return highlightJava(line)
      const ghost = fields[index]?.placeholder || ''
      return ghost
        ? `<span class="hljs-comment">${escapeHtml(ghost)}</span>`
        : '<span>\u200b</span>'
    }).join('\n') || '<span>\u200b</span>'
    const longest = lines.reduce((max, line) => Math.max(max, line.length), 16)
    code.style.setProperty('--cols', String(longest + 2))
  }

  function paintCursor() {
    const text = input.value
    const pos = input.selectionStart ?? 0
    const upto = text.slice(0, pos)
    const line = upto.split('\n').length - 1
    const breakAt = upto.lastIndexOf('\n')
    const col = pos - breakAt
    cursor.textContent = `Ln ${line + 1}, Col ${col}`
    rows.forEach((row, index) => row.classList.toggle('is-active', index === line))
    active.style.setProperty('--row', String(Math.min(line, Math.max(rows.length - 1, 0))))
  }

  function applyText(text, caret) {
    const next = multiline ? text : textFrom(valuesFrom(text))
    state.values = valuesFrom(next)
    if (input.value !== next) {
      input.value = next
      const pos = Math.min(caret ?? next.length, next.length)
      input.setSelectionRange(pos, pos)
    }
    paint()
    paintCursor()
  }

  input.value = textFrom(state.values)
  paint()
  paintCursor()

  input.addEventListener('input', () => {
    const caret = input.selectionStart
    applyText(input.value, caret)
    options.onChange?.(state.values)
  })

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      const text = input.value
      const line = text.slice(0, input.selectionStart).split('\n').length - 1
      const next = Math.min(fields.length - 1, Math.max(0, line + (event.shiftKey ? -1 : 1)))
      const end = lineStart(input.value, next) + (input.value.split('\n')[next] || '').length
      input.setSelectionRange(end, end)
      paintCursor()
      return
    }
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      options.onSubmit?.()
      return
    }
    if (event.key === 'Enter' && !multiline) {
      event.preventDefault()
      const line = input.value.slice(0, input.selectionStart).split('\n').length - 1
      if (line < fields.length - 1) {
        const end = lineStart(input.value, line + 1) + (input.value.split('\n')[line + 1] || '').length
        input.setSelectionRange(end, end)
        paintCursor()
      } else {
        options.onSubmit?.()
      }
    }
  })

  for (const type of ['keyup', 'click', 'focus']) input.addEventListener(type, paintCursor)

  parent.replaceChildren(root)

  return {
    focus() {
      input.focus()
      const lines = input.value.split('\n')
      const index = fields.findIndex((field) => !String(state.values[field.id] || '').trim())
      const line = index === -1 ? 0 : index
      const pos = lineStart(input.value, line) + (lines[line] || '').length
      input.setSelectionRange(pos, pos)
      paintCursor()
    },
    setMarks(marks) {
      let bad = 0
      let good = 0
      for (const row of rows) {
        const mark = marks?.[row.dataset.field] || ''
        row.classList.toggle('is-ok', mark === 'ok')
        row.classList.toggle('is-bad', mark === 'bad')
        if (mark === 'bad') bad += 1
        if (mark === 'ok') good += 1
      }
      problems.textContent = bad ? `${bad} to fix` : good ? 'No problems' : ''
      problems.classList.toggle('is-bad', bad > 0)
      problems.classList.toggle('is-ok', bad === 0 && good > 0)
    },
    getValues() {
      return { ...valuesFrom(input.value) }
    },
  }
}
