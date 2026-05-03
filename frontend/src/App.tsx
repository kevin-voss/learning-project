import { AppShell } from '@/components/layout/AppShell'
import { useCurriculumLessonState } from '@/hooks/useCurriculumLessonState'

export default function App() {
  const {
    selectedTopic,
    lessonStepIdx,
    setLessonStepIdx,
    navigateTopicOverview,
    navigateLearnStep,
    setTopicId,
  } = useCurriculumLessonState()

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
