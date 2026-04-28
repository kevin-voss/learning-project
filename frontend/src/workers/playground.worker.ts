/// <reference lib="webworker" />

import { bindingMatches, deepEqual, normalizeLogLine } from '@/engine/assertions'
import { buildPlaygroundSteps } from '@/engine/playgroundSteps'
import type {
  PlaygroundResult,
  PlaygroundRunMessage,
  PlaygroundTask,
  TestCaseResult,
} from '@/types/playground'

const DEV = import.meta.env.DEV

function captureConsole(): { log: (...args: unknown[]) => void; lines: string[] } {
  const lines: string[] = []
  const log = (...args: unknown[]) => {
    lines.push(
      args
        .map((x) => {
          if (typeof x === 'string') return x
          try {
            return JSON.stringify(x)
          } catch {
            return String(x)
          }
        })
        .join(' '),
    )
  }
  return { log, lines }
}

function finalize(
  task: PlaygroundTask,
  userCode: string,
  res: Omit<PlaygroundResult, 'steps'> & { received?: Record<string, unknown> },
): PlaygroundResult {
  const { received, ...rest } = res
  return {
    ...rest,
    steps: buildPlaygroundSteps({
      task,
      code: userCode,
      logs: rest.logs,
      ok: rest.ok,
      error: rest.error,
      cases: rest.cases,
      ...(received !== undefined ? { received } : {}),
    }),
  }
}

function errorInfo(err: unknown): { message: string; stack?: string } {
  if (err instanceof Error) {
    return {
      message: err.message || 'Error',
      stack: DEV ? err.stack : undefined,
    }
  }
  return { message: String(err) }
}

function runBindings(task: PlaygroundTask & { mode: 'bindings' }, userCode: string): PlaygroundResult {
  const { log, lines: logs } = captureConsole()
  const names = task.bindings
  const prelude = names.map((n) => `var ${n};`).join('\n')
  const retKeys = names.join(', ')
  const body = `"use strict";\n${prelude}\n${userCode}\nreturn { ${retKeys} };`
  let received: Record<string, unknown>
  try {
    const fn = new Function('console', body) as (c: { log: typeof log }) => Record<string, unknown>
    received = fn({ log })
  } catch (e) {
    const err = errorInfo(e)
    return finalize(task, userCode, {
      ok: false,
      durationMs: 0,
      logs,
      cases: [],
      error: err,
    })
  }

  const cases: TestCaseResult[] = []
  for (const exp of task.expected) {
    const got = received[exp.name]
    const pass = bindingMatches(got, exp)
    cases.push({
      id: `binding:${exp.name}`,
      label: `Variable \`${exp.name}\``,
      pass,
      expected: exp.value,
      received: got,
      detail: pass ? undefined : 'Value does not match expected (see Expected vs Received).',
    })
  }

  return finalize(task, userCode, {
    ok: cases.every((c) => c.pass),
    durationMs: 0,
    logs,
    cases,
    received,
  })
}

function runConsole(task: PlaygroundTask & { mode: 'console' }, userCode: string): PlaygroundResult {
  const { log, lines: logs } = captureConsole()
  const body = `"use strict";\n${userCode}`
  try {
    const fn = new Function('console', body) as (c: { log: typeof log }) => void
    fn({ log })
  } catch (e) {
    const err = errorInfo(e)
    return finalize(task, userCode, {
      ok: false,
      durationMs: 0,
      logs,
      cases: [],
      error: err,
    })
  }

  const norm = task.expected.normalizeWhitespace ?? false
  const expectedLines = task.expected.lines.map((l) => normalizeLogLine(l, norm))
  const gotLines = logs.map((l) => normalizeLogLine(l, norm))
  const pass =
    expectedLines.length === gotLines.length &&
    expectedLines.every((line, i) => line === gotLines[i])

  return finalize(task, userCode, {
    ok: pass,
    durationMs: 0,
    logs,
    cases: [
      {
        id: 'console:all',
        label: 'Console output',
        pass,
        expected: expectedLines,
        received: gotLines,
        detail: pass ? undefined : 'Log lines must match expected order and content.',
      },
    ],
  })
}

function runFunctionTask(
  task: PlaygroundTask & { mode: 'function' },
  userCode: string,
): PlaygroundResult {
  const { log, lines: logs } = captureConsole()
  const name = task.functionName
  if (!/^[$A-Za-z_][$0-9A-Za-z_]*$/.test(name)) {
    return finalize(task, userCode, {
      ok: false,
      durationMs: 0,
      logs,
      cases: [],
      error: { message: 'Invalid function name in task configuration.' },
    })
  }
  const body = `"use strict";\n${userCode}\nreturn typeof ${name} === 'function' ? ${name} : null;`
  let callable: (...args: unknown[]) => unknown
  try {
    const factory = new Function('console', body) as (c: { log: typeof log }) => unknown
    const ref = factory({ log })
    if (typeof ref !== 'function') {
      return finalize(task, userCode, {
        ok: false,
        durationMs: 0,
        logs,
        cases: [
          {
            id: 'function:missing',
            label: `Function \`${name}\``,
            pass: false,
            detail: `Expected a function declaration or assignment named \`${name}\` in your code.`,
          },
        ],
      })
    }
    callable = ref as (...args: unknown[]) => unknown
  } catch (e) {
    const err = errorInfo(e)
    return finalize(task, userCode, {
      ok: false,
      durationMs: 0,
      logs,
      cases: [],
      error: err,
    })
  }
  const cases: TestCaseResult[] = []
  for (let i = 0; i < task.tests.length; i++) {
    const t = task.tests[i]!
    const label = t.name ?? `Test ${i + 1}`
    let received: unknown
    try {
      received = callable(...t.args)
    } catch (e) {
      cases.push({
        id: `fn:${i}`,
        label,
        pass: false,
        expected: t.expected,
        received: undefined,
        detail: errorInfo(e).message,
      })
      continue
    }
    const pass = deepEqual(received, t.expected)
    cases.push({
      id: `fn:${i}`,
      label,
      pass,
      expected: t.expected,
      received,
      detail: pass ? undefined : 'Return value does not match expected.',
    })
  }

  return finalize(task, userCode, {
    ok: cases.every((c) => c.pass),
    durationMs: 0,
    logs,
    cases,
  })
}

function runTask(task: PlaygroundTask, code: string): PlaygroundResult {
  switch (task.mode) {
    case 'bindings':
      return runBindings(task, code)
    case 'console':
      return runConsole(task, code)
    case 'function':
      return runFunctionTask(task, code)
    default:
      return finalize(task, code, {
        ok: false,
        durationMs: 0,
        logs: [],
        cases: [],
        error: { message: 'Unknown task mode' },
      })
  }
}

self.onmessage = (ev: MessageEvent<PlaygroundRunMessage>) => {
  const msg = ev.data
  if (!msg || msg.type !== 'run') return
  try {
    const result = runTask(msg.task, msg.code)
    postMessage({ type: 'done', result } satisfies { type: 'done'; result: PlaygroundResult })
  } catch (e) {
    const err = errorInfo(e)
    postMessage({
      type: 'done',
      result: finalize(msg.task, msg.code, {
        ok: false,
        durationMs: 0,
        logs: [],
        cases: [],
        error: err,
      }),
    })
  }
}
