import { describe, expect, it } from 'vitest'

import { codeStringToCodeLines } from './codeLines'

describe('codeStringToCodeLines', () => {
  it('uses pg- row segment ids', () => {
    const lines = codeStringToCodeLines('a\nb')
    expect(lines).toHaveLength(2)
    expect(lines[0]!.segments[0]!.id).toBe('pg-0-0')
    expect(lines[1]!.segments[0]!.text).toBe('b')
  })
})
