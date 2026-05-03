import type { VariableSnapshot } from '@/types/curriculum'

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
