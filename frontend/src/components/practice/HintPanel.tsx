import { useId, useState } from 'react'

import { explanationRichContent } from '@/lib/explanationRich'

import styles from './HintPanel.module.css'

type Props = {
  hints: string[]
}

export function HintPanel({ hints }: Props) {
  const id = useId()
  const [revealed, setRevealed] = useState(0)

  if (hints.length === 0) return null

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <p className={styles.eyebrow} id={`${id}-label`}>
          Hints
        </p>
        <div className={styles.actions}>
          {revealed < hints.length ? (
            <>
              <button
                type="button"
                className={styles.linkish}
                onClick={() => setRevealed((r) => Math.min(hints.length, r + 1))}
              >
                Next hint
              </button>
              <button
                type="button"
                className={styles.linkish}
                onClick={() => setRevealed(hints.length)}
              >
                Reveal all
              </button>
            </>
          ) : (
            <button type="button" className={styles.linkish} onClick={() => setRevealed(0)}>
              Hide hints
            </button>
          )}
        </div>
      </div>
      {revealed > 0 ? (
        <ul className={styles.list} aria-labelledby={`${id}-label`}>
          {hints.slice(0, revealed).map((h, i) => (
            <li key={i} className={styles.item}>
              {explanationRichContent(h)}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.teaser}>Use the buttons above when you want a nudge.</p>
      )}
    </div>
  )
}
