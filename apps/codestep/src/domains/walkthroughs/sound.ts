/** Web Audio cues — prototype SoundEngine parity (step, change, output, complete, back). */

export type SoundCue = 'step' | 'change' | 'output' | 'complete' | 'back'

let sharedCtx: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    if (!sharedCtx) {
      sharedCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)()
    }
    return sharedCtx
  } catch {
    return null
  }
}

/** Call from a click/gesture handler if autoplay blocks; safe to call repeatedly. */
export function resumeAudioIfNeeded(): void {
  const c = getContext()
  void c?.resume?.().catch(() => {})
}

export function playSoundCue(cue: SoundCue, enabled: boolean): void {
  if (!enabled) return
  const c = getContext()
  if (!c) return
  try {
    void c.resume?.()
    const t = c.currentTime
    const o = c.createOscillator()
    const g = c.createGain()
    o.connect(g)
    g.connect(c.destination)
    switch (cue) {
      case 'step':
        o.type = 'sine'
        o.frequency.value = 520
        g.gain.setValueAtTime(0.06, t)
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.07)
        o.start(t)
        o.stop(t + 0.07)
        break
      case 'change':
        o.type = 'triangle'
        o.frequency.value = 880
        g.gain.setValueAtTime(0.07, t)
        o.frequency.exponentialRampToValueAtTime(1200, t + 0.08)
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
        o.start(t)
        o.stop(t + 0.15)
        break
      case 'output':
        o.type = 'sine'
        o.frequency.value = 660
        g.gain.setValueAtTime(0.05, t)
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
        o.start(t)
        o.stop(t + 0.12)
        break
      case 'complete': {
        o.type = 'sine'
        o.frequency.value = 523
        g.gain.setValueAtTime(0.08, t)
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
        o.start(t)
        o.stop(t + 0.15)
        const o2 = c.createOscillator()
        const g2 = c.createGain()
        o2.connect(g2)
        g2.connect(c.destination)
        o2.type = 'sine'
        o2.frequency.value = 659
        g2.gain.setValueAtTime(0.08, t + 0.12)
        g2.gain.exponentialRampToValueAtTime(0.001, t + 0.27)
        o2.start(t + 0.12)
        o2.stop(t + 0.27)
        const o3 = c.createOscillator()
        const g3 = c.createGain()
        o3.connect(g3)
        g3.connect(c.destination)
        o3.type = 'sine'
        o3.frequency.value = 784
        g3.gain.setValueAtTime(0.08, t + 0.24)
        g3.gain.exponentialRampToValueAtTime(0.001, t + 0.5)
        o3.start(t + 0.24)
        o3.stop(t + 0.5)
        break
      }
      case 'back':
        o.type = 'sine'
        o.frequency.value = 380
        g.gain.setValueAtTime(0.04, t)
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
        o.start(t)
        o.stop(t + 0.06)
        break
      default:
        o.disconnect()
        g.disconnect()
    }
  } catch {
    /* blocked or teardown — ignore */
  }
}
