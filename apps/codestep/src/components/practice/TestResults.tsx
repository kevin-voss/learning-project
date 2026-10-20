import type { TestCaseResult } from '@/types/playground'

import styles from './TestResults.module.css'

function formatValue(v: unknown): string {
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return JSON.stringify(v)
  try {
    return JSON.stringify(v, null, 2)
  } catch {
    return String(v)
  }
}

type Props = {
  cases: TestCaseResult[]
  /** When no structured cases (e.g. parse error), omit list */
  hideWhenEmpty?: boolean
}

export function TestResults({ cases, hideWhenEmpty }: Props) {
  if (hideWhenEmpty && cases.length === 0) return null

  return (
    <div className={styles.root}>
      <p className={styles.eyebrow}>Test results</p>
      {cases.length === 0 ? (
        <p className={styles.muted}>Run your code to see checks here.</p>
      ) : (
        <ul className={styles.list}>
          {cases.map((c) => (
            <li key={c.id} className={`${styles.case} ${c.pass ? styles.pass : styles.fail}`}>
              <div className={styles.row}>
                <span className={styles.badge} aria-hidden>
                  {c.pass ? '✓' : '✗'}
                </span>
                <span className={styles.label}>{c.label ?? c.id}</span>
              </div>
              {c.detail ? <p className={styles.detail}>{c.detail}</p> : null}
              {c.pass ? null : (
                <dl className={styles.diff}>
                  {c.expected !== undefined ? (
                    <>
                      <dt>Expected</dt>
                      <dd>
                        <pre className={styles.pre}>{formatValue(c.expected)}</pre>
                      </dd>
                    </>
                  ) : null}
                  {c.received !== undefined ? (
                    <>
                      <dt>Received</dt>
                      <dd>
                        <pre className={styles.pre}>{formatValue(c.received)}</pre>
                      </dd>
                    </>
                  ) : null}
                </dl>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
