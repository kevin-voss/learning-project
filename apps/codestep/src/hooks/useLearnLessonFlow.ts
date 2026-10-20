import { useEffect, useMemo, useRef, useState } from 'react'

import { playgroundTasksForTopic } from '@/domains/topics/playground'
import { buildLessonSteps, formatStepCue } from '@/domains/walkthroughs/lessonRoadmap'
import type { Topic } from '@/types/curriculum'

import { clampLessonStep } from '@/lib/clampLessonStep'

export function useLearnLessonFlow(
  topic: Topic,
  lessonStepIdx: number,
  nextTopic?: { id: string; title: string } | null,
) {
  const tasks = useMemo(() => playgroundTasksForTopic(topic.id), [topic.id])
  const steps = useMemo(() => buildLessonSteps(topic, tasks), [topic, tasks])
  const maxIdx = Math.max(0, steps.length - 1)
  const effectiveIdx = clampLessonStep(lessonStepIdx, maxIdx)
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
  const nextTopicDetail = nextTopic ? `Next topic · ${nextTopic.title}` : ''

  let nextAriaLabel = ''
  if (nextStep !== undefined) nextAriaLabel = nextButtonDetail
  else if (nextTopic) nextAriaLabel = nextTopicDetail

  return {
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
  }
}
