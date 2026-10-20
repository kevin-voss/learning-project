import { ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { playgroundTasksForTopic } from '@/domains/topics/playground'
import { buildLessonSteps, formatStepCue, type LessonStep } from '@/domains/walkthroughs/lessonRoadmap'
import type { Topic } from '@/types/curriculum'

import styles from './TopicNav.module.css'

type Props = {
  topics: Topic[]
  selectedId: string
  learnStepIdxForSelected: number
  navigateTopicOverview: (topicId: string) => void
  navigateLearnStep: (topicId: string, stepIndex: number) => void
  layout?: 'default' | 'stack'
  showSectionLabel?: boolean
  onAfterNavigate?: () => void
}

function stepKindClasses(step: LessonStep): string {
  switch (step.kind) {
    case 'intro':
      return styles.subKindIntro
    case 'guided':
      return styles.subKindGuided
    case 'practice':
      return styles.subKindPractice
  }
}

export function TopicNav({
  topics,
  selectedId,
  learnStepIdxForSelected,
  navigateTopicOverview,
  navigateLearnStep,
  layout = 'default',
  showSectionLabel = true,
  onAfterNavigate,
}: Props) {
  const [manualExpanded, setManualExpanded] = useState<Partial<Record<string, boolean>>>({})

  const topicIsOpen = useCallback(
    (topicId: string) => {
      const o = manualExpanded[topicId]
      if (o === true || o === false) return o
      return topicId === selectedId
    },
    [manualExpanded, selectedId],
  )

  useEffect(() => {
    queueMicrotask(() =>
      setManualExpanded((prev) => ({ ...prev, [selectedId]: true })),
    )
  }, [selectedId])

  const toggleExpanded = useCallback((topicId: string) => {
    setManualExpanded((prev) => {
      const open =
        prev[topicId] === true || prev[topicId] === false
          ? prev[topicId]!
          : topicId === selectedId
      return { ...prev, [topicId]: !open }
    })
  }, [selectedId])

  const rootClass = layout === 'stack' ? styles.stack : undefined

  const run = useCallback(
    (fn: () => void) => {
      fn()
      onAfterNavigate?.()
    },
    [onAfterNavigate],
  )

  const learnRows = useMemo(() => {
    const map = new Map<
      string,
      {
        steps: ReturnType<typeof buildLessonSteps>
        tasks: ReturnType<typeof playgroundTasksForTopic>
      }
    >()
    for (const topic of topics) {
      const tasks = playgroundTasksForTopic(topic.id)
      map.set(topic.id, { steps: buildLessonSteps(topic, tasks), tasks })
    }
    return map
  }, [topics])

  return (
    <div className={rootClass}>
      {showSectionLabel ? <p className={styles.sectionLabel}>Topics</p> : null}
      <nav aria-label="Course topics" className={styles.nav}>
        <ul className={styles.list}>
          {topics.map((topic) => {
            const isActive = topic.id === selectedId
            const isOpen = topicIsOpen(topic.id)
            const bucket = learnRows.get(topic.id)
            const stepsList = bucket?.steps ?? []
            const tasksForTopic = bucket?.tasks ?? []
            const learnCount = topic.examples.length
            const practiceCount = tasksForTopic.length

            return (
              <li key={topic.id} className={styles.topicBlock}>
                <div className={styles.topicRow}>
                  <button
                    type="button"
                    className={styles.expandToggle}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? `Collapse ${topic.title}` : `Expand ${topic.title}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpanded(topic.id)
                    }}
                  >
                    <ChevronRight
                      size={16}
                      strokeWidth={2.25}
                      className={isOpen ? `${styles.expandIcon} ${styles.expandIconOpen}` : styles.expandIcon}
                      aria-hidden
                    />
                  </button>
                  <button
                    type="button"
                    className={`${styles.link} ${isActive ? styles.active : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    title="Open topic at the first roadmap step (overview)"
                    onClick={() => run(() => navigateTopicOverview(topic.id))}
                  >
                    <span className={styles.linkTitle}>{topic.title}</span>
                    {!isOpen ? (
                      <span className={styles.counts}>
                        <span className={styles.countChip} title="Guided walkthrough examples">
                          {learnCount} walkthrough
                        </span>
                        <span className={styles.countChip} title="Playground exercises in this track">
                          {practiceCount} practice
                        </span>
                      </span>
                    ) : (
                      <span className={styles.countsHint}>
                        {stepsList.length || 0} step{stepsList.length === 1 ? '' : 's'}
                      </span>
                    )}
                  </button>
                </div>

                {isOpen ? (
                  <ul
                    className={styles.sublist}
                    aria-label={`${topic.title}, lesson steps`}
                  >
                    {stepsList.map((step, idx) => {
                      const cue = formatStepCue(step, topic, tasksForTopic)
                      const activeSub = isActive && idx === learnStepIdxForSelected
                      const kindClass = stepKindClasses(step)
                      return (
                        <li key={`${topic.id}-step-${idx}`}>
                          <button
                            type="button"
                            className={`${styles.subLink} ${kindClass} ${activeSub ? styles.subActive : ''}`}
                            aria-current={activeSub ? 'true' : undefined}
                            onClick={() =>
                              run(() => navigateLearnStep(topic.id, idx))
                            }
                          >
                            {cue}
                          </button>
                        </li>
                      )
                    })}
                    {stepsList.length === 0 ? (
                      <li className={styles.subEmpty}>No lesson steps yet</li>
                    ) : null}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
