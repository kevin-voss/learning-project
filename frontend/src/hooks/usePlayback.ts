import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  canStepBack,
  canStepForward,
  progressFraction,
} from '@/domains/walkthroughs/playback'

export type PlaybackActions = {
  play: () => void
  pause: () => void
  togglePlay: () => void
  stepForward: () => void
  stepBack: () => void
  reset: () => void
  setSpeedMs: (ms: number) => void
}

export type PlaybackState = {
  stepIndex: number
  isPlaying: boolean
  speedMs: number
  progress: number
  atEnd: boolean
  atStart: boolean
}

export type PlaybackOptions = {
  /** Auto-step delay slider (milliseconds). Persisted separately in Learn UI. */
  initialSpeedMs?: number
}

/**
 * Mirrors prototype timer: each tick advances one step; first advance after play
 * has no delay (from step -1).
 */
export function usePlayback(
  stepCount: number,
  opts?: PlaybackOptions,
): PlaybackState & PlaybackActions {
  const [stepIndex, setStepIndex] = useState(-1)
  const [isPlaying, setPlaying] = useState(false)
  const [speedMs, setSpeedMs] = useState(() => opts?.initialSpeedMs ?? 1200)

  const pause = useCallback(() => setPlaying(false), [])
  const reset = useCallback(() => {
    setPlaying(false)
    setStepIndex(-1)
  }, [])

  const stepForward = useCallback(() => {
    setStepIndex((i) => {
      if (!canStepForward(i, stepCount)) return i
      return i + 1
    })
  }, [stepCount])

  const stepBack = useCallback(() => {
    setStepIndex((i) => {
      if (!canStepBack(i)) return i
      return i - 1
    })
  }, [])

  const play = useCallback(() => {
    setPlaying(true)
  }, [])

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p)
  }, [])

  useEffect(() => {
    if (!isPlaying || stepCount <= 0) return

    // No more steps while playing — stop (e.g. reached end while auto-advancing).
    if (!canStepForward(stepIndex, stepCount)) {
      queueMicrotask(() => {
        setPlaying(false)
      })
      return
    }

    const delay = stepIndex < 0 ? 0 : speedMs
    const id = window.setTimeout(() => {
      setStepIndex((i) => {
        if (!canStepForward(i, stepCount)) return i
        return i + 1
      })
    }, delay)

    return () => clearTimeout(id)
  }, [isPlaying, stepIndex, speedMs, stepCount])

  const progress = useMemo(
    () => progressFraction(stepIndex, stepCount),
    [stepIndex, stepCount],
  )

  const atEnd = stepCount > 0 && stepIndex >= stepCount - 1
  const atStart = stepIndex < 0

  return {
    stepIndex,
    isPlaying,
    speedMs,
    progress,
    atEnd,
    atStart,
    play,
    pause,
    togglePlay,
    stepForward,
    stepBack,
    reset,
    setSpeedMs,
  }
}
