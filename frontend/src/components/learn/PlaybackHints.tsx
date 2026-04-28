import styles from './PlaybackHints.module.css'

export function PlaybackHints() {
  return (
    <aside className={styles.root} aria-label="Keyboard shortcuts">
      <p className={styles.eyebrow}>Shortcuts</p>
      <ul className={styles.list}>
        <li>
          <kbd className={styles.kbd}>Space</kbd> Play / pause
        </li>
        <li>
          <kbd className={styles.kbd}>→</kbd> Step forward
        </li>
        <li>
          <kbd className={styles.kbd}>←</kbd> Step back
        </li>
        <li>
          <kbd className={styles.kbd}>R</kbd> Reset
        </li>
      </ul>
    </aside>
  )
}
