// Compare a written answer to the accepted spellings in checks.json.
// Bits, hex, and numbers ignore spacing and the usual suffixes (b, h, Byte).

const SUPER = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
}

export function normalize(kind, value) {
  let s = String(value ?? '')
  if (kind === 'note') return s.trim()
  if (kind === 'text') {
    s = s.replace(/\s+/g, ' ').trim()
    const quoted = s.match(/^(['"])(.*)\1$/)
    if (quoted) s = quoted[2].trim()
    return s
  }
  if (kind === 'word') {
    s = s.toLowerCase().replace(/['".()]+/g, ' ').trim()
    return (s.split(/\s+/)[0] || '').replace(/[^a-z0-9-]/g, '')
  }
  if (kind === 'bits') {
    s = s.toLowerCase().replace(/[\s_]/g, '')
    if (s.startsWith('0b')) s = s.slice(2)
    if (s.endsWith('b')) s = s.slice(0, -1)
    return s
  }
  if (kind === 'hex') {
    s = s.toLowerCase().replace(/[\s_]/g, '')
    s = s.replace(/0x/g, '')
    s = s.replace(/h/g, '')
    return s
  }
  if (kind === 'number') {
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g, (run) => `^${[...run].map((ch) => SUPER[ch]).join('')}`)
    s = s.toLowerCase().replace(/[\s,_]/g, '')
    s = s.replace(/\*\*/g, '^')
    s = s.replace(/(bytes?|bits?)$/g, '')
    if (/^\d+$/.test(s)) s = String(Number(s))
    return s
  }
  return s.trim()
}

export function checkField(field, raw) {
  const kind = field.kind || 'text'
  if (kind === 'note') {
    const ok = normalize(kind, raw).length > 0
    return { ok, hint: ok ? '' : (field.hint || 'Write one sentence.') }
  }
  const got = normalize(kind, raw)
  if (!got) return { ok: false, hint: 'Type an answer in the editor.' }
  const accept = (field.accept || []).map((item) => normalize(kind, item))
  if (accept.includes(got)) return { ok: true, hint: '' }
  for (const trap of field.traps || []) {
    const traps = (trap.accept || []).map((item) => normalize(kind, item))
    if (traps.includes(got)) return { ok: false, hint: trap.hint || field.hint || 'Not yet.' }
  }
  return { ok: false, hint: field.hint || 'Not yet.' }
}
