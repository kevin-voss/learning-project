import type { CodeLine } from '@/types/curriculum'

/** Parse raw JS source into one segment per line (for CodeViewer / playground replay). */
export function codeStringToCodeLines(code: string): CodeLine[] {
  const lines = code.split(/\r\n|\r|\n/)
  return lines.map((text, rowIdx) => ({
    segments: [{ id: `pg-${rowIdx}-0`, text }],
  }))
}
