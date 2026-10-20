/**
 * Builds HTML for syntax-colored code overlays (e.g. `dangerouslySetInnerHTML`).
 * String literals become `<span class="syn-str">…</span>` for CSS only; learners
 * still edit plain JS in the textarea. String tokens are extracted before keyword
 * tinting so `class` in `class="syn-str"` is never mistaken for the JS keyword.
 */

const STRING_PH = (i: number) => `\uE000STR${i}\uE001`

export function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function syntaxTintHtml(line: string): string {
  if (!line.trim()) {
    return '<span class="syn-cmt">&nbsp;</span>'
  }
  let result = escapeHtml(line)
  const strings: string[] = []
  result = result.replace(/(["'`])(?:(?!\1).)*?\1/g, (lit) => {
    strings.push(lit)
    return STRING_PH(strings.length - 1)
  })
  result = result.replace(/(\/\/.*)$/, '<span class="syn-cmt">$1</span>')
  result = result.replace(
    /\b(async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|null|return|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield|true|false|of|static|get|set)\b/g,
    '<span class="syn-kw">$1</span>',
  )
  result = result.replace(/\b(\d+)\b/g, '<span class="syn-num">$1</span>')
  result = result.replace(
    /\b(Math\.\w+|console\.\w+|parseInt|parseFloat|isNaN)\b/g,
    '<span class="syn-fn">$1</span>',
  )
  for (let i = 0; i < strings.length; i++) {
    result = result.replace(STRING_PH(i), `<span class="syn-str">${strings[i]}</span>`)
  }
  return result
}
