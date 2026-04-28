import type { ExecutionStep, VariableSnapshot, VariableValue } from '@/types/curriculum'
import type {
  PlaygroundTask,
  TestCaseResult,
} from '@/types/playground'

function splitLines(code: string): string[] {
  return code.split(/\r\n|\r|\n/)
}

function isSteppableLine(text: string): boolean {
  const t = text.trim()
  if (!t) return false
  if (t.startsWith('//')) return false
  if (t.startsWith('/*') || t.startsWith('*') || t.startsWith('*/')) return false
  if (t === '{' || t === '}' || t === '};') return false
  return true
}

function steppableLineIndices(lines: readonly string[]): number[] {
  const out: number[] = []
  for (let i = 0; i < lines.length; i++) {
    if (isSteppableLine(lines[i]!)) out.push(i)
  }
  return out
}

/** 0-based line index of each console.log(...) site in source order */
export function enumerateConsoleLogLineIndices(lines: readonly string[]): number[] {
  const sites: number[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!
    const matches = line.match(/console\.log\s*\(/g)
    if (!matches) continue
    matches.forEach(() => {
      sites.push(i)
    })
  }
  return sites
}

function lastMeaningfulLineIndex(lines: readonly string[]): number {
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i]!.trim().length > 0) return i
  }
  return 0
}

function lineForConsoleStep(
  logIndex: number,
  sites: readonly number[],
  fallback: number,
): number {
  if (sites.length === 0) return fallback
  return sites[Math.min(logIndex, sites.length - 1)]!
}

/** Matches {@link codeStringToCodeLines} segment ids for replay highlighting */
function segmentIdForLine(lineIndex: number): string {
  return `pg-${lineIndex}-0`
}

function toVariableValue(v: unknown): VariableValue {
  if (v === undefined) return undefined
  if (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean'
  ) {
    return v
  }
  if (v === null) return 'null'
  if (Array.isArray(v)) {
    return v.map((item) => toVariableValue(item))
  }
  if (typeof v === 'object') {
    return nestedObjectSnapshot(v as Record<string, unknown>)
  }
  return String(v)
}

function nestedObjectSnapshot(o: Record<string, unknown>): Record<string, VariableValue> {
  const out: Record<string, VariableValue> = {}
  for (const [k, val] of Object.entries(o)) {
    out[k] = toVariableValue(val)
  }
  return out
}

function bindingsSnapshot(received: Record<string, unknown>): VariableSnapshot {
  const snap: VariableSnapshot = {}
  for (const [k, v] of Object.entries(received)) {
    snap[k] = toVariableValue(v)
  }
  return snap
}

function findFunctionDeclarationLine(lines: readonly string[], name: string): number | null {
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i]!
    if (
      t.includes(`function ${name}`) ||
      t.includes(`${name} = function`) ||
      t.includes(`${name} =`) ||
      (t.includes(name) && t.includes('function'))
    ) {
      return i
    }
  }
  return null
}

type BuildOpts = {
  task: PlaygroundTask
  code: string
  logs: string[]
  ok: boolean
  error?: { message: string }
  cases: TestCaseResult[]
  /** bindings mode — values read from learner code */
  received?: Record<string, unknown>
}

/**
 * Replay steps aligned with guided examples: start → console milestones → outcomes.
 * Uses static line cues (console.log sites, function declarations); not full interpreter stepping.
 */
export function buildPlaygroundSteps(opts: BuildOpts): ExecutionStep[] {
  const lines = splitLines(opts.code)
  const lastLine = lastMeaningfulLineIndex(lines)
  const sites = enumerateConsoleLogLineIndices(lines)
  const steppable = steppableLineIndices(lines)
  const walkedLines = steppable.length > 0 ? steppable : [Math.max(0, lastLine)]

  const { logs, task, error, ok, cases, received } = opts

  if (error) {
    const st: ExecutionStep = {
      lineIndex: 0,
      focusSegmentIds: [segmentIdForLine(0)],
      explanation: error.message,
      variables: {},
      consoleLines: [...logs],
    }
    if (logs.length > 0) st.consoleStep = true
    return [st]
  }

  const steps: ExecutionStep[] = []
  const startLine = walkedLines[0] ?? 0

  steps.push({
    lineIndex: startLine,
    focusSegmentIds: [segmentIdForLine(startLine)],
    explanation:
      'Run started. Your code executes in an isolated worker (not on this page). Use the controls below to step through what happened.',
    variables: {},
    consoleLines: [],
  })

  let siteCursor = 0
  const consoleLines: string[] = []
  for (const lineIdx of walkedLines) {
    const lineNo = lineIdx + 1
    let pushed = 0
    while (siteCursor < sites.length && lineForConsoleStep(siteCursor, sites, lastLine) === lineIdx) {
      if (logs[siteCursor] !== undefined) {
        consoleLines.push(logs[siteCursor]!)
        pushed++
      }
      siteCursor++
    }

    const explanation =
      pushed > 0
        ? `Executed line ${lineNo}. Console emitted ${pushed} line${pushed === 1 ? '' : 's'}.`
        : `Executed line ${lineNo}.`

    steps.push({
      lineIndex: lineIdx,
      focusSegmentIds: [segmentIdForLine(lineIdx)],
      explanation,
      variables: {},
      consoleLines: [...consoleLines],
      consoleStep: pushed > 0,
    })
  }

  if (logs.length > consoleLines.length) {
    const remaining = logs.slice(consoleLines.length)
    steps.push({
      lineIndex: lastLine,
      focusSegmentIds: [segmentIdForLine(lastLine)],
      explanation: `Captured ${remaining.length} additional console line${remaining.length === 1 ? '' : 's'} after execution completed.`,
      variables: {},
      consoleLines: [...logs],
      consoleStep: true,
    })
  }

  switch (task.mode) {
    case 'bindings': {
      if (received && Object.keys(received).length > 0) {
        const names = task.bindings.join(', ')
        steps.push({
          lineIndex: lastLine,
          focusSegmentIds: [segmentIdForLine(lastLine)],
          explanation: `Read values for: ${names}. Compare with the expected checks on the right.`,
          variables: bindingsSnapshot(received),
          consoleLines: logs.length > 0 ? [...logs] : [...consoleLines],
          changed: Object.keys(received),
        })
      } else if (logs.length === 0) {
        steps.push({
          lineIndex: lastLine,
          focusSegmentIds: [segmentIdForLine(lastLine)],
          explanation: ok
            ? 'No console output; variable checks use values assigned in your script.'
            : 'Execution finished.',
          variables: {},
          consoleLines: [],
        })
      }
      break
    }
    case 'console': {
      steps.push({
        lineIndex: lastLine,
        focusSegmentIds: [segmentIdForLine(lastLine)],
        explanation: ok
          ? 'Actual console output matches the expected lines (order and content).'
          : 'Console lines did not match the expected sequence. Compare Actual vs Expected in the checklist.',
        variables: {},
        consoleLines: logs.length > 0 ? [...logs] : [...consoleLines],
      })
      break
    }
    case 'function': {
      const fnLine =
        findFunctionDeclarationLine(lines, task.functionName) ?? lastLine
      for (let i = 0; i < cases.length; i++) {
        const c = cases[i]!
        const test = task.tests[i]
        const label = c.label ?? test?.name ?? `Test ${i + 1}`
        const snap: VariableSnapshot = {}
        if (c.received !== undefined) {
          snap.returned = toVariableValue(c.received)
        } else if (test?.expected !== undefined) {
          snap.returned = toVariableValue(test.expected)
        }
        steps.push({
          lineIndex: fnLine,
          focusSegmentIds: [segmentIdForLine(fnLine)],
          explanation: c.pass
            ? `"${label}": return value matched the expected result.`
            : `"${label}": ${c.detail ?? 'Return value did not match.'}`,
          variables: Object.keys(snap).length ? snap : {},
          consoleLines: logs.length > 0 ? [...logs] : [...consoleLines],
          changed: Object.keys(snap).length ? ['returned'] : undefined,
        })
      }
      break
    }
    default:
      break
  }

  const finalMsg = ok
    ? 'Run complete. Review tests and variable values on the right.'
    : 'Run complete with failing checks. Use the right panel to compare expected and received values.'

  steps.push({
    lineIndex: lastLine,
    focusSegmentIds: [segmentIdForLine(lastLine)],
    explanation: finalMsg,
    variables: {},
    consoleLines: logs.length > 0 ? [...logs] : [...consoleLines],
  })

  return steps.length > 0
    ? steps
    : [
        {
          lineIndex: 0,
          focusSegmentIds: [segmentIdForLine(0)],
          explanation: 'Done.',
          variables: {},
          consoleLines: [...logs],
        },
      ]
}
