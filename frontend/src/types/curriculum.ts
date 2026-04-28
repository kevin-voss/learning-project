/** Plain object snapshots (supports nested guided examples) */
export type VariableObjectMap = { readonly [key: string]: VariableValue }

/** Snapshot values shown in the variable inspector */
export type VariableValue =
  | string
  | number
  | boolean
  | VariableValue[]
  | VariableObjectMap
  /** Sentinel used when curriculum displays JavaScript `undefined` */
  | undefined

export type VariableSnapshot = Record<string, VariableValue>

export type CodeSegment = {
  id: string
  /** Raw source text for this fragment (syntax tint applied client-side) */
  text: string
}

export type CodeLine = {
  segments: CodeSegment[]
}

export type ExecutionStep = {
  /** 0-based index into GuidedExample.lines */
  lineIndex: number
  /** Stronger highlight on matching segments when present */
  focusSegmentIds?: string[]
  variables: VariableSnapshot
  /** Cumulative simulated console.log lines after this conceptual step */
  consoleLines: string[]
  explanation: string
  changed?: string[]
  /** Step corresponds to console.log emission (sound + emphasis in prototype) */
  consoleStep?: boolean
  /** Highlights array index for stepped array visualization */
  arrIdx?: number
}

export type GuidedExample = {
  name: string
  lines: CodeLine[]
  steps: ExecutionStep[]
}

/** Section shown at the top of Learn for a topic */
export type TopicIntro = {
  whatItIs: string
  whyItMatters: string
  realWorldExamples: string[]
  /** Representative one-line pattern (shown monospaced) */
  syntaxPattern?: string
  /** Explain each token / clause—order follows reading syntaxPattern left to right */
  syntaxParts?: string[]
  /** Tiny code-centric illustration */
  technicalExample?: string
  /** Short real-world analogue in plain language */
  everydayExample?: string
  /**
   * Earlier topics learners should be comfortable with — shown as jump links.
   * Keep `note` in plain language; mention only ideas from those topics.
   */
  buildsOn?: { topicId: string; note: string }[]
}

export type Topic = {
  id: string
  /** Display title */
  title: string
  description: string
  /** What / why / real-world bullets (Phase 04) */
  intro?: TopicIntro
  examples: GuidedExample[]
}
