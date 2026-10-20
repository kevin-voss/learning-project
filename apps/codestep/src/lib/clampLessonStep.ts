/** Clamps a saved lesson step index into `[0, maxIdx]` with safe defaults. */
export function clampLessonStep(load: number | undefined, maxIdx: number): number {
  if (maxIdx < 0) return 0
  const base = load !== undefined && load >= 0 ? Math.floor(load) : 0
  return Math.min(Math.max(0, base), maxIdx)
}
