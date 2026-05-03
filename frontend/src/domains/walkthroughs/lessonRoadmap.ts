import type { Topic } from '@/types/curriculum'
import type { PlaygroundTask } from '@/types/playground'

export type LessonStep =
  | { kind: 'intro' }
  | { kind: 'guided'; exampleIndex: number }
  | {
      kind: 'practice'
      taskIndex: number
      /** Present when practice follows that guided example; absent for extra-only tasks */
      afterExampleIndex: number | undefined
    }

/** Linear path: optional intro → (example i → practice i when a task exists)* → remaining tasks */
export function buildLessonSteps(topic: Topic, tasks: readonly PlaygroundTask[]): LessonStep[] {
  const steps: LessonStep[] = []
  if (topic.intro) steps.push({ kind: 'intro' })
  const nEx = topic.examples.length
  for (let i = 0; i < nEx; i++) {
    steps.push({ kind: 'guided', exampleIndex: i })
    const t = tasks[i]
    if (t)
      steps.push({
        kind: 'practice',
        taskIndex: i,
        afterExampleIndex: i,
      })
  }
  for (let j = nEx; j < tasks.length; j++) {
    steps.push({
      kind: 'practice',
      taskIndex: j,
      afterExampleIndex: undefined,
    })
  }
  return steps
}

export function formatStepCue(
  step: LessonStep,
  topic: Topic,
  tasks: readonly PlaygroundTask[],
): string {
  switch (step.kind) {
    case 'intro':
      return 'Topic overview'
    case 'guided': {
      const ex = topic.examples[step.exampleIndex]
      return ex ? `Walkthrough · ${ex.name}` : 'Walkthrough'
    }
    case 'practice': {
      const tt = tasks[step.taskIndex]
      const label = tt?.title ?? 'Practice'
      return `Practice · ${label}`
    }
  }
}
