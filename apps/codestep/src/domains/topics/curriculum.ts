import { buildCurriculum } from './normalizeCurriculum'

import type { Topic } from '@/types/curriculum'

import { CODSTEP_RAW_TOPICS } from './curriculumData'

export const curriculum: Topic[] = buildCurriculum(CODSTEP_RAW_TOPICS)

export function topicById(id: string): Topic | undefined {
  return curriculum.find((t) => t.id === id)
}
