// Renders a generated sheet page (built by hub/scripts/build-site.mjs):
// markdown → HTML with marked, then the house style on top:
//   > [!PICTURE] / [!TRY] / [!CHECK] / [!NOTE] / [!WARN] quotes become boxes (docs/STYLE.md),
//   .md links point to the built .html pages, headings get GitHub-style ids for #links,
//   code blocks get syntax colours and a Copy button.
(function () {
  const LABELS = { PICTURE: 'Picture this', TRY: 'Try it', CHECK: 'Check yourself', NOTE: 'Good to know', WARN: 'Watch out' }

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

  function render() {
    const source = document.getElementById('sheet-md')
    const article = document.getElementById('sheet')
    if (source && article && window.marked) {
      article.innerHTML = window.marked.parse(JSON.parse(source.textContent))
      boxes(article)
      links(article)
      anchors(article)
    }
    code(document.querySelector('.lp-sheet') ?? document)
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render)
  else render()
})()
