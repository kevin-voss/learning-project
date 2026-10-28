// Renders a generated sheet page (built by hub/scripts/build-site.mjs):
// markdown → HTML with marked, then the house style on top:
//   > [!PICTURE] / [!TRY] / [!CHECK] / [!NOTE] / [!WARN] quotes become boxes (docs/STYLE.md),
//   ```mermaid blocks become diagrams (theme colours from --lp-*),
//   .md links point to the built .html pages, headings get GitHub-style ids for #links,
//   ```desk fences become the my-solution editor mount,
//   code blocks get syntax colours and a Copy button.
(function () {
  const LABELS = { PICTURE: 'Picture this', TRY: 'Try it', CHECK: 'Check yourself', NOTE: 'Good to know', WARN: 'Watch out' }

  function cssVar(name, fallback) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  }

  function boxes(root) {
    for (const quote of root.querySelectorAll('blockquote')) {
      const first = quote.firstElementChild
      const match = first?.innerHTML.match(/^\s*\[!(PICTURE|TRY|CHECK|NOTE|WARN)\]\s*(<br>)?\s*/i)
      if (!match) continue
      const type = match[1].toUpperCase()
      first.innerHTML = first.innerHTML.slice(match[0].length)
      if (!first.innerHTML.trim()) first.remove()
      const box = document.createElement('aside')
      box.className = `lp-box lp-box-${type.toLowerCase()}`
      const label = document.createElement('p')
      label.className = 'lp-box-label'
      label.textContent = LABELS[type]
      box.append(label, ...quote.childNodes)
      quote.replaceWith(box)
    }
  }

  function links(root) {
    for (const a of root.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href')
      if (!/^[a-z]+:/i.test(href)) a.setAttribute('href', href.replace(/\.md(?=$|[#?])/, '.html'))
    }
  }

  // "Daily commands and the Maven wrapper" → "daily-commands-and-the-maven-wrapper", like GitHub.
  function anchors(root) {
    const used = new Map()
    for (const heading of root.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
      if (heading.id) continue
      const base = heading.textContent.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-')
      const n = used.get(base) ?? 0
      used.set(base, n + 1)
      heading.id = n ? `${base}-${n}` : base
    }
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
  }

  // Turn ```mermaid fences into live diagrams (no <img> files).
  function mermaidDiagrams(root) {
    const blocks = [...root.querySelectorAll('pre > code.language-mermaid')]
    if (!blocks.length) return
    const draw = () => {
      if (!window.mermaid) return
      const text = cssVar('--lp-text', '#1f2933')
      const nodes = blocks.map((code) => {
        const pre = code.parentElement
        const src = code.textContent
        pre.className = 'mermaid'
        pre.dataset.src = src
        pre.textContent = src
        return pre
      })
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'strict',
        fontFamily: cssVar('--lp-font', 'sans-serif'),
        themeVariables: {
          darkMode: getComputedStyle(document.documentElement).colorScheme.includes('dark'),
          background: cssVar('--lp-surface', '#ffffff'),
          primaryColor: cssVar('--lp-surface-2', '#f3efe6'),
          primaryTextColor: text,
          primaryBorderColor: cssVar('--lp-accent', '#2f6fde'),
          secondaryColor: cssVar('--lp-accent-soft', '#e6eefc'),
          tertiaryColor: cssVar('--lp-surface', '#ffffff'),
          lineColor: cssVar('--lp-text-muted', '#5f6b7a'),
          textColor: text,
        },
      })
      window.mermaid.run({ nodes }).catch(() => {})
    }
    if (window.mermaid) draw()
    else window.addEventListener('load', draw, { once: true })
  }

  function code(root) {
    for (const block of root.querySelectorAll('pre > code')) {
      if (window.hljs) window.hljs.highlightElement(block)
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'lp-copy'
      button.textContent = 'Copy'
      button.addEventListener('click', () => {
        navigator.clipboard?.writeText(block.textContent).then(() => {
          button.textContent = 'Copied ✓'
          setTimeout(() => (button.textContent = 'Copy'), 1500)
        })
      })
      block.parentElement.append(button)
    }
  }

  // ```desk on a my-solution page. Replaced before code blocks get Copy buttons.
  function desks(root) {
    for (const block of root.querySelectorAll('pre > code.language-desk')) {
      const div = document.createElement('div')
      div.id = 'desk'
      block.parentElement.replaceWith(div)
    }
  }

  function render() {
    const source = document.getElementById('sheet-md')
    const article = document.getElementById('sheet')
    if (source && article && window.marked) {
      article.innerHTML = window.marked.parse(JSON.parse(source.textContent))
      desks(article)
      boxes(article)
      links(article)
      anchors(article)
      mermaidDiagrams(article)
    }
    code(document.querySelector('.lp-sheet') ?? document)
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render)
  else render()
})()
