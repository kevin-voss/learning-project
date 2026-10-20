import { Fragment, type ReactNode } from 'react'

import richStyles from '@/lib/explanationRich.module.css'

function renderStyled(kind: string, inner: string, key: string): ReactNode {
  switch (kind) {
    case 'bold':
      return (
        <strong key={key} className={richStyles.richStrong}>
          {inner}
        </strong>
      )
    case 'italic':
      return (
        <em key={key} className={richStyles.richEm}>
          {inner}
        </em>
      )
    case 'code':
      return (
        <code key={key} className={richStyles.richCode}>
          {inner}
        </code>
      )
    case 'underline':
      return (
        <span key={key} className={richStyles.richUnderline}>
          {inner}
        </span>
      )
    case 'mark':
      return (
        <mark key={key} className={richStyles.richMark}>
          {inner}
        </mark>
      )
    default:
      return inner
  }
}

function parseInlineSegment(segment: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = []
  let i = 0
  let n = 0
  const nextKey = () => `${keyPrefix}-${n++}`

  while (i < segment.length) {
    if (segment.startsWith('**', i)) {
      const end = segment.indexOf('**', i + 2)
      if (end !== -1) {
        out.push(renderStyled('bold', segment.slice(i + 2, end), nextKey()))
        i = end + 2
        continue
      }
    }
    if (segment.startsWith('==', i)) {
      const end = segment.indexOf('==', i + 2)
      if (end !== -1) {
        out.push(renderStyled('mark', segment.slice(i + 2, end), nextKey()))
        i = end + 2
        continue
      }
    }
    if (segment.startsWith('__', i)) {
      const end = segment.indexOf('__', i + 2)
      if (end !== -1) {
        out.push(renderStyled('underline', segment.slice(i + 2, end), nextKey()))
        i = end + 2
        continue
      }
    }
    if (segment[i] === '`') {
      const end = segment.indexOf('`', i + 1)
      if (end !== -1) {
        out.push(renderStyled('code', segment.slice(i + 1, end), nextKey()))
        i = end + 1
        continue
      }
    }
    if (segment[i] === '*' && segment[i + 1] !== '*') {
      const end = segment.indexOf('*', i + 1)
      if (end !== -1) {
        out.push(renderStyled('italic', segment.slice(i + 1, end), nextKey()))
        i = end + 1
        continue
      }
    }

    let next = segment.length
    const bump = (j: number) => {
      if (j !== -1 && j < next) next = j
    }
    bump(segment.indexOf('**', i))
    bump(segment.indexOf('==', i))
    bump(segment.indexOf('__', i))
    bump(segment.indexOf('`', i))
    const star = segment.indexOf('*', i)
    if (star !== -1 && segment[star + 1] !== '*') bump(star)

    if (next > i) {
      out.push(segment.slice(i, next))
      i = next
    } else {
      out.push(segment[i])
      i += 1
    }
  }
  return out
}

/** Curriculum-safe inline markers: **bold**, *italic*, `code`, __underline__, ==highlight== */
export function explanationRichContent(text: string): ReactNode {
  const lines = text.split('\n')
  return lines.map((line, lineIdx) => (
    <Fragment key={`L${lineIdx}`}>
      {lineIdx > 0 ? <br /> : null}
      {parseInlineSegment(line, `L${lineIdx}`)}
    </Fragment>
  ))
}
