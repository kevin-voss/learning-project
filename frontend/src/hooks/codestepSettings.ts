const STORAGE = {
  sound: 'codestep:sound-enabled',
  speed: 'codestep:playback-ms',
  topicId: 'codestep:last-topic-id',
  mode: 'codestep:last-mode',
  topicRailOpen: 'codestep:topic-rail-open',
  playgroundTask: 'codestep-playground-task:',
} as const

export type AppLearnModePersist = 'learn' | 'practice'

function readJson<T>(raw: string | null): T | undefined {
  if (raw == null || raw === '') return undefined
  try {
    return JSON.parse(raw) as T
  } catch {
    return undefined
  }
}

/** Sound default on when unspecified (matches UX expectations). */
export function loadSoundEnabled(): boolean {
  if (typeof localStorage === 'undefined') return true
  const raw = localStorage.getItem(STORAGE.sound)
  if (raw === '0' || raw === 'false') return false
  if (raw === '1' || raw === 'true') return true
  return true
}

export function saveSoundEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE.sound, enabled ? '1' : '0')
  } catch {
    /* ignore quota / privacy mode */
  }
}

/** Default playback step delay (~1.2s) when unspecified */
export function loadPlaybackMs(): number | undefined {
  if (typeof localStorage === 'undefined') return undefined
  const raw = localStorage.getItem(STORAGE.speed)
  if (!raw) return undefined
  const n = Number.parseInt(raw, 10)
  if (!Number.isFinite(n) || n < 300 || n > 5000) return undefined
  return n
}

export function savePlaybackMs(ms: number): void {
  try {
    localStorage.setItem(STORAGE.speed, String(Math.round(ms)))
  } catch {
    /* ignore */
  }
}

export function loadLastTopicId(fallbackId: string): string {
  if (typeof localStorage === 'undefined') return fallbackId
  const raw = localStorage.getItem(STORAGE.topicId)
  return raw && raw.length > 0 ? raw : fallbackId
}

export function saveLastTopicId(id: string): void {
  try {
    localStorage.setItem(STORAGE.topicId, id)
  } catch {
    /* ignore */
  }
}

export function loadLastMode(fallback: AppLearnModePersist): AppLearnModePersist {
  if (typeof localStorage === 'undefined') return fallback
  const raw = localStorage.getItem(STORAGE.mode)
  if (raw === 'practice' || raw === 'learn') return raw
  return fallback
}

export function saveLastMode(mode: AppLearnModePersist): void {
  try {
    localStorage.setItem(STORAGE.mode, mode)
  } catch {
    /* ignore */
  }
}

/** Desktop topic sidebar expanded (default true). */
export function loadTopicRailOpen(): boolean {
  if (typeof localStorage === 'undefined') return true
  const raw = localStorage.getItem(STORAGE.topicRailOpen)
  if (raw === '0' || raw === 'false') return false
  if (raw === '1' || raw === 'true') return true
  return true
}

export function saveTopicRailOpen(open: boolean): void {
  try {
    localStorage.setItem(STORAGE.topicRailOpen, open ? '1' : '0')
  } catch {
    /* ignore */
  }
}

/** Per-topic persisted example pill index while in Learn mode */
export function learnExampleStorageKey(topicId: string): string {
  return `codestep:learn-example:${topicId}`
}

export function loadLearnExampleIdx(topicId: string): number | undefined {
  const n = readJson<number>(
    typeof localStorage !== 'undefined' ? localStorage.getItem(learnExampleStorageKey(topicId)) : null,
  )
  if (typeof n !== 'number' || !Number.isFinite(n)) return undefined
  return Math.max(0, Math.floor(n))
}

export function saveLearnExampleIdx(topicId: string, idx: number): void {
  try {
    localStorage.setItem(learnExampleStorageKey(topicId), JSON.stringify(idx))
  } catch {
    /* ignore */
  }
}

/** Per-topic roadmap step index inside Learn (intro → guided ↔ practice …) */
export function lessonStepStorageKey(topicId: string): string {
  return `codestep:lesson-step:${topicId}`
}

export function loadLessonStepIdx(topicId: string): number | undefined {
  const n = readJson<number>(
    typeof localStorage !== 'undefined' ? localStorage.getItem(lessonStepStorageKey(topicId)) : null,
  )
  if (typeof n !== 'number' || !Number.isFinite(n)) return undefined
  return Math.max(0, Math.floor(n))
}

export function saveLessonStepIdx(topicId: string, idx: number): void {
  try {
    localStorage.setItem(lessonStepStorageKey(topicId), JSON.stringify(idx))
  } catch {
    /* ignore */
  }
}

function playgroundTaskStorageKey(topicId: string): string {
  return `${STORAGE.playgroundTask}${topicId}`
}

/** Resolved index into `tasks` from persisted task id for a topic */
export function loadPracticeTaskIdx(
  topicId: string,
  tasks: readonly { id: string }[],
): number {
  if (tasks.length === 0) return 0
  try {
    const raw = localStorage.getItem(playgroundTaskStorageKey(topicId))
    if (!raw) return 0
    const found = tasks.findIndex((t) => t.id === raw)
    return found >= 0 ? found : 0
  } catch {
    return 0
  }
}

export function savePracticeTaskId(topicId: string, taskId: string): void {
  try {
    localStorage.setItem(playgroundTaskStorageKey(topicId), taskId)
  } catch {
    /* ignore */
  }
}
