import { renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useWideLayout } from './useWideLayout'

describe('useWideLayout', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        media: '(min-width: 56.25rem)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('reads matchMedia on mount', () => {
    const { result } = renderHook(() => useWideLayout())
    expect(result.current).toBe(false)
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 56.25rem)')
  })
})
