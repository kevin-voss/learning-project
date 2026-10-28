// Java source editor: file tab, gutter, syntax colours, status bar.
// The coloured layer sits under a transparent textarea so the caret stays native.

function javaPattern() {
  const number = '0x[0-9a-fA-F_]+|0b[01_]+|(?=[0-9a-fA-F]*\\d)[0-9a-fA-F]{1,16}h|(?=[0-9a-fA-F]*[A-Fa-f])[0-9a-fA-F]{2}h|(?=[0-9A-Fa-f]*\\d)(?=[0-9A-Fa-f]*[A-Fa-f])[0-9A-Fa-f]{2}|[01]{4,}b|\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[lLfFdD]?'
  return new RegExp(`"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'|\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/|\\b(?:${number})\\b|\\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|true|false|try|var|void|volatile|while|record|sealed|permits|yield|when)\\b|@[A-Za-z_][\\w]*|\\b[A-Z][A-Za-z0-9_]+\\b`, 'g')
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

function blockStart(line) {
  for (let i = 0; i < line.length; i++) {
    if (line.startsWith('//', i)) return -1
    if (line.startsWith('/*', i)) return i
    const quote = line[i]
    if (quote !== '"' && quote !== "'") continue
    i += 1
    while (i < line.length && line[i] !== quote) {
      if (line[i] === '\\') i += 1
      i += 1
    }
  }
  return -1
}

export function highlightSource(text) {
  let block = false
  return text.split('\n').map((line) => {
    if (!line && !block) return '<span>\u200b</span>'
    if (block) {
      const end = line.indexOf('*/')
      if (end === -1) return `<span class="hljs-comment">${escapeHtml(line) || '\u200b'}</span>`
      block = false
      const rest = line.slice(end + 2)
      return `<span class="hljs-comment">${escapeHtml(line.slice(0, end + 2))}</span>${rest ? highlightJava(rest) : ''}`
    }
    const start = blockStart(line)
    if (start === -1) return highlightJava(line)
    const end = line.indexOf('*/', start + 2)
    const before = line.slice(0, start)
    if (end === -1) {
      block = true
      return `${before ? highlightJava(before) : ''}<span class="hljs-comment">${escapeHtml(line.slice(start))}</span>`
    }
    const after = line.slice(end + 2)
    return `${before ? highlightJava(before) : ''}<span class="hljs-comment">${escapeHtml(line.slice(start, end + 2))}</span>${after ? highlightJava(after) : ''}`
  }).join('\n')
}

export function createSourceEditor(parent, options) {
  const root = document.createElement('div')
  root.className = 'lp-editor lp-hl is-source'
  root.innerHTML = `
    <div class="lp-editor-tabs" role="tablist">
      <div class="lp-editor-tab is-active" role="tab" aria-selected="true">
        <span class="lp-editor-j">J</span>
        <span class="lp-editor-filename"></span>
      </div>
      <button type="button" class="lp-editor-copy">Copy</button>
    </div>
    <div class="lp-editor-main">
      <div class="lp-editor-gutter" aria-hidden="true"><div class="lp-editor-rows"></div></div>
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

  const fileName = root.querySelector('.lp-editor-filename')
  const copy = root.querySelector('.lp-editor-copy')
  const gutter = root.querySelector('.lp-editor-gutter')
  const rowsBox = root.querySelector('.lp-editor-rows')
  const code = root.querySelector('.lp-editor-code')
  const active = root.querySelector('.lp-editor-active')
  const pre = root.querySelector('.lp-editor-hl')
  const input = root.querySelector('.lp-editor-input')
  const cursor = root.querySelector('.lp-editor-cursor')
  const tab = root.querySelector('.lp-editor-tab')
  const file = options.file || 'Main.java'
  fileName.textContent = file
  tab.title = file
  input.setAttribute('aria-label', `Java editor, ${file}`)
  input.value = options.code || ''

  const copyText = () => navigator.clipboard?.writeText(input.value).then(() => {
    copy.textContent = 'Copied'
    setTimeout(() => { copy.textContent = 'Copy' }, 1500)
  })
  copy.addEventListener('click', copyText)

  function paint() {
    const lines = input.value.split('\n')
    pre.innerHTML = highlightSource(input.value)
    rowsBox.replaceChildren()
    for (let i = 0; i < lines.length; i++) {
      const row = document.createElement('div')
      row.className = 'lp-editor-line'
      const num = document.createElement('span')
      num.className = 'lp-editor-num'
      num.textContent = String(i + 1)
      row.append(num)
      rowsBox.append(row)
    }
    const longest = lines.reduce((max, line) => Math.max(max, line.length), 20)
    code.style.setProperty('--cols', String(longest + 4))
    paintCursor()
  }

  function paintCursor() {
    const pos = input.selectionStart ?? 0
    const upto = input.value.slice(0, pos)
    const line = upto.split('\n').length - 1
    const col = pos - upto.lastIndexOf('\n')
    cursor.textContent = `Ln ${line + 1}, Col ${col}`
    const y = input.scrollTop
    active.style.top = `${8 + line * 24 - y}px`
    rowsBox.querySelectorAll('.lp-editor-line').forEach((row, index) => {
      row.classList.toggle('is-active', index === line)
    })
  }

  function place(text, caret) {
    input.value = text
    const pos = Math.min(caret, text.length)
    input.setSelectionRange(pos, pos)
    paint()
    options.onChange?.(text)
  }

  function scrollLayers() {
    const x = input.scrollLeft
    const y = input.scrollTop
    pre.style.transform = `translate(${-x}px, ${-y}px)`
    rowsBox.style.transform = `translateY(${-y}px)`
    paintCursor()
  }

  input.addEventListener('input', () => {
    paint()
    options.onChange?.(input.value)
  })
  input.addEventListener('scroll', scrollLayers)
  for (const type of ['keyup', 'click', 'focus']) input.addEventListener(type, paintCursor)

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      const start = input.selectionStart
      const end = input.selectionEnd
      const value = input.value
      if (!event.shiftKey && start === end) {
        place(`${value.slice(0, start)}  ${value.slice(end)}`, start + 2)
        return
      }
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      const lineEndIdx = value.indexOf('\n', end)
      const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx
      const next = value.slice(lineStart, lineEnd).split('\n').map((line) => (
        event.shiftKey ? line.replace(/^ {1,2}/, '') : `  ${line}`
      )).join('\n')
      place(value.slice(0, lineStart) + next + value.slice(lineEnd), lineStart + next.length)
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      const start = input.selectionStart
      const value = input.value
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      const indent = (value.slice(lineStart, start).match(/^ */) || [''])[0]
      const insert = `\n${indent}`
      place(value.slice(0, start) + insert + value.slice(input.selectionEnd), start + insert.length)
    }
  })

  paint()
  parent.replaceChildren(root)
  return {
    focus() { input.focus() },
    getCode() { return input.value },
  }
}
