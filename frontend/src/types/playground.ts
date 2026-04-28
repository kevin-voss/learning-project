import type { ExecutionStep } from '@/types/curriculum'

/** How learner code is evaluated */
export type TaskMode = 'bindings' | 'console' | 'function'

export type BindingExpectation = {
  name: string
  value: unknown
  type?: 'string' | 'number' | 'boolean'
  /** Absolute tolerance when comparing two numbers */
  tolerance?: number
}

export type ConsoleExpectation = {
  lines: string[]
  /** Trim each line and collapse internal whitespace */
  normalizeWhitespace?: boolean
}

export type FunctionTestCase = {
  args: unknown[]
  expected: unknown
  name?: string
}

export type TestCaseResult = {
  id: string
  pass: boolean
  label?: string
  expected?: unknown
  received?: unknown
  detail?: string
}

export type PlaygroundErrorInfo = {
  message: string
  stack?: string
}

export type PlaygroundResult = {
  ok: boolean
  durationMs: number
  logs: string[]
  cases: TestCaseResult[]
  error?: PlaygroundErrorInfo
  timedOut?: boolean
  /** Step-through replay (same shape as guided examples) */
  steps?: ExecutionStep[]
}

type PlaygroundTaskBase = {
  id: string
  topicId: string
  title: string
  description: string
  /** Problem detail shown under title (e.g. constraints) */
  problemDetail?: string
  starterCode: string
  hints: string[]
  timeoutMs?: number
}

export type BindingsPlaygroundTask = PlaygroundTaskBase & {
  mode: 'bindings'
  /** Variables declared before user code; learner assigns values */
  bindings: string[]
  expected: BindingExpectation[]
}

export type ConsolePlaygroundTask = PlaygroundTaskBase & {
  mode: 'console'
  expected: ConsoleExpectation
}

export type FunctionPlaygroundTask = PlaygroundTaskBase & {
  mode: 'function'
  functionName: string
  tests: FunctionTestCase[]
}

export type PlaygroundTask =
  | BindingsPlaygroundTask
  | ConsolePlaygroundTask
  | FunctionPlaygroundTask

export type PlaygroundRunMessage = {
  type: 'run'
  task: PlaygroundTask
  code: string
}
