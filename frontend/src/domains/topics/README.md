## Topics domain

Everything that defines **what the course teaches**: assembled curriculum, per-topic copy, legacy JSON merge, and **practice tasks** keyed by `topicId`.

| Path | Role |
|------|------|
| `curriculum.ts` | Public `curriculum` array + `topicById` |
| `curriculumData.ts` | Ordered `RawTopic[]` fed into the normalizer |
| `normalizeCurriculum.ts` | Raw → `Topic` (examples, steps, segment focus) |
| `rawTopicTypes.ts` | JSON-ish shapes before normalization |
| `guidedExampleLineBuilders.ts` | Segmented `CodeLine` layouts for specific walkthroughs |
| `syntheticTopics.ts` & `content/` | Authored topic payloads |
| `examples/_topics_raw.json` | Legacy guided traces still merged for some examples |
| `playground/` | `playgroundTasksForTopic` and task definitions per topic |

Dependencies: imports **walkthroughs** (`guidedIfChain`) when expanding filler steps around dead `if` branches. UI and workers depend on this domain for navigation and task lookup.
