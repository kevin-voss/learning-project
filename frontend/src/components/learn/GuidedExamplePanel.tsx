import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { CodeViewer } from '@/components/learn/CodeViewer'
import { ConsolePanel } from '@/components/learn/ConsolePanel'
import { ExplanationPanel } from '@/components/learn/ExplanationPanel'
import { PlaybackControls } from '@/components/learn/PlaybackControls'
import { Toast } from '@/components/learn/Toast'
import { VariableInspector } from '@/components/learn/VariableInspector'
import { canStepBack, canStepForward } from '@/domains/walkthroughs/playback'
import {
  loadSoundEnabled,
  saveLearnExampleIdx,
  saveSoundEnabled,
} from '@/hooks/codestepSettings'
import { usePlayback } from '@/hooks/usePlayback'
import { PLAYBACK_SPEED_MS } from '@/lib/playbackSpeed'
import { useSound } from '@/hooks/useSound'
import type { Topic } from '@/types/curriculum'

import styles from './LearnPanel.module.css'

type Props = {
  topic: Topic
  exampleIndex: number
}

/** Guided walkthrough-only (parent controls which example via roadmap). */
export function GuidedExamplePanel({ topic, exampleIndex }: Props) {
  const exampleIdx = Math.min(
    Math.max(0, exampleIndex),
    Math.max(0, topic.examples.length - 1),
  )

  useEffect(() => {
    saveLearnExampleIdx(topic.id, exampleIdx)
  }, [topic.id, exampleIdx])

  const example = topic.examples[exampleIdx] ?? topic.examples[0]!
  const steps = example.steps
  const stepCount = steps.length

  const pb = usePlayback(stepCount, {
    initialSpeedMs: PLAYBACK_SPEED_MS.medium,
  })
  const sound = useSound(loadSoundEnabled())

  useEffect(() => {
    pb.setSpeedMs(PLAYBACK_SPEED_MS.medium)
    // pb changes identity each render; only reset speed when switching example.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id, exampleIdx])
  const soundRef = useRef(sound)

  useEffect(() => {
    soundRef.current = sound
  }, [sound])

  const prevIdxRef = useRef(-1)

  const [toast, setToast] = useState<{ msg: string; variant: 'info' | 'success'; show: boolean }>({
    msg: '',
    variant: 'info',
    show: false,
  })

  useEffect(() => {
    prevIdxRef.current = -1
    pb.reset()
    // pb.reset is stable; avoid depending on whole playback object.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync playback when example changes
  }, [topic.id, exampleIdx, pb.reset])

  const currentStep =
    pb.stepIndex >= 0 && pb.stepIndex < steps.length ? steps[pb.stepIndex] : null

  const stepLabel =
    stepCount <= 0 ? '0 / 0' : `${Math.max(0, pb.stepIndex + 1)} / ${stepCount}`

  const progressPercent =
    stepCount <= 0 ? 0 : pb.stepIndex < 0 ? 0 : ((pb.stepIndex + 1) / stepCount) * 100

  useEffect(() => {
    const prev = prevIdxRef.current
    const now = pb.stepIndex
    prevIdxRef.current = now
    if (now < 0) return
    if (prev > now) return
    if (prev === now) return

    const step = steps[now]
    if (!step) return

    const play = soundRef.current.play
    if (step.changed?.length) play('change')
    else if (step.consoleStep) play('output')
    else play('step')

    if (now === stepCount - 1 && stepCount > 0) {
      play('complete')
      queueMicrotask(() => {
        setToast({ msg: 'Execution complete!', variant: 'success', show: true })
        window.setTimeout(() => setToast((t) => ({ ...t, show: false })), 2400)
      })
    }
  }, [pb.stepIndex, stepCount, steps])

  const handleStepBack = useCallback(() => {
    pb.pause()
    pb.stepBack()
    sound.play('back')
  }, [pb, sound])

  const handleStepForward = useCallback(() => {
    pb.pause()
    pb.stepForward()
  }, [pb])

  const handleReset = useCallback(() => {
    pb.reset()
    sound.play('back')
  }, [pb, sound])

  const handleTogglePlay = useCallback(() => {
    if (pb.atEnd && !pb.isPlaying) {
      pb.reset()
      pb.play()
      return
    }
    pb.togglePlay()
  }, [pb])

  const focusSegments = useMemo(() => {
    if (!currentStep?.focusSegmentIds?.length) return new Set<string>()
    return new Set(currentStep.focusSegmentIds)
  }, [currentStep])

  const keyboardRef = useRef({
    onToggle: handleTogglePlay,
    onFwd: handleStepForward,
    onBack: handleStepBack,
    onReset: handleReset,
  })

  useEffect(() => {
    keyboardRef.current = {
      onToggle: handleTogglePlay,
      onFwd: handleStepForward,
      onBack: handleStepBack,
      onReset: handleReset,
    }
  }, [handleTogglePlay, handleStepForward, handleStepBack, handleReset])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return
      switch (e.key) {
        case ' ':
          e.preventDefault()
          keyboardRef.current.onToggle()
          break
        case 'ArrowRight':
          e.preventDefault()
          pb.pause()
          keyboardRef.current.onFwd()
          break
        case 'ArrowLeft':
          e.preventDefault()
          pb.pause()
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
  }, [pb])

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.primary}>
          <div className={styles.learnStage}>
            <div className={styles.codeStage}>
              <CodeViewer
                lines={example.lines}
                focusedLineIndex={currentStep?.lineIndex ?? null}
                focusedSegmentIds={focusSegments}
              />
            </div>
            <ExplanationPanel text={currentStep?.explanation ?? null} />
            <PlaybackControls
              stepLabel={stepLabel}
              progressPercent={progressPercent}
              isPlaying={pb.isPlaying}
              canBack={canStepBack(pb.stepIndex)}
              canForward={canStepForward(pb.stepIndex, stepCount)}
              speedMs={pb.speedMs}
              soundEnabled={sound.enabled}
              onPlayPause={handleTogglePlay}
              onStepBack={handleStepBack}
              onStepForward={handleStepForward}
              onReset={handleReset}
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
          </div>
        </div>

        <div className={styles.side}>
          <VariableInspector
            variables={currentStep?.variables ?? null}
            changed={currentStep?.changed}
            arrIdx={currentStep?.arrIdx}
          />
          <ConsolePanel lines={currentStep?.consoleLines ?? []} />
        </div>
      </div>

      <Toast message={toast.msg} variant={toast.variant} visible={toast.show} />
    </>
  )
}
