import type { PlaygroundTask } from '@/types/playground'

import { arraysPlaygroundTasks } from '@/data/playground/arrays'
import { asyncPlaygroundTasks } from '@/data/playground/async'
import { classesPlaygroundTasks } from '@/data/playground/classes'
import { conditionalsPlaygroundTasks } from '@/data/playground/conditionals'
import { domPlaygroundTasks } from '@/data/playground/dom'
import { errorsPlaygroundTasks } from '@/data/playground/errors'
import { eventsPlaygroundTasks } from '@/data/playground/events'
import { functionsPlaygroundTasks } from '@/data/playground/functions'
import { loopsPlaygroundTasks } from '@/data/playground/loops'
import { modernJsPlaygroundTasks } from '@/data/playground/modernJs'
import { modulesPlaygroundTasks } from '@/data/playground/modules'
import { objectsPlaygroundTasks } from '@/data/playground/objects'
import { operatorsPlaygroundTasks } from '@/data/playground/operators'
import { variablesPlaygroundTasks } from '@/data/playground/variables'

const ALL: PlaygroundTask[] = [
  ...variablesPlaygroundTasks,
  ...operatorsPlaygroundTasks,
  ...conditionalsPlaygroundTasks,
  ...functionsPlaygroundTasks,
  ...arraysPlaygroundTasks,
  ...objectsPlaygroundTasks,
  ...loopsPlaygroundTasks,
  ...domPlaygroundTasks,
  ...eventsPlaygroundTasks,
  ...modernJsPlaygroundTasks,
  ...asyncPlaygroundTasks,
  ...errorsPlaygroundTasks,
  ...modulesPlaygroundTasks,
  ...classesPlaygroundTasks,
]

const BY_TOPIC = new Map<string, PlaygroundTask[]>()
for (const t of ALL) {
  const list = BY_TOPIC.get(t.topicId) ?? []
  list.push(t)
  BY_TOPIC.set(t.topicId, list)
}

export function playgroundTasksForTopic(topicId: string): PlaygroundTask[] {
  return BY_TOPIC.get(topicId) ?? []
}

export function playgroundTaskById(id: string): PlaygroundTask | undefined {
  return ALL.find((t) => t.id === id)
}

export const allPlaygroundTasks = ALL
