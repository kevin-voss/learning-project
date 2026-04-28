import { useCallback, useEffect, useState } from 'react'

import { playSoundCue, resumeAudioIfNeeded, type SoundCue } from '@/engine/sound'

export function useSound(initialEnabled = true) {
  const [enabled, setEnabled] = useState(initialEnabled)

  const play = useCallback(
    (cue: SoundCue) => {
      playSoundCue(cue, enabled)
    },
    [enabled],
  )

  const toggle = useCallback(() => {
    setEnabled((e) => !e)
  }, [])

  /** Unlock AudioContext after user gesture */
  useEffect(() => {
    const unlock = () => {
      resumeAudioIfNeeded()
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  return { enabled, setEnabled, toggle, play }
}
