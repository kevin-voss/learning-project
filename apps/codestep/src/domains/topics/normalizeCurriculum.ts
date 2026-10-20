import { omitGuidedFillerLinesForDeadBranches } from '@/domains/walkthroughs/guidedIfChain'
import type { CodeLine, ExecutionStep, Topic } from '@/types/curriculum'

import type { RawStep, RawTopic } from './rawTopicTypes'
import {
  linesArraysFindMaximum,
  linesArraysSumAllElements,
  linesForCountdown,
  linesForCountOneToFive,
  linesForCustomerIndexedFor,
  linesForSumOneToFive,
  linesFromStrings,
  linesWhileDoubleUntil100,
} from './guidedExampleLineBuilders'

export type { RawExample, RawStep, RawTopic, RawTopicIntro } from './rawTopicTypes'

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
 * Keeps authored **execution order** (required for loops: header substeps → body → repeat).
 * Lines that never appear in authored steps get a single filler step, inserted immediately
 * before the first executed line after that gap (e.g. blank lines between statements).
 */
function expandToSequentialLines(
  lines: CodeLine[],
  code: string[],
  authored: ExecutionStep[],
): ExecutionStep[] {
  const n = lines.length
  if (n === 0) return []
  const clamp = (l: number) => clampLineIndex(l, n)

  const normalized = authored.map((s) => ({
    ...s,
    lineIndex: clamp(s.lineIndex),
  }))

  const visited = new Set<number>()
  for (const s of normalized) visited.add(s.lineIndex)

  /** Do not auto-insert filler steps on dead if / else-if arms */
  const omitFillerForLines = omitGuidedFillerLinesForDeadBranches(code, visited)

  const fillerExpl = (lineIdx: number): string => {
    const raw = code[lineIdx] ?? ''
    const t = raw.trim()
    if (t.length === 0) return `Line ${lineIdx + 1}: blank line (structure only).`
    const preview = t.length > 88 ? `${t.slice(0, 85)}…` : t
    return `Line ${lineIdx + 1}: ${preview}`
  }

  /** Lines that never occur in authored steps — ordered ascending */
  const missingSorted: number[] = []
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) missingSorted.push(i)
  }

  const out: ExecutionStep[] = []
  let prev: ExecutionStep | undefined
  const insertedMissing = new Set<number>()

  function fillerSnap(): Pick<ExecutionStep, 'variables' | 'consoleLines'> {
    if (!prev) return { variables: {}, consoleLines: [] }
    return {
      variables: { ...prev.variables },
      consoleLines: [...prev.consoleLines],
    }
  }

  /** Emit filler steps for source gaps strictly before `nextLineIndex`. */
  function emitFillersBefore(nextLineIndex: number): void {
    for (const m of missingSorted) {
      if (insertedMissing.has(m) || m >= nextLineIndex) continue
      if (omitFillerForLines.has(m)) continue
      const snap = fillerSnap()
      const f: ExecutionStep = {
        lineIndex: m,
        ...snap,
        explanation: fillerExpl(m),
      }
      out.push(f)
      insertedMissing.add(m)
      prev = f
    }
  }

  for (const s of normalized) {
    emitFillersBefore(s.lineIndex)
    out.push(s)
    prev = s
  }

  emitFillersBefore(n)

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
