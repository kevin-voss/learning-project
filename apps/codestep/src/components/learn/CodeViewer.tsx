import { syntaxTintHtml } from '@/domains/line-highlights/syntaxTint'
import type { CodeLine as CodeLineModel } from '@/types/curriculum'

import styles from './CodeViewer.module.css'

type Props = {
  lines: CodeLineModel[]
  focusedLineIndex: number | null
  focusedSegmentIds: ReadonlySet<string>
}

export function CodeViewer({
  lines,
  focusedLineIndex,
  focusedSegmentIds,
}: Props) {
  return (
    <div className={styles.wrap} aria-live="polite">
      {lines.map((line, rowIdx) => (
        <CodeLineRow
          key={`line-${rowIdx}`}
          rowIdx={rowIdx}
          line={line}
          isFocusedRow={focusedLineIndex === rowIdx}
          focusedSegmentIds={focusedSegmentIds}
        />
      ))}
    </div>
  )
}

function CodeLineRow({
  rowIdx,
  line,
  isFocusedRow,
  focusedSegmentIds,
}: {
  rowIdx: number
  line: CodeLineModel
  isFocusedRow: boolean
  focusedSegmentIds: ReadonlySet<string>
}) {
  return (
    <div
      className={`${styles.codeLine} ${isFocusedRow ? styles.lineHighlighted : ''}`}
      data-line={rowIdx}
    >
      <span className={styles.lineNum}>{rowIdx + 1}</span>
      <span className={styles.lineCode}>
        {line.segments.map((seg) => {
          const pinSegments = focusedSegmentIds.size > 0
          const segFocus =
            isFocusedRow &&
            pinSegments &&
            focusedSegmentIds.has(seg.id)
              ? styles.segmentFocused
              : ''
          return (
            <span
              key={seg.id}
              className={`${styles.segment} ${segFocus}`}
              data-segment-id={seg.id}
              // trusted curriculum-only text
              dangerouslySetInnerHTML={{ __html: syntaxTintHtml(seg.text) }}
            />
          )
        })}
      </span>
    </div>
  )
}
