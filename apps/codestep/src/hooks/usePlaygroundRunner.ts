import { useCallback, useEffect, useRef, useState } from 'react'

import { runPlaygroundTask } from '@/domains/walkthroughs/playgroundRunner'
import type { PlaygroundResult, PlaygroundTask } from '@/types/playground'

export type PlaygroundRunStatus = 'idle' | 'running' | 'done'

type State = {
  status: PlaygroundRunStatus
  result: PlaygroundResult | null
}

export function usePlaygroundRunner(task: PlaygroundTask | null) {
  const [{ status, result }, setState] = useState<State>({
    status: 'idle',
    result: null,
  })
  const taskIdRef = useRef<string | null>(null)
  const latestRunSeqRef = useRef(0)
  const cacheRef = useRef<{
    taskId: string
    code: string
    result: PlaygroundResult
  } | null>(null)

  useEffect(() => {
    taskIdRef.current = task?.id ?? null
    cacheRef.current = null
  }, [task?.id])

  const run = useCallback(
    async (code: string): Promise<PlaygroundResult | null> => {
      if (!task) return null

      const cached = cacheRef.current
      if (cached && cached.taskId === task.id && cached.code === code) {
        setState({ status: 'done', result: cached.result })
        return cached.result
      }

      const runFor = task.id
      const runSeq = latestRunSeqRef.current + 1
      latestRunSeqRef.current = runSeq
      setState({ status: 'running', result: null })
      const res = await runPlaygroundTask(task, code)
      setState((prev) => {
        if (taskIdRef.current !== runFor) return prev
        if (latestRunSeqRef.current !== runSeq) return prev
        cacheRef.current = { taskId: runFor, code, result: res }
        return { status: 'done', result: res }
      })
      if (taskIdRef.current !== runFor || latestRunSeqRef.current !== runSeq) return null
      return res
    },
    [task],
  )

  const resetOutcome = useCallback(() => {
    setState({ status: 'idle', result: null })
  }, [])

  return { status, result, run, resetOutcome }
}
