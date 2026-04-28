import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronDown, PanelLeft } from 'lucide-react'

import { GuidedExamplePanel } from '@/components/learn/GuidedExamplePanel'
import { PracticeExercise } from '@/components/practice/PracticeExercise'
import { playgroundTasksForTopic } from '@/data/playground'
import { buildLessonSteps, formatStepCue } from '@/engine/lessonRoadmap'
import type { Topic, TopicIntro } from '@/types/curriculum'

import styles from './LearnPanel.module.css'

type Props = {
  topic: Topic
  /** Current roadmap step (intro → guided → practice …), owned by app shell for sidebar sync */
  lessonStepIdx: number
  onLessonStepIdxChange: (idx: number) => void
  /** Set when another topic follows in the curriculum; last step advances to it */
  nextTopic?: { id: string; title: string } | null
  /** Called after user confirms “Next topic”; should set active topic id to `nextTopic.id` */
  onAdvanceToTopicId?: (id: string) => void
  /** Course topics drawer / rail toggle (flows with lesson nav rails) */
  showTopicsTrigger?: boolean
  onOpenTopics?: () => void
  topicsMenuOpen?: boolean
  topicsControlsId?: string
  /** Matches full curriculum — used by topic intro “Builds on” jump links */
  topicCatalog?: { id: string; title: string }[]
  /** Opens another topic’s first lesson step (overview) */
  onJumpToEarlierTopic?: (topicId: string) => void
}

function clampStep(load: number | undefined, maxIdx: number): number {
  if (maxIdx < 0) return 0
  const raw =
    load !== undefined && load >= 0 && load <= maxIdx ? load : 0
  return Math.min(Math.max(0, Math.floor(raw)), maxIdx)
}

function TopicIntroSections({
  intro,
  topicTitles,
  onOpenEarlierTopic,
}: {
  intro: TopicIntro
  topicTitles: Map<string, string>
  onOpenEarlierTopic?: (topicId: string) => void
}) {
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

export function LearnPanel({
  topic,
  lessonStepIdx,
  onLessonStepIdxChange,
  nextTopic,
  onAdvanceToTopicId,
  showTopicsTrigger = false,
  onOpenTopics,
  topicsMenuOpen = false,
  topicsControlsId,
  topicCatalog = [],
  onJumpToEarlierTopic,
}: Props) {
  const overviewRegionId = useId()

  const topicTitles = useMemo(() => {
    const m = new Map<string, string>()
    for (const t of topicCatalog) m.set(t.id, t.title)
    return m
  }, [topicCatalog])

  const tasks = useMemo(() => playgroundTasksForTopic(topic.id), [topic.id])

  const steps = useMemo(() => buildLessonSteps(topic, tasks), [topic, tasks])

  const maxIdx = Math.max(0, steps.length - 1)

  const effectiveIdx = clampStep(lessonStepIdx, maxIdx)
  const step = steps[effectiveIdx]
  const nextStep = steps[effectiveIdx + 1]

  const [overviewOpen, setOverviewOpen] = useState(false)
  const wasIntroRef = useRef(step?.kind === 'intro')

  useEffect(() => {
    const nowIntro = step?.kind === 'intro'
    if (wasIntroRef.current && !nowIntro) setOverviewOpen(false)
    wasIntroRef.current = nowIntro
  }, [step?.kind])

  const stepLabelSummary = steps.length <= 0 ? '' : `${effectiveIdx + 1} / ${steps.length}`
  const roadmapPercent =
    steps.length <= 0 ? 0 : ((effectiveIdx + 1) / steps.length) * 100
  const currentCue = step ? formatStepCue(step, topic, tasks) : ''

  const nextButtonDetail =
    nextStep !== undefined ? `Next · ${formatStepCue(nextStep, topic, tasks)}` : ''
  const nextTopicDetail = nextTopic
    ? `Next topic · ${nextTopic.title}`
    : ''

  let nextAriaLabel = ''
  if (nextStep !== undefined) nextAriaLabel = nextButtonDetail
  else if (nextTopic) nextAriaLabel = nextTopicDetail

  return (
    <section
      className={styles.root}
      id="panel-learn"
      role="region"
      aria-label="Lesson"
    >
      <div className={styles.flowShell}>
        <div className={styles.flowLeftRail}>
          {showTopicsTrigger ? (
            <button
              type="button"
              className={styles.topicsRail}
              aria-expanded={topicsMenuOpen}
              aria-controls={topicsControlsId}
              onClick={onOpenTopics}
            >
              <span className={styles.topicsRailIcon} aria-hidden>
                <PanelLeft size={18} strokeWidth={2.25} />
              </span>
              <span className={styles.topicsRailLabel}>Topics</span>
            </button>
          ) : null}
          <nav className={styles.flowBackWrap} aria-label="Previous lesson step">
            <button
              type="button"
              className={styles.navBack}
              disabled={effectiveIdx <= 0}
              onClick={() => onLessonStepIdxChange(Math.max(0, effectiveIdx - 1))}
            >
              <span className={styles.railGlyph} aria-hidden>
                ←
              </span>
              <span className={styles.railWord}>Back</span>
            </button>
          </nav>
        </div>

        <div className={styles.flowCenter}>
          <div className={styles.roadmap} aria-label="Lesson progress">
            <div className={styles.roadmapTop}>
              <p className={styles.roadmapMeta}>
                Step {stepLabelSummary}
                {currentCue ? <span className={styles.roadmapCue}> · {currentCue}</span> : null}
              </p>
              <span className={styles.roadmapPct} aria-hidden>
                {steps.length <= 0 ? '—' : `${Math.round(roadmapPercent)}%`}
              </span>
            </div>
            <div className={styles.roadmapTrack}>
              <div className={styles.roadmapFill} style={{ width: `${roadmapPercent}%` }} />
            </div>

            {topic.intro && step?.kind !== 'intro' ? (
              <div className={styles.topicOverviewShelf}>
                <button
                  type="button"
                  id={`${overviewRegionId}-toggle`}
                  className={styles.topicOverviewToggle}
                  aria-expanded={overviewOpen}
                  aria-controls={`${overviewRegionId}-panel`}
                  onClick={() => setOverviewOpen((o) => !o)}
                >
                  <span className={styles.topicOverviewToggleText}>
                    <span className={styles.topicOverviewToggleLabel}>Topic overview</span>
                    <span className={styles.topicOverviewTopicHint}>{topic.title}</span>
                  </span>
                  <ChevronDown
                    className={`${styles.topicOverviewChevron} ${overviewOpen ? styles.topicOverviewChevronOpen : ''}`}
                    aria-hidden
                    size={20}
                    strokeWidth={2.25}
                  />
                </button>
                {overviewOpen ? (
                  <div
                    id={`${overviewRegionId}-panel`}
                    role="region"
                    aria-labelledby={`${overviewRegionId}-toggle`}
                    className={styles.topicOverviewPanel}
                  >
                    <TopicIntroSections
                      intro={topic.intro}
                      topicTitles={topicTitles}
                      onOpenEarlierTopic={onJumpToEarlierTopic}
                    />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className={styles.head}>
            <p className={styles.overline}>
              {step?.kind === 'intro' ? `Course · ${topic.title}` : topic.title}
            </p>
            <p className={styles.desc}>{topic.description}</p>
          </div>

          {step?.kind === 'intro' && topic.intro ? (
            <aside className={styles.intro} aria-label={`About ${topic.title}`}>
              <TopicIntroSections
                intro={topic.intro}
                topicTitles={topicTitles}
                onOpenEarlierTopic={onJumpToEarlierTopic}
              />
            </aside>
          ) : null}

          {step?.kind === 'guided' ? (
            <GuidedExamplePanel topic={topic} exampleIndex={step.exampleIndex} />
          ) : null}

          {step?.kind === 'practice' && tasks[step.taskIndex] ? (
            <PracticeExercise
              key={tasks[step.taskIndex]!.id}
              task={tasks[step.taskIndex]!}
              editorId="playground-code-roadmap"
            />
          ) : null}

          {steps.length === 0 ? (
            <p className={styles.desc}>
              No guided walkthrough pieces are available for this topic yet.
            </p>
          ) : null}

          {nextStep === undefined && !nextTopic ? (
            <p className={styles.finale}>That’s the full track for this topic.</p>
          ) : null}
        </div>

        <nav className={styles.flowRightRail} aria-label="Next lesson step">
          {nextStep !== undefined ? (
            <button
              type="button"
              className={styles.navNext}
              title={nextButtonDetail}
              aria-label={nextAriaLabel}
              onClick={() => onLessonStepIdxChange(Math.min(maxIdx, effectiveIdx + 1))}
            >
              <span className={styles.railWord}>Next</span>
              <span className={styles.railGlyph} aria-hidden>
                →
              </span>
            </button>
          ) : nextTopic ? (
            <button
              type="button"
              className={styles.navNext}
              title={nextTopicDetail}
              aria-label={nextAriaLabel}
              onClick={() => nextTopic?.id != null && onAdvanceToTopicId?.(nextTopic.id)}
            >
              <span className={styles.railNextTopic}>
                <span className={styles.railWord}>Next</span>
                <span className={styles.railTopicHint}>topic</span>
              </span>
              <span className={styles.railGlyph} aria-hidden>
                →
              </span>
            </button>
          ) : null}
        </nav>
      </div>
    </section>
  )
}
