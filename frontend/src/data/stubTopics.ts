import { curriculum } from '@/data/curriculum'

/** @deprecated Prefer `curriculum` from `@/data/curriculum`. Kept for Phase 01 doc paths. */
export type StubTopic = {
  id: string
  title: string
}

export const STUB_TOPICS: StubTopic[] = curriculum.map(({ id, title }) => ({
  id,
  title,
}))
