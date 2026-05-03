/**
 * Drop steppable source lines that sit in if/else branches that did not run,
 * using console.log site hits from an instrumented run.
 */

import { findClosingParen } from './playgroundInstrument'

export type IfElseRegion = {
  /** 0-based line index of the line containing `if (` */
  condLine: number
  thenLines: ReadonlySet<number>
  /** Set of lines when `else { ... }` exists and is not an `else if` chain */
  elseLines: ReadonlySet<number> | null
  /** True when `else if` appears — only the leading `then` block is modeled */
  hasElseIf: boolean
}

function lineOfIndex(code: string, idx: number): number {
  let line = 0
  for (let i = 0; i < idx && i < code.length; i++) {
    if (code[i] === '\n') line++
  }
  return line
}

function skipWs(code: string, i: number): number {
  let j = i
  while (j < code.length && /\s/.test(code[j]!)) j++
  return j
}

/** From char after `{`, return inclusive line range of matching `}` body */
function bracedBodyLineRange(
  code: string,
  openBrace: number,
): { startLine: number; endLine: number } | null {
  let depth = 1
  let i = openBrace + 1
  const n = code.length
  let inS = false
  let inD = false
  let inT = false
  let tExpr = 0
  let lineComment = false
  let blockComment = false

  const startLine = lineOfIndex(code, openBrace)

  while (i < n) {
    const c = code[i]!
    const next = i + 1 < n ? code[i + 1]! : ''

    if (lineComment) {
      if (c === '\n') lineComment = false
      i++
      continue
    }
    if (blockComment) {
      if (c === '*' && next === '/') {
        blockComment = false
        i += 2
        continue
      }
      i++
      continue
    }

    if (inS) {
      if (c === '\\' && i + 1 < n) {
        i += 2
        continue
      }
      if (c === "'") inS = false
      i++
      continue
    }
    if (inD) {
      if (c === '\\' && i + 1 < n) {
        i += 2
        continue
      }
      if (c === '"') inD = false
      i++
      continue
    }
    if (inT) {
      if (c === '\\' && i + 1 < n) {
        i += 2
        continue
      }
      if (c === '`') {
        inT = false
        i++
        continue
      }
      if (c === '$' && next === '{') {
        tExpr++
        i += 2
        continue
      }
      i++
      continue
    }
    if (tExpr > 0) {
      if (c === '{') tExpr++
      else if (c === '}') tExpr--
      i++
      continue
    }

    if (c === '/' && next === '/') {
      lineComment = true
      i += 2
      continue
    }
    if (c === '/' && next === '*') {
      blockComment = true
      i += 2
      continue
    }

    if (c === "'") {
      inS = true
      i++
      continue
    }
    if (c === '"') {
      inD = true
      i++
      continue
    }
    if (c === '`') {
      inT = true
      i++
      continue
    }

    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) {
        const endLine = lineOfIndex(code, i)
        return { startLine, endLine }
      }
    }
    i++
  }
  return null
}

function lineRangeToSet(startLine: number, endLine: number): Set<number> {
  const s = new Set<number>()
  for (let l = startLine; l <= endLine; l++) s.add(l)
  return s
}

/**
 * Collect `if (...) { ... }` regions with optional `else { ... }` (not `else if`).
 * Nested ifs produce separate regions.
 */
export function findIfElseRegions(code: string): IfElseRegion[] {
  const regions: IfElseRegion[] = []
  const lower = code.toLowerCase()
  let pos = 0

  while (pos < code.length) {
    const idx = lower.indexOf('if', pos)
    if (idx === -1) break

    const before = idx > 0 ? code[idx - 1]! : ' '
    const after2 = idx + 2 < code.length ? code[idx + 2]! : ' '
    if (/[a-z0-9_$]/i.test(before) || /[a-z0-9_$]/i.test(after2)) {
      pos = idx + 2
      continue
    }

    const parenOpen = skipWs(code, idx + 2)
    if (parenOpen >= code.length || code[parenOpen] !== '(') {
      pos = idx + 2
      continue
    }

    const parenClose = findClosingParen(code, parenOpen)
    if (parenClose === -1) break

    const afterCond = skipWs(code, parenClose + 1)
    if (afterCond >= code.length || code[afterCond] !== '{') {
      pos = parenClose + 1
      continue
    }

    const thenBody = bracedBodyLineRange(code, afterCond)
    if (!thenBody) break

    let scan = afterCond + 1
    let depth = 1
    while (scan < code.length && depth > 0) {
      const ch = code[scan]!
      if (ch === '{') depth++
      else if (ch === '}') depth--
      scan++
    }
    const afterThen = skipWs(code, scan)

    let elseLines: Set<number> | null = null
    let hasElseIf = false

    if (
      afterThen + 4 <= code.length &&
      lower.slice(afterThen, afterThen + 4) === 'else'
    ) {
      const afterElseKw = skipWs(code, afterThen + 4)
      if (
        afterElseKw + 2 < code.length &&
        lower.slice(afterElseKw, afterElseKw + 2) === 'if'
      ) {
        hasElseIf = true
      } else if (afterElseKw < code.length && code[afterElseKw] === '{') {
        const eb = bracedBodyLineRange(code, afterElseKw)
        if (eb) elseLines = lineRangeToSet(eb.startLine, eb.endLine)
      }
    }

    regions.push({
      condLine: lineOfIndex(code, idx),
      thenLines: lineRangeToSet(thenBody.startLine, thenBody.endLine),
      elseLines,
      hasElseIf,
    })

    pos = idx + 2
  }

  return regions
}

function siteLinesHit(siteHits: readonly number[], siteToLine: readonly number[]): Set<number> {
  const lines = new Set<number>()
  for (const id of siteHits) {
    const ln = siteToLine[id]
    if (ln !== undefined) lines.add(ln)
  }
  return lines
}

function classifyRegion(
  r: IfElseRegion,
  hitLines: ReadonlySet<number>,
): 'then' | 'else' | 'skip-then' | 'unknown' {
  const thenHit = [...r.thenLines].some((l) => hitLines.has(l))
  const elseHit =
    r.elseLines !== null && [...r.elseLines].some((l) => hitLines.has(l))

  if (r.hasElseIf) {
    if (!thenHit) return 'skip-then'
    return 'unknown'
  }

  if (r.elseLines === null) {
    if (!thenHit) return 'skip-then'
    return 'then'
  }

  if (thenHit && !elseHit) return 'then'
  if (elseHit && !thenHit) return 'else'
  return 'unknown'
}

/**
 * Remove steppable indices that fall on lines excluded by inactive branches.
 * Inner regions (smaller spans) are applied first so nested ifs behave sensibly.
 */
export function filterSteppableLinesForIfBranches(
  steppable: readonly number[],
  code: string,
  siteHits: readonly number[] | undefined,
  siteToLine: readonly number[],
): number[] {
  if (!siteHits || siteHits.length === 0) return [...steppable]

  const regions = findIfElseRegions(code)
  if (regions.length === 0) return [...steppable]

  const hitLines = siteLinesHit(siteHits, siteToLine)
  const excluded = new Set<number>()

  const span = (r: IfElseRegion): number => {
    let lo = Infinity
    let hi = -Infinity
    for (const l of r.thenLines) {
      lo = Math.min(lo, l)
      hi = Math.max(hi, l)
    }
    if (r.elseLines) {
      for (const l of r.elseLines) {
        lo = Math.min(lo, l)
        hi = Math.max(hi, l)
      }
    }
    return hi - lo
  }
  const sorted = [...regions].sort((a, b) => span(a) - span(b))

  for (const r of sorted) {
    const kind = classifyRegion(r, hitLines)
    if (kind === 'then') {
      if (r.elseLines) for (const l of r.elseLines) excluded.add(l)
    } else if (kind === 'else' || kind === 'skip-then') {
      for (const l of r.thenLines) {
        if (l !== r.condLine) excluded.add(l)
      }
    }
  }

  return steppable.filter((ln) => !excluded.has(ln))
}
