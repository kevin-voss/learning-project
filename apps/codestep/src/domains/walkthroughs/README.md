## Walkthroughs domain

**Execution and stepping**: lesson ordering (intro → guided → practice), playback controls, worker sandbox orchestration, assertion helpers, and **replay step construction** from learner runs.

| Module | Role |
|--------|------|
| `lessonRoadmap.ts` | `buildLessonSteps`, step labels for the UI |
| `playback.ts` | Step forward/back for editors |
| `playgroundRunner.ts` | Main-thread worker spawn + timeout |
| `playgroundSteps.ts`, `playgroundSourceLines.ts` | Build `ExecutionStep[]` from run output |
| `playgroundInstrument.ts`, `playgroundBranchFilter.ts` | Log instrumentation + branch-aware line filter |
| `guidedIfChain.ts` | Omit filler steps on dead branches (also used when **normalizing** curriculum) |
| `assertions.ts` | Expectation checks inside the worker |
| `sound.ts` | Optional audio cues during playback |

This domain does **not** own topic copy or syntax highlighting; it consumes **topics** for task metadata and **line-highlights** only indirectly (segment ids must stay aligned with `codeStringToCodeLines`).
