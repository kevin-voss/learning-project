import type { TopicIntro } from '@/types/curriculum'

import styles from '@/components/learn/LearnPanel.module.css'

export type TopicIntroSectionsProps = {
  intro: TopicIntro
  topicTitles: Map<string, string>
  onOpenEarlierTopic?: (topicId: string) => void
}

/** Presentational blocks for topic intros (Builds on, What it is, …). */
export function TopicIntroSections({
  intro,
  topicTitles,
  onOpenEarlierTopic,
}: TopicIntroSectionsProps) {
  const hasSyntax =
    (intro.syntaxPattern != null && intro.syntaxPattern.length > 0) ||
    Boolean(intro.syntaxParts?.length)

  const hasGlance =
    (intro.technicalExample != null && intro.technicalExample.length > 0) ||
    (intro.everydayExample != null && intro.everydayExample.length > 0)

  const buildsOn = intro.buildsOn

  return (
    <>
      {buildsOn != null && buildsOn.length > 0 ? (
        <div className={styles.introBlock}>
          <h3 className={styles.introTitle}>Builds on (earlier topics)</h3>
          <p className={styles.introBody}>
            This page only uses ideas you have already seen. Open an earlier topic any time you
            want a full refresher—the button jumps to that topic’s start.
          </p>
          <ul className={styles.introBuildsOnList}>
            {buildsOn.map((b) => {
              const label = topicTitles.get(b.topicId) ?? b.topicId
              return (
                <li key={b.topicId}>
                  {onOpenEarlierTopic ? (
                    <button
                      type="button"
                      className={styles.introTopicLink}
                      onClick={() => onOpenEarlierTopic(b.topicId)}
                    >
                      {label}
                    </button>
                  ) : (
                    <span className={styles.introTopicName}>{label}</span>
                  )}
                  <span className={styles.introBuildsOnNote}>{' — '}{b.note}</span>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
      <div className={styles.introBlock}>
        <h3 className={styles.introTitle}>What it is</h3>
        <p className={styles.introBody}>{intro.whatItIs}</p>
      </div>
      <div className={styles.introBlock}>
        <h3 className={styles.introTitle}>Why it matters</h3>
        <p className={styles.introBody}>{intro.whyItMatters}</p>
      </div>
      <div className={styles.introBlock}>
        <h3 className={styles.introTitle}>Real-world examples</h3>
        <ul className={styles.introList}>
          {intro.realWorldExamples.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
      {hasSyntax ? (
        <div className={styles.introBlock}>
          <h3 className={styles.introTitle}>Reading the syntax, piece by piece</h3>
          {intro.syntaxPattern?.length ? (
            <pre className={styles.introSyntax}>{intro.syntaxPattern}</pre>
          ) : null}
          {intro.syntaxParts?.length ? (
            <ul className={styles.introSyntaxList}>
              {intro.syntaxParts.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
      {hasGlance ? (
        <div className={styles.introBlock}>
          <h3 className={styles.introTitle}>At a glance</h3>
          {intro.technicalExample?.length ? (
            <>
              <p className={styles.introSnippetLabel}>Tiny code example</p>
              <pre className={styles.introTinyCode}>{intro.technicalExample}</pre>
            </>
          ) : null}
          {intro.everydayExample?.length ? (
            <>
              <p className={styles.introSnippetLabel}>Same idea in daily life</p>
              <p className={styles.introGlanceBody}>{intro.everydayExample}</p>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
