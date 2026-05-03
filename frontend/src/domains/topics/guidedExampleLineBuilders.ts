import type { CodeLine } from '@/types/curriculum'
export function linesFromStrings(code: string[]): CodeLine[] {
  return code.map((text, lineIdx) => ({
    segments: [{ id: `line-${lineIdx}-all`, text }],
  }))
}

function lineConsoleLogOneIdentifier(text: string): CodeLine {
  const m = /^(\s*console\.log\()(\w+)(\);)$/.exec(text)
  if (m) {
    return {
      segments: [
        { id: 'log-call-open', text: m[1] },
        { id: 'log-arg-value', text: m[2] },
        { id: 'log-call-close', text: m[3] },
      ],
    }
  }
  return { segments: [{ id: 'line-plain-all', text }] }
}

/**
 * Segmented `for` header + segmented `console.log(i)` body for “Count 1 to 5”.
 */
export function linesForCountOneToFive(code: string[]): CodeLine[] {
  const [, ...rest] = code
  const head: CodeLine = {
    segments: [
      { id: 'for-init', text: 'for (let i = 1;' },
      { id: 'for-cond', text: ' i <= 5;' },
      { id: 'for-update', text: ' i++)' },
      { id: 'for-open', text: ' {' },
    ],
  }
  void code[0]
  const tail = rest.map((text, i) => {
    if (text.includes('console.log')) return lineConsoleLogOneIdentifier(text)
    return { segments: [{ id: `line-c15-${i + 1}-all`, text }] }
  })
  return [head, ...tail]
}

function lineLetSumZero(text: string): CodeLine | null {
  const m = /^(let\s+)(sum)( = 0;\s*)$/.exec(text)
  if (m) {
    return {
      segments: [
        { id: 'sum-init-kw', text: m[1] ?? '' },
        { id: 'sum-init-name', text: m[2] ?? '' },
        { id: 'sum-init-rest', text: m[3] ?? '' },
      ],
    }
  }
  return null
}

/**
 * “Sum 1 to 5”: init `sum`, segmented `for` header, granular `sum = sum + i`,
 * segmented `console.log("Total:", sum)`.
 */
export function linesForSumOneToFive(code: string[]): CodeLine[] {
  return code.map((text, lineIdx) => {
    const lz = text.trimStart().startsWith('let sum') ? lineLetSumZero(text) : null
    if (lz) return lz
    if (text.trimStart().startsWith('for (')) {
      return {
        segments: [
          { id: 'for-init', text: 'for (let i = 1;' },
          { id: 'for-cond', text: ' i <= 5;' },
          { id: 'for-update', text: ' i++)' },
          { id: 'for-open', text: ' {' },
        ],
      }
    }
    const bod = /^(\s*)(sum)(\s*=\s*)(sum)(\s*\+\s*)(i)(\s*;\s*)$/.exec(text)
    if (bod) {
      return {
        segments: [
          { id: 'body-indent', text: bod[1] ?? '' },
          { id: 'body-assign-target', text: bod[2] ?? '' },
          { id: 'body-assign-eq', text: bod[3] ?? '' },
          { id: 'body-expr-sum-ref', text: bod[4] ?? '' },
          { id: 'body-plus', text: '+' },
          { id: 'body-expr-i', text: bod[6] ?? 'i' },
          { id: 'body-semi-tail', text: bod[7] ?? ';' },
        ],
      }
    }
    const fin = /^(\s*console\.log\(\s*"Total:"\s*,\s*)(sum)(\);\s*)$/.exec(text)
    if (fin) {
      return {
        segments: [
          { id: 'sum-final-call', text: fin[1] ?? '' },
          { id: 'sum-final-var', text: fin[2] ?? '' },
          { id: 'sum-final-close', text: fin[3] ?? '' },
        ],
      }
    }
    return { segments: [{ id: `line-sum15-${lineIdx}-all`, text }] }
  })
}

/** Countdown: `for` with `i--` + segmented `console.log(i)`. */
export function linesForCountdown(code: string[]): CodeLine[] {
  const [, ...rest] = code
  const head: CodeLine = {
    segments: [
      { id: 'for-init', text: 'for (let i = 5;' },
      { id: 'for-cond', text: ' i > 0;' },
      { id: 'for-update', text: ' i--)' },
      { id: 'for-open', text: ' {' },
    ],
  }
  void code[0]
  const tail = rest.map((text, i) => {
    if (text.includes('console.log')) return lineConsoleLogOneIdentifier(text)
    return { segments: [{ id: `line-cdn-${i + 1}-all`, text }] }
  })
  return [head, ...tail]
}

/** Customer loyalty — segmented header + granular `customers[i].savings`. */
export function linesForCustomerIndexedFor(code: string[]): CodeLine[] {
  const idx = code.findIndex((line) => line.trimStart().startsWith('for ('))
  if (idx < 0) return linesFromStrings(code)

  const before = code.slice(0, idx).map((text, i) => ({
    segments: [{ id: `line-pre-${i}-all`, text }],
  }))

  const head: CodeLine = {
    segments: [
      { id: 'for-init', text: 'for (let i = 0;' },
      { id: 'for-cond', text: ' i < customers.length;' },
      { id: 'for-update', text: ' i++)' },
      { id: 'for-open', text: ' {' },
    ],
  }

  const after = code.slice(idx + 1).map((text, ai) => {
    const loyalty = /^(\s*)(totalSavings)(\s*\+=\s*)(customers)(\[\s*i\s*\])(\.savings;\s*)$/.exec(
      text.trimEnd(),
    )
    if (loyalty) {
      return {
        segments: [
          { id: 'loy-indent', text: loyalty[1] ?? '' },
          { id: 'loy-target', text: loyalty[2] ?? '' },
          { id: 'loy-op', text: loyalty[3] ?? '' },
          { id: 'loy-arr', text: loyalty[4] ?? '' },
          { id: 'loy-subscr', text: loyalty[5] ?? '' },
          { id: 'loy-field', text: loyalty[6] ?? '' },
        ],
      }
    }
    const logicalIdx = idx + 1 + ai
    return { segments: [{ id: `line-after-${logicalIdx}-all`, text }] }
  })

  return [...before, head, ...after]
}

/** “Sum All Elements”: `for` header + granular `nums[i]` on the reducer line. */
export function linesArraysSumAllElements(code: string[]): CodeLine[] {
  const fi = code.findIndex((l) => l.trimStart().startsWith('for ('))
  return code.map((text, row) => {
    if (row === fi && fi !== -1) {
      return {
        segments: [
          { id: 'for-init', text: 'for (let i = 0;' },
          { id: 'for-cond', text: ' i < nums.length;' },
          { id: 'for-update', text: ' i++)' },
          { id: 'for-open', text: ' {' },
        ],
      }
    }
    const sumLn = /^(\s*)(sum)(\s*=\s*)(sum)(\s*\+\s*)(nums)(\[\s*)(i)(\s*\]\s*;\s*)$/.exec(
      text.trimEnd(),
    )
    if (sumLn) {
      return {
        segments: [
          { id: 'arr-sum-indent', text: sumLn[1] ?? '' },
          { id: 'arr-sum-assign', text: sumLn[2] ?? '' },
          { id: 'arr-sum-eq', text: sumLn[3] ?? '' },
          { id: 'arr-acc', text: sumLn[4] ?? '' },
          { id: 'arr-plus', text: ' + ' },
          { id: 'arr-base', text: sumLn[6] ?? 'nums' },
          { id: 'arr-br-open', text: '[' },
          { id: 'arr-idx-i', text: sumLn[8] ?? 'i' },
          { id: 'arr-tail', text: (sumLn[9] ?? '];').trim() },
        ],
      }
    }
    return { segments: [{ id: `arr-sae-${row}-all`, text }] }
  })
}

/** “Find Maximum”: segmented `for`, `if (nums[i] > …)`, assignment `max = nums[i]`. */
export function linesArraysFindMaximum(code: string[]): CodeLine[] {
  const fi = code.findIndex((l) => l.trimStart().startsWith('for ('))
  return code.map((text, row) => {
    if (row === fi && fi !== -1) {
      return {
        segments: [
          { id: 'for-init', text: 'for (let i = 1;' },
          { id: 'for-cond', text: ' i < nums.length;' },
          { id: 'for-update', text: ' i++)' },
          { id: 'for-open', text: ' {' },
        ],
      }
    }
    if (text.trimEnd() === '  if (nums[i] > max) {') {
      return {
        segments: [
          { id: 'fm-if-lead', text: '  if (' },
          { id: 'fm-if-arr', text: 'nums' },
          { id: 'fm-if-bo', text: '[' },
          { id: 'fm-if-idx', text: 'i' },
          { id: 'fm-if-rest', text: '] > max) {' },
        ],
      }
    }
    if (text.trimEnd() === '    max = nums[i];') {
      return {
        segments: [
          { id: 'fm-max-indent', text: '    ' },
          { id: 'fm-max-lhs', text: 'max' },
          { id: 'fm-max-eq', text: ' = ' },
          { id: 'fm-max-base', text: 'nums' },
          { id: 'fm-max-bo', text: '[' },
          { id: 'fm-max-idx', text: 'i' },
          { id: 'fm-max-end', text: '];' },
        ],
      }
    }
    return { segments: [{ id: `fm-fmax-${row}-all`, text }] }
  })
}

/** “Double Until 100”: segmented `while` condition + assignment `n = n * 2`. */
export function linesWhileDoubleUntil100(code: string[]): CodeLine[] {
  return code.map((text, row) => {
    if (/^\s*while\s*\(\s*n\s*</.test(text.trimStart())) {
      return {
        segments: [
          { id: 'while-kw', text: 'while (' },
          { id: 'while-cond', text: 'n < 100' },
          { id: 'while-rest', text: ') {' },
        ],
      }
    }
    if (text.includes('console.log')) return lineConsoleLogOneIdentifier(text)
    const asn = /^(\s*)(n)(\s*=\s*)(n)(\s*\*\s*)(2)(\s*;\s*)$/.exec(text)
    if (asn) {
      return {
        segments: [
          { id: 'dbl-indent', text: asn[1] ?? '' },
          { id: 'dbl-lhs', text: asn[2] ?? 'n' },
          { id: 'dbl-eq', text: asn[3] ?? '' },
          { id: 'dbl-rhs-a', text: asn[4] ?? 'n' },
          { id: 'dbl-times', text: '*' },
          { id: 'dbl-rhs-num', text: asn[6] ?? '2' },
          { id: 'dbl-end', text: asn[7] ?? ';' },
        ],
      }
    }
    return { segments: [{ id: `line-wdu-${row}-all`, text }] }
  })
}
