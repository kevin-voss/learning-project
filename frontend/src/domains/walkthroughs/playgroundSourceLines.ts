/**
 * Source-line helpers for playground replay stepping (which lines are “steppable”,
 * where console.log sites are). Distinct from {@link codeStringToCodeLines} in
 * `line-highlights`, which shapes curriculum display segments.
 */

/** Split JS source into lines, normalizing CRLF / old Mac endings. */
export function splitSourceLines(code: string): string[] {
  return code.split(/\r\n|\r|\n/)
}

export function isSteppableSourceLine(text: string): boolean {
  const t = text.trim()
  if (!t) return false
  if (t.startsWith('//')) return false
  if (t.startsWith('/*') || t.startsWith('*') || t.startsWith('*/')) return false
  if (t === '{' || t === '}' || t === '};') return false
  return true
}

export function steppableSourceLineIndices(lines: readonly string[]): number[] {
  const out: number[] = []
  for (let i = 0; i < lines.length; i++) {
    if (isSteppableSourceLine(lines[i]!)) out.push(i)
  }
  return out
}

/** 0-based line index of each console.log(...) site in source order */
export function enumerateConsoleLogLineIndices(lines: readonly string[]): number[] {
  const sites: number[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    const matches = line.match(/console\.log\s*\(/g)
    if (!matches) continue
    matches.forEach(() => {
      sites.push(i)
    })
  }
  return sites
}
