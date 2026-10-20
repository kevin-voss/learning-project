import { useCallback, useEffect, useState } from 'react'

import { curriculum } from '@/domains/topics/curriculum'
import { playgroundTasksForTopic } from '@/domains/topics/playground'
import { buildLessonSteps } from '@/domains/walkthroughs/lessonRoadmap'
import {
  loadLastTopicId,
  loadLessonStepIdx,
  saveLastTopicId,
  saveLessonStepIdx,
} from '@/hooks/codestepSettings'
import { clampLessonStep } from '@/lib/clampLessonStep'

const firstTopicId = curriculum[0]?.id ?? 'variables'

export function useCurriculumLessonState() {
  const [topicId, setTopicId] = useState(() => loadLastTopicId(firstTopicId))
  const selectedTopic = curriculum.find((entry) => entry.id === topicId) ?? curriculum[0]!

  const [lessonStepIdx, setLessonStepIdx] = useState(() => {
    const topic =
      curriculum.find((entry) => entry.id === loadLastTopicId(firstTopicId)) ?? curriculum[0]!
    const tasks = playgroundTasksForTopic(topic.id)
    const steps = buildLessonSteps(topic, tasks)
    const max = Math.max(0, steps.length - 1)
    return clampLessonStep(loadLessonStepIdx(topic.id), max)
  })

  useEffect(() => {
    saveLastTopicId(topicId)
  }, [topicId])

  useEffect(() => {
    const tasks = playgroundTasksForTopic(topicId)
    const topic = curriculum.find((entry) => entry.id === topicId) ?? curriculum[0]!
    const steps = buildLessonSteps(topic, tasks)
    const maxLesson = Math.max(0, steps.length - 1)
    const next = clampLessonStep(loadLessonStepIdx(topicId), maxLesson)
    queueMicrotask(() => setLessonStepIdx(next))
  }, [topicId])

  useEffect(() => {
    saveLessonStepIdx(topicId, lessonStepIdx)
  }, [topicId, lessonStepIdx])

  const navigateTopicOverview = useCallback((id: string) => {
    const tasks = playgroundTasksForTopic(id)
    const topic = curriculum.find((t) => t.id === id) ?? curriculum[0]!
    const steps = buildLessonSteps(topic, tasks)
    const maxLesson = Math.max(0, steps.length - 1)
    saveLessonStepIdx(id, 0)
    setLessonStepIdx(clampLessonStep(0, maxLesson))
    setTopicId(id)
  }, [])

  const navigateLearnStep = useCallback((id: string, stepIndex: number) => {
    const tasks = playgroundTasksForTopic(id)
    const topic = curriculum.find((t) => t.id === id) ?? curriculum[0]!
    const steps = buildLessonSteps(topic, tasks)
    const maxLesson = Math.max(0, steps.length - 1)
    const idx = clampLessonStep(stepIndex, maxLesson)
    saveLessonStepIdx(id, idx)
    setLessonStepIdx(idx)
    setTopicId(id)
  }, [])

  return {
    selectedTopic,
    topicId,
    setTopicId,
    lessonStepIdx,
    setLessonStepIdx,
    navigateTopicOverview,
    navigateLearnStep,
  }
}
