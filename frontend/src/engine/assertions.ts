const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === 'object' && !Array.isArray(v)

/** Normalize string for loose console comparison */
export function normalizeLogLine(line: string, collapseWhitespace: boolean): string {
  let s = line.trim()
  if (collapseWhitespace) {
    s = s.replace(/\s+/g, ' ')
  }
  return s
}

type DeepEqualOptions = {
  tolerance?: number
}

export function deepEqual(a: unknown, b: unknown, opts: DeepEqualOptions = {}): boolean {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (a === null || b === null) return a === b

  if (typeof a === 'number' && typeof b === 'number') {
    if (Number.isNaN(a) && Number.isNaN(b)) return true
    const tol = opts.tolerance ?? 0
    return Math.abs(a - b) <= tol
  }

  if (typeof a === 'string' || typeof a === 'boolean') return a === b

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i], opts)) return false
    }
    return true
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a).sort()
    const keysB = Object.keys(b).sort()
    if (keysA.length !== keysB.length) return false
    for (let i = 0; i < keysA.length; i++) {
      if (keysA[i] !== keysB[i]) return false
    }
    for (const k of keysA) {
      if (!deepEqual(a[k], b[k], opts)) return false
    }
    return true
  }

  return false
}

export function bindingMatches(
  received: unknown,
  exp: { value: unknown; type?: 'string' | 'number' | 'boolean'; tolerance?: number },
): boolean {
  if (exp.type !== undefined) {
    const t = typeof received
    if (exp.type === 'string' && t !== 'string') return false
    if (exp.type === 'number' && t !== 'number') return false
    if (exp.type === 'boolean' && t !== 'boolean') return false
  }
  return deepEqual(received, exp.value, { tolerance: exp.tolerance })
}
