/** Discrete autoplay speeds for guided examples (stored ms maps to nearest preset). */
export const PLAYBACK_SPEED_MS = {
  slow: 1800,
  medium: 1000,
  fast: 500,
} as const

export type PlaybackSpeedPreset = keyof typeof PLAYBACK_SPEED_MS

const PRESET_ENTRIES = Object.entries(PLAYBACK_SPEED_MS) as [
  PlaybackSpeedPreset,
  number,
][]

export function nearestPlaybackSpeedMs(ms: number): number {
  let best: number = PLAYBACK_SPEED_MS.medium
  let bestDiff = Infinity
  for (const [, v] of PRESET_ENTRIES) {
    const d = Math.abs(v - ms)
    if (d < bestDiff) {
      bestDiff = d
      best = v
    }
  }
  return best
}

export function presetForSpeedMs(ms: number): PlaybackSpeedPreset {
  const target = nearestPlaybackSpeedMs(ms)
  const hit = PRESET_ENTRIES.find(([, v]) => v === target)
  return hit?.[0] ?? 'medium'
}
