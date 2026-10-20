import { describe, expect, it } from 'vitest'

import { escapeHtml, syntaxTintHtml } from './syntaxTint'

describe('escapeHtml', () => {
  it('escapes minimal entities', () => {
    expect(escapeHtml('a < b && c > d')).toBe('a &lt; b &amp;&amp; c &gt; d')
  })
})

describe('syntaxTintHtml', () => {
  it('wraps keywords', () => {
    expect(syntaxTintHtml('const x = 1;')).toContain('syn-kw')
    expect(syntaxTintHtml('const x = 1;')).toContain('const')
  })

  it('treats blank lines as comment spacer', () => {
    expect(syntaxTintHtml('   ')).toContain('syn-cmt')
  })
})
