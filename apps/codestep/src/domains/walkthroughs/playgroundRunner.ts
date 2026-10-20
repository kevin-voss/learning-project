import type { PlaygroundResult, PlaygroundTask } from '@/types/playground'

const DEFAULT_TIMEOUT_MS = 1500

type WorkerDoneMsg = {
  type: 'done'
  result: PlaygroundResult
}

/**
 * Runs learner code in a dedicated worker; terminates on timeout.
 * User code never executes on the main thread.
 */
export function runPlaygroundTask(task: PlaygroundTask, code: string): Promise<PlaygroundResult> {
  const cap = task.timeoutMs ?? DEFAULT_TIMEOUT_MS

  return new Promise((resolve) => {
    const worker = new Worker(new URL('../../workers/playground.worker.ts', import.meta.url), {
      type: 'module',
    })
    const started = performance.now()
    let settled = false

    const finish = (result: PlaygroundResult) => {
      if (settled) return
      settled = true
      window.clearTimeout(timer)
      worker.terminate()
      resolve({
        ...result,
        durationMs: result.durationMs > 0 ? result.durationMs : performance.now() - started,
      })
    }

    const timer = window.setTimeout(() => {
      finish({
        ok: false,
        timedOut: true,
        durationMs: cap,
        logs: [],
        cases: [],
        steps: [
          {
            lineIndex: 0,
            explanation: `Run stopped: exceeded the ${cap}ms sandbox limit — your code may have an infinite loop or heavy work.`,
            variables: {},
            consoleLines: [],
          },
        ],
        error: {
          message: `This run exceeded the ${cap}ms limit—your code may have an infinite loop or heavy work. The sandbox was stopped.`,
        },
      })
    }, cap)

    worker.onmessage = (ev: MessageEvent<WorkerDoneMsg>) => {
      const data = ev.data
      if (!data || data.type !== 'done') {
        finish({
          ok: false,
          durationMs: performance.now() - started,
          logs: [],
          cases: [],
          steps: [
            {
              lineIndex: 0,
              explanation: 'The runner returned an unexpected message.',
              variables: {},
              consoleLines: [],
            },
          ],
          error: { message: 'Unexpected response from runner.' },
        })
        return
      }
      const r = data.result
      finish({
        ok: r.ok,
        logs: r.logs,
        cases: r.cases,
        error: r.error,
        timedOut: r.timedOut,
        durationMs: r.durationMs,
        steps: r.steps,
      })
    }

    worker.onerror = (ev) => {
      ev.preventDefault()
      finish({
        ok: false,
        durationMs: performance.now() - started,
        logs: [],
        cases: [],
        steps: [
          {
            lineIndex: 0,
            explanation: ev.message ?? 'Worker failed to load or crashed.',
            variables: {},
            consoleLines: [],
          },
        ],
        error: {
          message: ev.message ?? 'Worker failed to load or crashed.',
        },
      })
    }

    worker.postMessage({ type: 'run', task, code })
  })
}
