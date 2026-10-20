/** Pure helpers — no React. */

export function clampStep(next: number, total: number): number {
  if (total <= 0) return -1
  if (next < -1) return -1
  if (next >= total) return total - 1
  return next
}

export function progressFraction(stepIndex: number, totalSteps: number): number {
  if (totalSteps <= 0) return 0
  if (stepIndex < 0) return 0
  return (stepIndex + 1) / totalSteps
}

export function canStepForward(stepIndex: number, totalSteps: number): boolean {
  return totalSteps > 0 && stepIndex < totalSteps - 1
}

export function canStepBack(stepIndex: number): boolean {
  return stepIndex > 0
}
