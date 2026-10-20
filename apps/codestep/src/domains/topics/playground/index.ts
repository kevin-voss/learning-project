import type { PlaygroundTask } from '@/types/playground'

import { arraysPlaygroundTasks } from './arrays'
import { asyncPlaygroundTasks } from './async'
import { classesPlaygroundTasks } from './classes'
import { conditionalsPlaygroundTasks } from './conditionals'
import { domPlaygroundTasks } from './dom'
import { errorsPlaygroundTasks } from './errors'
import { eventsPlaygroundTasks } from './events'
import { functionsPlaygroundTasks } from './functions'
import { loopsPlaygroundTasks } from './loops'
import { modernJsPlaygroundTasks } from './modernJs'
import { modulesPlaygroundTasks } from './modules'
import { objectsPlaygroundTasks } from './objects'
import { operatorsPlaygroundTasks } from './operators'
import { variablesPlaygroundTasks } from './variables'

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
