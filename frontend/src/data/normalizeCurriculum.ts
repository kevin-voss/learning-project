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

/** Segmented first line for "Count 1 to 5" (segment focus demo). */
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
  const tail = rest.map((text, i) => ({
    segments: [{ id: `line-${i + 1}-all`, text }],
  }))
  return [head, ...tail]
}

/**
 * Indexed `for` with real-world invoicing totals — segmented header mirrors init / condition /
 * update segments for pedagogical highlighting.
 */
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

  const after = code.slice(idx + 1).map((text, i) => ({
    segments: [{ id: `line-after-${idx + 1 + i}-all`, text }],
  }))

  return [...before, head, ...after]
}

function buildLines(topicId: string, exampleName: string, code: string[]): CodeLine[] {
  if (topicId === 'loops' && exampleName === 'Count 1 to 5') {
    return linesForCountOneToFive(code)
  }
  if (topicId === 'loops' && exampleName === 'Customer loyalty savings') {
    return linesForCustomerIndexedFor(code)
  }
  return linesFromStrings(code)
}

function normalizeRawStep(step: RawStep): ExecutionStep {
  return {
    lineIndex: step.l,
    variables: step.vars,
    consoleLines: step.out,
    explanation: step.expl,
    changed: step.changed,
    consoleStep: step.console === true,
    arrIdx: step.arrIdx,
  }
}

function focusSegmentsCount15(step: RawStep): string[] {
  if (step.l !== 0) return []
  if (step.changed?.includes('i') && step.expl.startsWith('Initialize'))
    return ['for-init']
  if (step.expl.startsWith('Check condition')) return ['for-cond']
  if (
    step.changed?.includes('i') &&
    (step.expl.includes('increments') || step.expl.includes('i++'))
  )
    return ['for-update']
  return []
}

/** Segmented indexed `for` line — same IDs as Count 1 to 5, different source line index. */
function focusSegmentsIndexedForLine(segmentedLineIdx: number, step: RawStep): string[] {
  if (step.l !== segmentedLineIdx) return []
  if (step.changed?.includes('i') && step.expl.startsWith('Initialize'))
    return ['for-init']
  if (step.expl.startsWith('Check condition')) return ['for-cond']
  if (
    step.changed?.includes('i') &&
    (step.expl.includes('increments') || step.expl.includes('i++'))
  )
    return ['for-update']
  return []
}

function normalizeSteps(
  topicId: string,
  exampleName: string,
  rawSteps: RawStep[],
): ExecutionStep[] {
  const base = rawSteps.map(normalizeRawStep)

  if (topicId === 'loops' && exampleName === 'Count 1 to 5') {
    return base.map((step, idx) => {
      const ids = focusSegmentsCount15(rawSteps[idx]!)
      if (ids.length === 0) return step
      return { ...step, focusSegmentIds: ids }
    })
  }

  if (topicId === 'loops' && exampleName === 'Customer loyalty savings') {
    const segmentedLineIdx =
      rawSteps.find(
        (s) =>
          typeof s.vars.i === 'number' &&
          s.expl.startsWith('Initialize loop counter') &&
          s.changed?.includes('i'),
      )?.l ?? 2

    return base.map((step, idx) => {
      const ids = focusSegmentsIndexedForLine(segmentedLineIdx, rawSteps[idx]!)
      if (ids.length === 0) return step
      return { ...step, focusSegmentIds: ids }
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
    examples: topic.examples.map((ex) => ({
      name: ex.name,
      lines: buildLines(topic.id, ex.name, ex.code),
      steps: normalizeSteps(topic.id, ex.name, ex.steps),
    })),
  }))
}
