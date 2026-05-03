import { useEffect, useRef } from 'react'

import { syntaxTintHtml } from '@/domains/line-highlights/syntaxTint'

import styles from './PlaygroundCodeEditor.module.css'

type Props = {
  id: string
  value: string
  onChange: (next: string) => void
  disabled?: boolean
  /** No outer border/radius when nested inside Learn-style code stage */
  embedded?: boolean
  /**
   * Step-through line (0-based), same semantics as Learn {@code CodeViewer}.
   * Omit or null when not stepping.
   */
  focusedLineIndex?: number | null
  /** Segment ids to emphasize on the focused line (`pg-{row}-0` matches worker replay). */
  focusedSegmentIds?: ReadonlySet<string>
}

export function PlaygroundCodeEditor({
  id,
  value,
  onChange,
  disabled,
  embedded,
  focusedLineIndex = null,
  focusedSegmentIds,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ta = textareaRef.current
    const hi = highlightRef.current
    if (!ta || !hi) return
    const sync = () => {
      hi.scrollTop = ta.scrollTop
      hi.scrollLeft = ta.scrollLeft
    }
    sync()
    ta.addEventListener('scroll', sync)
    return () => ta.removeEventListener('scroll', sync)
  }, [value])

  const lines = value.split(/\r\n|\r|\n/)
  const rows = Math.min(48, Math.max(12, lines.length + 3))
  const segIds = focusedSegmentIds ?? new Set<string>()
  const pinSegments = segIds.size > 0

  return (
    <div
      className={`${styles.shell} ${embedded ? styles.embedded : ''} ${disabled ? styles.disabled : ''}`}
    >
      <div className={styles.body}>
        <div className={styles.gutter} aria-hidden>
          {lines.map((_, i) => (
            <div
              key={`g-${i}`}
              className={`${styles.gutterLine} ${focusedLineIndex === i ? styles.gutterLineActive : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className={styles.inputStack}>
          <div className={styles.layerGrid}>
            <div ref={highlightRef} className={styles.highlightPane} aria-hidden>
              <div className={styles.highlightLines}>
                {lines.map((line, i) => {
                  const isRow = focusedLineIndex === i
                  const segId = `pg-${i}-0`
                  const segFocus =
                    isRow && pinSegments && segIds.has(segId) ? styles.segmentFocused : ''
                  return (
                    <div
                      key={`hl-${i}`}
                      className={`${styles.hlRow} ${isRow ? styles.hlRowActive : ''}`}
                    >
                      <span className={`${styles.hlSeg} ${segFocus}`}>
                        <span dangerouslySetInnerHTML={{ __html: syntaxTintHtml(line) }} />
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            <textarea
              ref={textareaRef}
              id={id}
              className={styles.textarea}
              aria-label="Code editor"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              rows={rows}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
