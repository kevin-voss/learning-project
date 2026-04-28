import type {
  CodeLine,
  ExecutionStep,
  Topic,
  VariableSnapshot,
} from '@/types/curriculum'

/** Raw shape from prototype extraction (`_topics_raw.json`) */
export type RawStep = {
  l: number
  vars: VariableSnapshot
  out: string[]
  expl: string
  changed?: string[]
  console?: boolean
  arrIdx?: number
}

export type RawExample = {
  name: string
  code: string[]
  steps: RawStep[]
}

export type RawTopicIntro = {
  whatItIs: string
  whyItMatters: string
  realWorldExamples: string[]
  syntaxPattern?: string
  syntaxParts?: string[]
  technicalExample?: string
  everydayExample?: string
  buildsOn?: { topicId: string; note: string }[]
}

export type RawTopic = {
  id: string
  name: string
  icon: string
  desc: string
  intro?: RawTopicIntro
  examples: RawExample[]
}

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

function buildLines(topicId: string, exampleName: string, code: string[]): CodeLine[] {
  if (topicId === 'loops' && exampleName === 'Count 1 to 5') return linesForCountOneToFive(code)
  if (topicId === 'loops' && exampleName === 'Sum 1 to 5') return linesForSumOneToFive(code)
  if (topicId === 'loops' && exampleName === 'Countdown') return linesForCountdown(code)
  if (topicId === 'loops' && exampleName === 'Customer loyalty savings')
    return linesForCustomerIndexedFor(code)

  if (topicId === 'while-loop' && exampleName === 'Double Until 100')
    return linesWhileDoubleUntil100(code)

  if (topicId === 'arrays') {
    if (exampleName === 'Sum All Elements') return linesArraysSumAllElements(code)
    if (exampleName === 'Find Maximum') return linesArraysFindMaximum(code)
  }
  return linesFromStrings(code)
}

function clampLineIndex(l: number, lineCount: number): number {
  if (lineCount <= 0) return 0
  return Math.min(Math.max(0, l), lineCount - 1)
}

function normalizeRawStep(step: RawStep, lineCount: number): ExecutionStep {
  return {
    lineIndex: clampLineIndex(step.l, lineCount),
    variables: step.vars,
    consoleLines: step.out,
    explanation: step.expl,
    changed: step.changed,
    consoleStep: step.console === true,
    arrIdx: step.arrIdx,
  }
}

/**
 * One walkthrough pass top-to-bottom: every source line gets at least one step. Authored
 * substeps for the same line keep curriculum order; missing lines get short filler steps
 * that carry variable/console state forward.
 */
function expandToSequentialLines(
  lines: CodeLine[],
  code: string[],
  authored: ExecutionStep[],
): ExecutionStep[] {
  const n = lines.length
  if (n === 0) return []
  const clamp = (l: number) => clampLineIndex(l, n)

  const atLine = (i: number) =>
    authored.filter((s) => clamp(s.lineIndex) === i).map((s) => ({ ...s, lineIndex: i }))

  const out: ExecutionStep[] = []
  let prev: ExecutionStep | undefined

  const fillerExpl = (lineIdx: number): string => {
    const raw = code[lineIdx] ?? ''
    const t = raw.trim()
    if (t.length === 0) return `Line ${lineIdx + 1}: blank line (structure only).`
    const preview = t.length > 88 ? `${t.slice(0, 85)}…` : t
    return `Line ${lineIdx + 1}: ${preview}`
  }

  for (let i = 0; i < n; i++) {
    const stepsHere = atLine(i)
    if (stepsHere.length > 0) {
      for (const s of stepsHere) {
        out.push(s)
        prev = s
      }
    } else {
      const snapVars = prev ? { ...prev.variables } : {}
      const snapOut = prev ? [...prev.consoleLines] : []
      const f: ExecutionStep = {
        lineIndex: i,
        variables: snapVars,
        consoleLines: snapOut,
        explanation: fillerExpl(i),
      }
      out.push(f)
      prev = f
    }
  }

  return out
}

/** `for (init; cond; bump)` segments — unified across guided examples that share these ids. */
function focusClassicForLoopHeader(segmentedLineIdx: number, step: RawStep): string[] {
  if (step.l !== segmentedLineIdx) return []

  function isBump(raw: RawStep): boolean {
    const e = raw.expl
    if (!raw.changed?.includes('i')) return false
    return (
      /\bi\+\+/.test(e) ||
      /\bi--/.test(e) ||
      /\bincrement/i.test(e) ||
      /\bdecrement/i.test(e) ||
      /\b→/.test(e)
    )
  }

  function isInit(raw: RawStep): boolean {
    const e = raw.expl
    if (!raw.changed?.includes('i')) return false
    if (isBump(raw)) return false
    return (
      /^initialize\b/i.test(e) ||
      /^start the loop\b/i.test(e) ||
      /^start loop\b/i.test(e) ||
      /^start loop from\b/i.test(e) ||
      /initialize loop counter/i.test(e)
    )
  }

  function isLoopCond(raw: RawStep): boolean {
    if (isBump(raw)) return false
    const e = raw.expl
    return /\bcheck\b/i.test(e) || /^check\s*:?/im.test(e.trimStart())
  }

  if (isBump(step)) return ['for-update']
  if (isInit(step)) return ['for-init']
  if (isLoopCond(step)) return ['for-cond']
  return []
}

/** `while (…) {` segments. */
function focusWhileHeader(segmentedWhileIdx: number, step: RawStep): string[] {
  if (step.l !== segmentedWhileIdx) return []
  if (/\bcheck\b/i.test(step.expl)) return ['while-cond']
  return []
}

function focusSegmentsCountOneToFive(step: RawStep): string[] {
  const h = focusClassicForLoopHeader(0, step)
  if (h.length > 0) return h
  if (step.l === 1 && (step.console === true || /\bprint/i.test(step.expl)))
    return ['log-arg-value']
  return []
}

function focusSegmentsSumOneToFive(step: RawStep): string[] {
  if (step.l === 0 && step.changed?.includes('sum')) return ['sum-init-name']
  const h = focusClassicForLoopHeader(2, step)
  if (h.length > 0) return h
  if (step.l === 3 && step.changed?.includes('sum')) return ['body-expr-i']
  if (step.l === 6 && step.console === true) return ['sum-final-var']
  return []
}

function focusSegmentsCountdown(step: RawStep): string[] {
  const h = focusClassicForLoopHeader(0, step)
  if (h.length > 0) return h
  if (step.l === 1 && step.console === true) return ['log-arg-value']
  return []
}

/** Emphasize `customers[i]` (segment `loy-subscr`) while adding savings. */
function focusSegmentsCustomerLoyalty(
  forLineIdx: number,
  bodyLineIdx: number,
  step: RawStep,
): string[] {
  const hdr = focusClassicForLoopHeader(forLineIdx, step)
  if (hdr.length > 0) return hdr
  if (step.l === bodyLineIdx && step.changed?.includes('totalSavings')) return ['loy-subscr']
  return []
}

function focusSegmentsArraysSumAll(step: RawStep, forLn: number, sumBodyLn: number): string[] {
  const h = focusClassicForLoopHeader(forLn, step)
  if (h.length > 0) return h
  if (step.l === sumBodyLn && step.changed?.includes('sum'))
    return step.arrIdx != null ? ['arr-idx-i'] : ['arr-sum-assign']
  return []
}

function focusSegmentsArraysFindMax(
  step: RawStep,
  forLn: number,
  ifLn: number,
  maxAssignLn: number,
): string[] {
  const h = focusClassicForLoopHeader(forLn, step)
  if (h.length > 0) return h
  const e = step.expl
  if (
    step.l === ifLn &&
    (step.arrIdx != null || /\bnums\[/i.test(e) || /\bIs nums\b/i.test(e))
  ) {
    return ['fm-if-idx']
  }
  if (step.l === maxAssignLn && step.changed?.includes('max')) return ['fm-max-idx']
  return []
}

function focusSegmentsDoubleUntil(step: RawStep): string[] {
  const w = focusWhileHeader(2, step)
  if (w.length > 0) return w
  if (step.l === 3 && step.console === true) return ['log-arg-value']
  if (
    step.l === 4 &&
    step.changed?.includes('n') &&
    (step.expl.includes('*') || /\bDouble\b|\b×/i.test(step.expl))
  )
    return ['dbl-rhs-a', 'dbl-times', 'dbl-rhs-num']
  return []
}

function normalizeSteps(
  topicId: string,
  exampleName: string,
  rawSteps: RawStep[],
  lineCount: number,
): ExecutionStep[] {
  const base = rawSteps.map((s) => normalizeRawStep(s, lineCount))

  if (topicId === 'loops' && exampleName === 'Count 1 to 5') {
    return base.map((step, idx) => {
      const ids = focusSegmentsCountOneToFive(rawSteps[idx]!)
      return ids.length ? { ...step, focusSegmentIds: ids } : step
    })
  }

  if (topicId === 'loops' && exampleName === 'Sum 1 to 5') {
    return base.map((step, idx) => {
      const ids = focusSegmentsSumOneToFive(rawSteps[idx]!)
      return ids.length ? { ...step, focusSegmentIds: ids } : step
    })
  }

  if (topicId === 'loops' && exampleName === 'Countdown') {
    return base.map((step, idx) => {
      const ids = focusSegmentsCountdown(rawSteps[idx]!)
      return ids.length ? { ...step, focusSegmentIds: ids } : step
    })
  }

  if (topicId === 'loops' && exampleName === 'Customer loyalty savings') {
    const forLineIdx =
      rawSteps.find((s) => s.expl.includes('Initialize loop counter') && s.changed?.includes('i'))?.l ??
      4
    const bodyLineIdx =
      rawSteps.find((s) => s.expl.includes('Loop body') && s.changed?.includes('totalSavings'))
        ?.l ?? forLineIdx + 1

    return base.map((step, idx) => {
      const ids = focusSegmentsCustomerLoyalty(forLineIdx, bodyLineIdx, rawSteps[idx]!)
      return ids.length ? { ...step, focusSegmentIds: ids } : step
    })
  }

  if (topicId === 'while-loop' && exampleName === 'Double Until 100') {
    return base.map((step, idx) => {
      const ids = focusSegmentsDoubleUntil(rawSteps[idx]!)
      return ids.length ? { ...step, focusSegmentIds: ids } : step
    })
  }

  if (topicId === 'arrays' && exampleName === 'Sum All Elements') {
    const forLn =
      rawSteps.find((s) => /Start loop/i.test(s.expl) && s.changed?.includes('i'))?.l ?? 3
    const sumBodyLn =
      rawSteps.find((s) => s.changed?.includes('sum') && /\bnums\b/i.test(s.expl))?.l ??
      forLn + 1

    return base.map((step, idx) => {
      const ids = focusSegmentsArraysSumAll(rawSteps[idx]!, forLn, sumBodyLn)
      return ids.length ? { ...step, focusSegmentIds: ids } : step
    })
  }

  if (topicId === 'arrays' && exampleName === 'Find Maximum') {
    const forLn = rawSteps.find((s) => /Start loop from i/i.test(s.expl))?.l ?? 3
    const ifLn = forLn + 1
    const maxAssignLn = ifLn + 1

    return base.map((step, idx) => {
      const ids = focusSegmentsArraysFindMax(rawSteps[idx]!, forLn, ifLn, maxAssignLn)
      return ids.length ? { ...step, focusSegmentIds: ids } : step
    })
  }


  return base
}

export function buildCurriculum(raw: RawTopic[]): Topic[] {
  return raw.map((topic) => ({
    id: topic.id,
    title: topic.name,
    description: topic.desc,
    intro: topic.intro
      ? {
          whatItIs: topic.intro.whatItIs,
          whyItMatters: topic.intro.whyItMatters,
          realWorldExamples: [...topic.intro.realWorldExamples],
          ...(topic.intro.syntaxPattern != null && {
            syntaxPattern: topic.intro.syntaxPattern,
          }),
          ...(topic.intro.syntaxParts != null && topic.intro.syntaxParts.length > 0
            ? { syntaxParts: [...topic.intro.syntaxParts] }
            : {}),
          ...(topic.intro.technicalExample != null && {
            technicalExample: topic.intro.technicalExample,
          }),
          ...(topic.intro.everydayExample != null && {
            everydayExample: topic.intro.everydayExample,
          }),
          ...(topic.intro.buildsOn != null && topic.intro.buildsOn.length > 0
            ? { buildsOn: [...topic.intro.buildsOn] }
            : {}),
        }
      : undefined,
    examples: topic.examples.map((ex) => {
      const lines = buildLines(topic.id, ex.name, ex.code)
      const authored = normalizeSteps(topic.id, ex.name, ex.steps, ex.code.length)
      return {
        name: ex.name,
        lines,
        steps: expandToSequentialLines(lines, ex.code, authored),
      }
    }),
  }))
}
