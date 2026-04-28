import { useCallback, useEffect, useState } from 'react'

import { AppShell } from '@/components/layout/AppShell'
import { curriculum } from '@/data/curriculum'
import { playgroundTasksForTopic } from '@/data/playground'
import { buildLessonSteps } from '@/engine/lessonRoadmap'
import {
  loadLastTopicId,
  loadLessonStepIdx,
  saveLastTopicId,
  saveLessonStepIdx,
} from '@/hooks/codestepSettings'

function clampLessonStep(load: number | undefined, maxIdx: number): number {
  if (maxIdx < 0) return 0
  const raw =
    load !== undefined && load >= 0 && load <= maxIdx ? load : 0
  return Math.min(Math.max(0, Math.floor(raw)), maxIdx)
}

const firstTopicId = curriculum[0]?.id ?? 'variables'

export default function App() {
  const [topicId, setTopicId] = useState(() => loadLastTopicId(firstTopicId))
  const selectedTopic =
    curriculum.find((entry) => entry.id === topicId) ?? curriculum[0]!

  const [lessonStepIdx, setLessonStepIdx] = useState(() => {
    const topic =
      curriculum.find((entry) => entry.id === loadLastTopicId(firstTopicId)) ??
      curriculum[0]!
    const tasks = playgroundTasksForTopic(topic.id)
    const steps = buildLessonSteps(topic, tasks)
    const max = Math.max(0, steps.length - 1)
    return clampLessonStep(loadLessonStepIdx(topic.id), max)
  })

  useEffect(() => {
    saveLastTopicId(topicId)
  }, [topicId])

  /** When the active topic changes, restore saved lesson step */
  useEffect(() => {
    const tasks = playgroundTasksForTopic(topicId)
    const topic =
      curriculum.find((entry) => entry.id === topicId) ?? curriculum[0]!
    const steps = buildLessonSteps(topic, tasks)
    const maxLesson = Math.max(0, steps.length - 1)
    setLessonStepIdx(clampLessonStep(loadLessonStepIdx(topicId), maxLesson))
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

  return (
    <AppShell
      selectedTopic={selectedTopic}
      onTopicIdChange={setTopicId}
      lessonStepIdx={lessonStepIdx}
      onLessonStepIdxChange={setLessonStepIdx}
      navigateTopicOverview={navigateTopicOverview}
      navigateLearnStep={navigateLearnStep}
    />
  )
}
