import { useEffect, useRef } from 'react'

import { syntaxTintHtml } from '@/domains/line-highlights/syntaxTint'

import styles from './ConsolePanel.module.css'

type Props = {
  lines: string[]
  /** Tab / window title (also used for accessibility). Defaults to "Console". */
  label?: string
  /** Shown in the fake address bar (defaults to about:output). */
  urlHint?: string
  /** Empty-state hint; defaults to guided copy */
  emptyHint?: string
  /** Optional dynamic cue while stepping through a run. */
  stepHint?: string
}

export function ConsolePanel({
  lines,
  label = 'Console',
  urlHint = 'about:output',
  emptyHint,
  stepHint,
}: Props) {
  const empty = lines.length === 0
  const hint =
    emptyHint ?? 'Output appears here when steps emit logs.'
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    wrap.scrollTop = wrap.scrollHeight
  }, [lines])

  const titleId = 'console-panel-title'

  return (
    <section className={styles.root} aria-labelledby={titleId}>
      <div className={styles.browser}>
        <div className={styles.windowTop}>
          <span className={styles.traffic} aria-hidden>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </span>
          <div className={styles.tabStrip}>
            <div className={styles.tab}>
              <span className={styles.tabFavicon} aria-hidden />
              <span id={titleId} className={styles.tabLabel}>
                {label}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.urlRow}>
          <span className={styles.lock} aria-hidden title="Secure context (simulated)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="11" width="14" height="10" rx="1.5" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
          </span>
          <span className={styles.urlText}>{urlHint}</span>
          {stepHint ? <span className={styles.stepHint}>{stepHint}</span> : null}
        </div>

        <div
          ref={wrapRef}
          className={styles.editorWrap}
          role="region"
          aria-live="polite"
          aria-label={`${label} output`}
        >
          {empty ? (
            <p className={styles.empty}>{hint}</p>
          ) : (
            <div className={styles.editor}>
              {lines.map((line, i) => (
                <div
                  key={`${i}-${line.slice(0, 24)}`}
                  className={styles.codeLine}
                >
                  <span className={styles.lineNum}>{i + 1}</span>
                  <span
                    className={styles.lineCode}
                    // curriculum / runtime strings only
                    dangerouslySetInnerHTML={{
                      __html: syntaxTintHtml(line),
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
