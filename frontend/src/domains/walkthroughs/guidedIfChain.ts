/**
 * Skip auto-inserted “filler” steps on lines inside if / else-if / else arms that
 * authored guided traces never execute (e.g. Grade Classifier dead branches).
 */

import { findClosingParen } from './playgroundInstrument'

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

/** `openBrace` index is `{` */
function findClosingBraceIndex(code: string, openBrace: number): number {
  let depth = 1
  let i = openBrace + 1
  const n = code.length
  let inS = false
  let inD = false
  let inT = false
  let tExpr = 0
  let lineComment = false
  let blockComment = false

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
      if (depth === 0) return i
    }
    i++
  }
  return -1
}

function startsWithKeywordElse(code: string, pos: number): boolean {
  const slice = code.slice(pos, pos + 4).toLowerCase()
  if (slice !== 'else') return false
  const after = code[pos + 4]
  return after === undefined || !/[\w$]/.test(after)
}

function startsWithKeywordIf(code: string, pos: number): boolean {
  const slice = code.slice(pos, pos + 2).toLowerCase()
  if (slice !== 'if') return false
  const after = code[pos + 2]
  return after === undefined || !/[\w$]/.test(after)
}

export type GuidedChainArm = {
  condLine: number
  bodyInteriorLines: ReadonlySet<number>
  closeBraceLine: number
}

/**
 * Parse a braced `if` / `else if` / `else` chain starting at `ifPos` (`if` keyword).
 * Returns exclusive end index in `code` after the final closing `}`.
 */
export function parseIfElseChainAt(code: string, ifPos: number): {
  arms: GuidedChainArm[]
  endPosExclusive: number
} | null {
  if (!startsWithKeywordIf(code, ifPos)) return null

  const arms: GuidedChainArm[] = []
  let pos = ifPos

  for (;;) {
    const condKwStart = pos
    pos = skipWs(code, pos + 2)
    if (pos >= code.length || code[pos] !== '(') return null

    const condClose = findClosingParen(code, pos)
    if (condClose === -1) return null

    const condLine = lineOfIndex(code, condKwStart)

    const afterCond = skipWs(code, condClose + 1)
    if (afterCond >= code.length || code[afterCond] !== '{') return null

    const openBrace = afterCond
    const closeBraceIdx = findClosingBraceIndex(code, openBrace)
    if (closeBraceIdx === -1) return null

    const openLine = lineOfIndex(code, openBrace)
    const closeLine = lineOfIndex(code, closeBraceIdx)
    const bodyInterior = new Set<number>()
    for (let L = openLine + 1; L <= closeLine - 1; L++) bodyInterior.add(L)

    arms.push({
      condLine,
      bodyInteriorLines: bodyInterior,
      closeBraceLine: closeLine,
    })

    pos = skipWs(code, closeBraceIdx + 1)
    if (!startsWithKeywordElse(code, pos)) break

    const afterElse = skipWs(code, pos + 4)
    if (startsWithKeywordIf(code, afterElse)) {
      pos = afterElse
      continue
    }
    if (afterElse < code.length && code[afterElse] === '{') {
      const elseKwLine = lineOfIndex(code, pos)
      const elseOpen = afterElse
      const elseClose = findClosingBraceIndex(code, elseOpen)
      if (elseClose === -1) return null
      const oL = lineOfIndex(code, elseOpen)
      const cL = lineOfIndex(code, elseClose)
      const interior = new Set<number>()
      for (let L = oL + 1; L <= cL - 1; L++) interior.add(L)
      arms.push({
        condLine: elseKwLine,
        bodyInteriorLines: interior,
        closeBraceLine: cL,
      })
      pos = skipWs(code, elseClose + 1)
    }
    break
  }

  return { arms, endPosExclusive: pos }
}

function naiveBraceDelta(line: string): number {
  let d = 0
  for (let i = 0; i < line.length; i++) {
    const c = line[i]!
    if (c === '{') d++
    else if (c === '}') d--
  }
  return d
}

function lineStartOffsets(codeLines: readonly string[]): number[] {
  const o: number[] = []
  let acc = 0
  for (let i = 0; i < codeLines.length; i++) {
    o[i] = acc
    acc += codeLines[i].length + 1
  }
  return o
}

/**
 * Line indices that should not receive sequential filler steps (dead arms).
 */
export function omitGuidedFillerLinesForDeadBranches(
  codeLines: readonly string[],
  visitedLines: ReadonlySet<number>,
): Set<number> {
  const omit = new Set<number>()
  const code = codeLines.join('\n')
  const offsets = lineStartOffsets(codeLines)
  let depth = 0

  for (let li = 0; li < codeLines.length; li++) {
    const line = codeLines[li]!
    if (depth === 0 && /^\s*if\s*\(/.test(line)) {
      const rel = line.search(/\bif\b/)
      if (rel === -1) {
        depth += naiveBraceDelta(line)
        continue
      }
      const ifPos = offsets[li]! + rel
      const parsed = parseIfElseChainAt(code, ifPos)
      if (parsed) {
        markDeadArmsForOmission(parsed.arms, visitedLines, omit)
        const endLi = lineOfIndex(code, Math.max(0, parsed.endPosExclusive - 1))
        for (let j = li; j <= endLi; j++) {
          depth += naiveBraceDelta(codeLines[j]!)
        }
        li = endLi
        continue
      }
    }
    depth += naiveBraceDelta(line)
    if (depth < 0) depth = 0
  }

  return omit
}

function markDeadArmsForOmission(
  arms: readonly GuidedChainArm[],
  visited: ReadonlySet<number>,
  omit: Set<number>,
): void {
  if (arms.length === 0) return

  let taken = -1
  for (let k = 0; k < arms.length; k++) {
    const arm = arms[k]!
    for (const ln of arm.bodyInteriorLines) {
      if (visited.has(ln)) {
        taken = k
        break
      }
    }
    if (taken !== -1) break
  }
  if (taken === -1) return

  for (let j = 0; j < arms.length; j++) {
    if (j < taken) {
      for (const ln of arms[j].bodyInteriorLines) omit.add(ln)
    } else if (j > taken) {
      omit.add(arms[j].condLine)
      for (const ln of arms[j].bodyInteriorLines) omit.add(ln)
      omit.add(arms[j].closeBraceLine)
    }
  }
}
