import { describe, expect, it } from 'vitest'

import { clampLessonStep } from './clampLessonStep'

describe('clampLessonStep', () => {
  it('clamps into range', () => {
    expect(clampLessonStep(5, 3)).toBe(3)
    expect(clampLessonStep(-1, 4)).toBe(0)
  })

  it('accepts undefined as 0 when max is non-negative', () => {
    expect(clampLessonStep(undefined, 2)).toBe(0)
  })

  it('returns 0 when maxIdx is negative', () => {
    expect(clampLessonStep(1, -1)).toBe(0)
  })
})
