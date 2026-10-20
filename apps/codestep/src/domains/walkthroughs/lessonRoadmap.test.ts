import { describe, expect, it } from 'vitest'

import { buildLessonSteps, formatStepCue } from './lessonRoadmap'
import type { Topic } from '@/types/curriculum'
import type { PlaygroundTask } from '@/types/playground'

function sampleConsoleTask(id: string, topicId: string, title: string): PlaygroundTask {
  return {
    id,
    topicId,
    title,
    description: '',
    starterCode: '',
    hints: [],
    mode: 'console',
    expected: { lines: [] },
  }
}

const minimalTopic = (overrides?: Partial<Topic>): Topic => ({
  id: 't1',
  title: 'Test',
  description: 'd',
  examples: [
    { name: 'Ex A', lines: [], steps: [] },
    { name: 'Ex B', lines: [], steps: [] },
  ],
  ...overrides,
})

describe('buildLessonSteps', () => {
  it('interleaves intro, guided, and aligned practice tasks', () => {
    const topic = minimalTopic({
      intro: { whatItIs: '', whyItMatters: '', realWorldExamples: [] },
    })
    const tasks: PlaygroundTask[] = [sampleConsoleTask('p0', 't1', 'P0')]
    const steps = buildLessonSteps(topic, tasks)
    expect(steps.map((s) => s.kind)).toEqual([
      'intro',
      'guided',
      'practice',
      'guided',
    ])
  })
})

describe('formatStepCue', () => {
  it('labels intro and practice from task title', () => {
    const topic = minimalTopic({ examples: [] })
    const tasks: PlaygroundTask[] = [sampleConsoleTask('x', 't1', 'Do thing')]
    expect(formatStepCue({ kind: 'intro' }, topic, tasks)).toBe('Topic overview')
    expect(
      formatStepCue({ kind: 'practice', taskIndex: 0, afterExampleIndex: 0 }, topic, tasks),
    ).toBe('Practice · Do thing')
  })
})
