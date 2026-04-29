/**
 * Rewrite learner `console.log(...)` calls into `__pgLog(id, ...)` for replay,
 * preserving argument expressions. Skips occurrences inside strings/comments.
 */

function scanFindConsoleLogOpenParen(code: string, from: number): number {
  const n = code.length
  let i = from
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
      if (c === '\n') {
        lineComment = false
      }
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

    if (
      (c === 'c' || c === 'C') &&
      code.slice(i, i + 11).toLowerCase() === 'console.log' &&
      !/[\w$.]/.test(code[i - 1] ?? ' ') &&
      !/[\w$.]/.test(code[i + 11] ?? ' ')
    ) {
      let j = i + 11
      while (j < n && /\s/.test(code[j]!)) j++
      if (j < n && code[j] === '(') return j
    }

    i++
  }
  return -1
}

/** `open` is the index of `(` right after `console.log` */
export function findClosingParen(code: string, open: number): number {
  const n = code.length
  let depth = 0
  let i = open
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

    if (c === '(') depth++
    else if (c === ')') {
      depth--
      if (depth === 0) return i
    }
    i++
  }
  return -1
}

export function instrumentPlaygroundConsoleLogs(code: string): {
  code: string
  siteCount: number
} {
  const chunks: string[] = []
  let pos = 0
  let site = 0
  for (;;) {
    const open = scanFindConsoleLogOpenParen(code, pos)
    if (open === -1) {
      chunks.push(code.slice(pos))
      break
    }
    chunks.push(code.slice(pos, open))
    const close = findClosingParen(code, open)
    if (close === -1) {
      chunks.push(code.slice(open))
      break
    }
    const inner = code.slice(open + 1, close)
    if (inner.trim().length === 0) {
      chunks.push(`__pgLog(${site++})`)
    } else {
      chunks.push(`__pgLog(${site++}, `)
      chunks.push(inner)
      chunks.push(')')
    }
    pos = close + 1
  }
  return { code: chunks.join(''), siteCount: site }
}
