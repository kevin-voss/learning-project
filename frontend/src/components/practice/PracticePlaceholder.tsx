import styles from './PracticePlaceholder.module.css'

export function PracticePlaceholder() {
  return (
    <section
      className={styles.root}
      id="panel-practice"
      role="tabpanel"
      aria-labelledby="tab-practice"
    >
      <div className={styles.sheet}>
        <p className={styles.flag}>Practice mode</p>
        <h2 className={styles.headline}>Coming in Phase 03</h2>
        <p className={styles.detail}>
          Open-ended drills with feedback attach after the guided learner ships in Phase 02.
        </p>
      </div>
    </section>
  )
}
