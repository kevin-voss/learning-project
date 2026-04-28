import {
  PLAYBACK_SPEED_MS,
  type PlaybackSpeedPreset,
  presetForSpeedMs,
} from '@/lib/playbackSpeed'

import styles from './PlaybackControls.module.css'

type Props = {
  stepLabel: string
  progressPercent: number
  isPlaying: boolean
  canBack: boolean
  canForward: boolean
  speedMs: number
  soundEnabled: boolean
  /** When true, play / step buttons are disabled (e.g. practice before first run). */
  playbackLocked?: boolean
  onPlayPause: () => void
  onStepBack: () => void
  onStepForward: () => void
  onReset: () => void
  onSpeedChange: (ms: number) => void
  onSoundToggle: () => void
}

const SPEED_ORDER: PlaybackSpeedPreset[] = ['slow', 'medium', 'fast']

const SPEED_LABEL: Record<PlaybackSpeedPreset, string> = {
  slow: 'Slow',
  medium: 'Medium',
  fast: 'Fast',
}

export function PlaybackControls({
  stepLabel,
  progressPercent,
  isPlaying,
  canBack,
  canForward,
  speedMs,
  soundEnabled,
  playbackLocked = false,
  onPlayPause,
  onStepBack,
  onStepForward,
  onReset,
  onSpeedChange,
  onSoundToggle,
}: Props) {
  const activePreset = presetForSpeedMs(speedMs)
  const stepDisabled = playbackLocked

  return (
    <div className={styles.root}>
      <div className={styles.progressHead}>
        <div
          className={styles.progress}
          role="progressbar"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <span className={styles.counter}>{stepLabel}</span>
      </div>

      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.btn}
          disabled={stepDisabled}
          onClick={onReset}
          title="Reset (R)"
          aria-label="Reset guided playback"
        >
          Reset
        </button>
        <button
          type="button"
          className={styles.btn}
          disabled={stepDisabled || !canBack}
          onClick={onStepBack}
          title="Step back (←)"
          aria-label="Step backward one frame"
        >
          ←
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary}`}
          disabled={stepDisabled}
          onClick={onPlayPause}
          title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
          aria-label={
            isPlaying ? 'Pause autoplay' : 'Play or autoplay guided steps'
          }
          aria-pressed={isPlaying}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          type="button"
          className={styles.btn}
          disabled={stepDisabled || !canForward}
          onClick={onStepForward}
          title="Step forward (→)"
          aria-label="Step forward one frame"
        >
          →
        </button>
      </div>

      <div className={styles.rowMeta}>
        <div
          className={styles.speedGroup}
          role="group"
          aria-label="Playback speed"
        >
          {SPEED_ORDER.map((preset) => (
            <button
              key={preset}
              type="button"
              className={`${styles.speedBtn} ${activePreset === preset ? styles.speedBtnActive : ''}`}
              onClick={() => onSpeedChange(PLAYBACK_SPEED_MS[preset])}
              aria-pressed={activePreset === preset}
            >
              {SPEED_LABEL[preset]}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.sound}
          onClick={onSoundToggle}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? 'Mute step sounds' : 'Enable step sounds'}
        >
          {soundEnabled ? 'Sound on' : 'Sound off'}
        </button>
      </div>
    </div>
  )
}
