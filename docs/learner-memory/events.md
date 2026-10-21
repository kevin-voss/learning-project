# Event catalog (v1)

Every event is:

```json
{
  "type": "<name>",
  "at": "ISO-8601",
  "surface": "drills | tracks/cs | tracks/java | projects | cursor",
  "topicId": "optional-slug",
  "payload": {}
}
```

Handlers update `behavior.topics`, `struggles`, `questions`, or `feedback`, then append to `events[]`.

## Learning behavior

| type | When | payload |
|------|------|---------|
| `session.start` | Open app or track | `{ "surface" }` |
| `session.end` | Tab close / navigate away | `{ "durationMs" }` |
| `topic.visit` | Land on a topic or lesson | `{ "topicId" }` |
| `example.step` | Guided step change | `{ "exampleId", "stepIndex" }` |
| `playground.attempt` | Run tests | `{ "taskId", "passed": boolean, "attempt": number }` |
| `hint.used` | Hint button or slash `/hint` | `{ "taskId", "level": 1 \| 2 }` |
| `completion.mark` | Lesson or task done | `{ "completionKey" }` |

## Questions & feedback

| type | When | payload |
|------|------|---------|
| `question.asked` | Learner asks (chat, form, comment) | `{ "text", "questionId"? }` |
| `question.resolved` | Understood / marked done | `{ "questionId" }` |
| `feedback.submitted` | Rating or free text | `{ "rating"?: 1-5, "text"?: string }` |

## Aggregation rules

- `playground.attempt` with `passed: false` → increment `struggles[]` for `(topicId, playground_fail)`.
- Three+ fails on same `taskId` → bump `preferences.explanationDepth` toward `deep`.
- `feedback.submitted` with `rating <= 2` → append `feedback[]` and surface in agent hints.
- `question.asked` → append `questions[]` (truncate oldest if over cap).

## Cursor / agent-only

| type | When | payload |
|------|------|---------|
| `agent.observation` | Tutor notices pattern | `{ "text", "confidence": "low" \| "medium" \| "high" }` |
| `agent.plan` | Suggested next step | `{ "text", "links": string[] }` |

Use `agent.*` sparingly; prefer learner-origin events when possible.
