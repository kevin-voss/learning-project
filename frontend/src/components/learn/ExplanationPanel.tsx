import { explanationRichContent } from '@/lib/explanationRich'

import styles from './ExplanationPanel.module.css'

type Props = {
  text: string | null
}

export function ExplanationPanel({ text }: Props) {
  const display =
    text ??
    'Press **Play** or __Step Forward__ to begin stepping through the example.'

  return (
    <div className={styles.root}>
      <p className={styles.eyebrow}>Explanation</p>
      <div className={styles.body}>{explanationRichContent(display)}</div>
    </div>
  )
}
