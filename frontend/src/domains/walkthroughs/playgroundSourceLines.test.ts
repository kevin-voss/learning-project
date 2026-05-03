import { describe, expect, it } from 'vitest'

import {
  enumerateConsoleLogLineIndices,
  isSteppableSourceLine,
  splitSourceLines,
  steppableSourceLineIndices,
} from './playgroundSourceLines'

describe('splitSourceLines', () => {
  it('normalizes line endings', () => {
    expect(splitSourceLines('a\r\nb\rc')).toEqual(['a', 'b', 'c'])
  })
})

describe('isSteppableSourceLine', () => {
  it('skips empties and brace-only lines', () => {
    expect(isSteppableSourceLine('')).toBe(false)
    expect(isSteppableSourceLine('  ')).toBe(false)
    expect(isSteppableSourceLine('{')).toBe(false)
    expect(isSteppableSourceLine('const x = 1')).toBe(true)
  })
})

describe('enumerateConsoleLogLineIndices', () => {
  it('records multiple log sites on one line', () => {
    expect(enumerateConsoleLogLineIndices(['console.log(1); console.log(2);'])).toEqual([0, 0])
  })

  it('collects sites in order', () => {
    const lines = ['// skip', 'console.log(1);', '', '  console.log(2);']
    expect(enumerateConsoleLogLineIndices(lines)).toEqual([1, 3])
  })
})

describe('steppableSourceLineIndices', () => {
  it('indexes lines that are steppable', () => {
    const lines = ['const x = 1', '', '// c', '{', 'console.log(x);']
    expect(steppableSourceLineIndices(lines)).toEqual([0, 4])
  })
})
