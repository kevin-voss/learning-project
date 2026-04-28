import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { ConsolePanel } from '@/components/learn/ConsolePanel'
import { ExplanationPanel } from '@/components/learn/ExplanationPanel'
import learnStyles from '@/components/learn/LearnPanel.module.css'
import { PlaybackControls } from '@/components/learn/PlaybackControls'
import { Toast } from '@/components/learn/Toast'
import { HintPanel } from '@/components/practice/HintPanel'
import { PlaygroundCodeEditor } from '@/components/practice/PlaygroundCodeEditor'
import { PracticeTaskBrief } from '@/components/practice/PracticeTaskBrief'
import { TestResults } from '@/components/practice/TestResults'
import { VariableInspector } from '@/components/learn/VariableInspector'
import { canStepBack, canStepForward } from '@/engine/playback'
import {
  loadSoundEnabled,
  saveSoundEnabled,
} from '@/hooks/codestepSettings'
import { usePlaygroundRunner } from '@/hooks/usePlaygroundRunner'
import { usePlayback } from '@/hooks/usePlayback'
import { useSound } from '@/hooks/useSound'
import { PLAYBACK_SPEED_MS } from '@/lib/playbackSpeed'
import type { PlaygroundTask } from '@/types/playground'

import styles from '@/components/practice/PlaygroundView.module.css'

type Props = {
  task: PlaygroundTask
  /** Label `for` / `id` on the editor (avoid duplicates if multiple instances could mount) */
  editorId?: string
}

export function PracticeExercise({ task, editorId = 'playground-code' }: Props) {
  const [code, setCode] = useState(task.starterCode)
  /** Source snapshot aligned with `result.steps` line highlights */
  const [replayCode, setReplayCode] = useState<string | null>(null)

  const { status, result, run, resetOutcome } = usePlaygroundRunner(task)
  const snapshotForRunRef = useRef('')
  const prevIdxRef = useRef(-1)
  const sound = useSound(loadSoundEnabled())
  const soundRef = useRef(sound)

  useEffect(() => {
    soundRef.current = sound
  }, [sound])

  const [toast, setToast] = useState<{
    msg: string
    variant: 'info' | 'success'
    show: boolean
  }>({ msg: '', variant: 'info', show: false })

  const steps = result?.steps ?? []
  const cases = result?.cases ?? []
  const stepCount = steps.length

  const pb = usePlayback(stepCount, {
    initialSpeedMs: PLAYBACK_SPEED_MS.medium,
  })

  const pbRef = useRef(pb)

  const { setSpeedMs, reset: resetPb } = pb

  useEffect(() => {
    setSpeedMs(PLAYBACK_SPEED_MS.medium)
  }, [task.id, setSpeedMs])

  const afterSuccessfulRun = useCallback(() => {
    setReplayCode(snapshotForRunRef.current)
    resetPb()
    prevIdxRef.current = -1
  }, [resetPb])

  const currentStep =
    pb.stepIndex >= 0 && pb.stepIndex < stepCount ? steps[pb.stepIndex]! : null

  const running = status === 'running'

  /** Replay steps match the current editor buffer (same as learn once stepping). */
  const playbackReady = Boolean(
    !running &&
      status === 'done' &&
      result &&
      stepCount > 0 &&
      replayCode !== null &&
      replayCode === code,
  )

  const focusedLineIndex =
    playbackReady && pb.stepIndex >= 0 ? (currentStep?.lineIndex ?? null) : null
  const focusedLineNumber = focusedLineIndex === null ? null : focusedLineIndex + 1
  const codeDirtySinceRun =
    replayCode !== null && replayCode !== code && status === 'done' && !running
  const passingCount = cases.reduce((n, c) => (c.pass ? n + 1 : n), 0)

  const stepLabel =
    !playbackReady || stepCount <= 0
      ? '— / —'
      : pb.stepIndex < 0
        ? `— / ${stepCount}`
        : `${pb.stepIndex + 1} / ${stepCount}`

  const progressPercent =
    stepCount <= 0 ? 0 : pb.stepIndex < 0 ? 0 : ((pb.stepIndex + 1) / stepCount) * 100

  const canForward =
    running ? false : playbackReady ? canStepForward(pb.stepIndex, stepCount) : true

  const canBack = playbackReady && canStepBack(pb.stepIndex)

  const consoleLinesShown =
    playbackReady && pb.stepIndex >= 0
      ? (currentStep?.consoleLines ?? [])
      : (result?.logs ?? [])

  const varsShown =
    playbackReady && pb.stepIndex >= 0 ? (currentStep?.variables ?? null) : null

  const explanationText = running
    ? 'Running your code in an isolated worker…'
    : codeDirtySinceRun
      ? 'Your code changed after the last run. Press Play or Step Forward to run the latest version and refresh line-by-line guidance.'
    : !playbackReady
      ? 'Press Play or Step Forward to execute your code; highlights move line by line in the editor below. Change your code anytime—when it no longer matches the last run, Play or Step forward will re-execute with your latest source.'
      : pb.stepIndex < 0 && !pb.isPlaying
        ? `This run has ${stepCount} steps. Press Play or Step Forward to start stepping. Use Reset to jump back before the first step.`
        : (currentStep?.explanation ??
          'Press Play or Step Forward to continue.')

  const stepHint = running
    ? 'Running...'
    : !playbackReady || pb.stepIndex < 0
      ? 'Awaiting step'
      : focusedLineNumber === null
        ? `Step ${pb.stepIndex + 1}`
        : `Step ${pb.stepIndex + 1} · line ${focusedLineNumber}`

  const focusSegments = useMemo(() => {
    if (!currentStep?.focusSegmentIds?.length) return new Set<string>()
    return new Set(currentStep.focusSegmentIds)
  }, [currentStep])

  const restoreStarter = () => {
    prevIdxRef.current = -1
    resetOutcome()
    setReplayCode(null)
    resetPb()
    setCode(task.starterCode)
    sound.play('back')
  }

  const handleStepBack = useCallback(() => {
    if (!playbackReady) return
    pbRef.current.pause()
    pbRef.current.stepBack()
    sound.play('back')
  }, [playbackReady, sound])

  const handleStepForward = useCallback(async () => {
    if (running) return
    pbRef.current.pause()
    if (!playbackReady) {
      snapshotForRunRef.current = code
      const res = await run(code)
      if (!res?.steps?.length) return
      afterSuccessfulRun()
    }
    pbRef.current.stepForward()
  }, [running, playbackReady, code, run, afterSuccessfulRun])

  const handlePlaybackReset = useCallback(() => {
    resetPb()
    prevIdxRef.current = -1
    sound.play('back')
  }, [resetPb, sound])

  const handleTogglePlay = useCallback(async () => {
    if (running) return
    if (!playbackReady) {
      snapshotForRunRef.current = code
      const res = await run(code)
      if (!res?.steps?.length) return
      afterSuccessfulRun()
      pbRef.current.play()
      return
    }
    if (pbRef.current.atEnd && !pbRef.current.isPlaying) {
      pbRef.current.reset()
      prevIdxRef.current = -1
      pbRef.current.play()
      return
    }
    pbRef.current.togglePlay()
  }, [running, playbackReady, code, run, afterSuccessfulRun])

  useEffect(() => {
    pbRef.current = pb
  }, [pb])

  useEffect(() => {
    const prev = prevIdxRef.current
    const now = pb.stepIndex
    prevIdxRef.current = now
    if (!playbackReady || now < 0) return
    if (prev > now || prev === now) return
    const st = result?.steps?.[now]
    if (!st) return

    const play = soundRef.current.play
    if (st.changed?.length) play('change')
    else if (st.consoleStep) play('output')
    else play('step')

    if (now === stepCount - 1 && stepCount > 0) {
      play('complete')
      queueMicrotask(() => {
        setToast({ msg: 'Execution complete!', variant: 'success', show: true })
        window.setTimeout(() => setToast((t) => ({ ...t, show: false })), 2400)
      })
    }
  }, [pb.stepIndex, playbackReady, stepCount, result?.steps])

  const keyboardRef = useRef({
    onToggle: handleTogglePlay,
    onFwd: handleStepForward,
    onBack: handleStepBack,
    onReset: handlePlaybackReset,
  })

  useEffect(() => {
    keyboardRef.current = {
      onToggle: handleTogglePlay,
      onFwd: handleStepForward,
      onBack: handleStepBack,
      onReset: handlePlaybackReset,
    }
  }, [handleTogglePlay, handleStepForward, handleStepBack, handlePlaybackReset])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return
      if (running) return
      switch (e.key) {
        case ' ':
          e.preventDefault()
          void keyboardRef.current.onToggle()
          break
        case 'ArrowRight':
          e.preventDefault()
          pbRef.current.pause()
          void keyboardRef.current.onFwd()
          break
        case 'ArrowLeft':
          e.preventDefault()
          pbRef.current.pause()
          keyboardRef.current.onBack()
          break
        case 'r':
        case 'R':
          keyboardRef.current.onReset()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [running])

  const err = result?.error
  const showErrorDetail = Boolean(err?.stack)

  return (
    <>
      <div className={learnStyles.grid}>
        <div className={learnStyles.primary}>
          <div className={learnStyles.head}>
            <p className={learnStyles.overline}>Practice · {task.title}</p>
            <p className={learnStyles.desc}>{task.description}</p>
          </div>
          <PracticeTaskBrief task={task} />
          {task.problemDetail ? (
            <aside className={learnStyles.intro} aria-label="Scenario and specifics">
              <p className={learnStyles.introTitle}>Scenario and specifics</p>
              <p className={learnStyles.introBody}>{task.problemDetail}</p>
            </aside>
          ) : null}

          <div className={learnStyles.learnStage}>
            <div className={learnStyles.codeStage}>
              <PlaygroundCodeEditor
                id={editorId}
                value={code}
                onChange={setCode}
                disabled={running}
                embedded
                focusedLineIndex={focusedLineIndex}
                focusedSegmentIds={focusSegments}
              />
            </div>

            <ExplanationPanel text={explanationText} />
            <PlaybackControls
              stepLabel={stepLabel}
              progressPercent={progressPercent}
              isPlaying={pb.isPlaying}
              canBack={canBack}
              canForward={canForward}
              speedMs={pb.speedMs}
              soundEnabled={sound.enabled}
              playbackLocked={running}
              onPlayPause={() => {
                void handleTogglePlay()
              }}
              onStepBack={handleStepBack}
              onStepForward={() => {
                void handleStepForward()
              }}
              onReset={handlePlaybackReset}
              onSpeedChange={pb.setSpeedMs}
              onSoundToggle={() => {
                const next = !sound.enabled
                sound.setEnabled(next)
                saveSoundEnabled(next)
                setToast({
                  msg: next ? 'Sound on' : 'Sound off',
                  variant: 'info',
                  show: true,
                })
                window.setTimeout(() => setToast((t) => ({ ...t, show: false })), 1600)
              }}
            />

            {result && status === 'done' && !running ? (
              <p className={styles.runSummary} aria-live="polite">
                {result.timedOut ? (
                  <span className={styles.badgeWarn}>Stopped (timeout)</span>
                ) : result.ok ? (
                  <span className={styles.badgeOk}>Checks passed</span>
                ) : err ? (
                  <span className={styles.badgeWarn}>Run error</span>
                ) : (
                  <span className={styles.badgeWarn}>Some checks failed</span>
                )}
                <span className={styles.caseCounts}>
                  {passingCount}/{cases.length} tests passing
                </span>
                {codeDirtySinceRun ? (
                  <span className={styles.badgeWarn}>Code changed - rerun needed</span>
                ) : null}
                <span className={styles.duration}>{Math.round(result.durationMs)} ms</span>
              </p>
            ) : null}
          </div>

          {err ? (
            <div className={styles.errorCard} role="alert">
              <p className={styles.errorSummary}>{err.message}</p>
              {showErrorDetail ? (
                <details className={styles.errorDetails}>
                  <summary>Technical detail</summary>
                  <pre className={styles.errorPre}>{err.stack}</pre>
                </details>
              ) : null}
            </div>
          ) : null}

          <HintPanel hints={task.hints} />
          <button type="button" className={styles.restoreStarter} onClick={restoreStarter}>
            Restore starter code
          </button>
        </div>

        <div className={learnStyles.side}>
          <VariableInspector
            variables={varsShown}
            changed={currentStep?.changed}
            arrIdx={currentStep?.arrIdx}
            stepHint={stepHint}
          />
          <ConsolePanel
            lines={consoleLinesShown}
            label="Console output"
            stepHint={stepHint}
            emptyHint={
              running
                ? 'Running…'
                : playbackReady && pb.stepIndex < 0
                  ? 'Step forward to see output at each step.'
                  : 'Output appears after you Play or Step forward.'
            }
          />
          <TestResults cases={cases} />
        </div>
      </div>

      <Toast message={toast.msg} variant={toast.variant} visible={toast.show} />
    </>
  )
}
