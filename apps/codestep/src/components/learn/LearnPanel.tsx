import { useId, useMemo } from 'react'
import { ChevronDown, PanelLeft } from 'lucide-react'

import { GuidedExamplePanel } from '@/components/learn/GuidedExamplePanel'
import { TopicIntroSections } from '@/components/learn/TopicIntroSections'
import { PracticeExercise } from '@/components/practice/PracticeExercise'
import type { Topic } from '@/types/curriculum'

import { useLearnLessonFlow } from '@/hooks/useLearnLessonFlow'

import styles from './LearnPanel.module.css'

type Props = {
  topic: Topic
  lessonStepIdx: number
  onLessonStepIdxChange: (idx: number) => void
  nextTopic?: { id: string; title: string } | null
  onAdvanceToTopicId?: (id: string) => void
  showTopicsTrigger?: boolean
  onOpenTopics?: () => void
  topicsMenuOpen?: boolean
  topicsControlsId?: string
  topicCatalog?: { id: string; title: string }[]
  onJumpToEarlierTopic?: (topicId: string) => void
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

  const {
    tasks,
    steps,
    maxIdx,
    effectiveIdx,
    step,
    nextStep,
    overviewOpen,
    setOverviewOpen,
    stepLabelSummary,
    roadmapPercent,
    currentCue,
    nextButtonDetail,
    nextTopicDetail,
    nextAriaLabel,
  } = useLearnLessonFlow(topic, lessonStepIdx, nextTopic)

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
