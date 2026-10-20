# Integrations by surface

## CodeStep (`apps/codestep/`)

| Hook | Event |
|------|--------|
| Topic route change | `topic.visit` |
| Playback step | `example.step` |
| Playground run | `playground.attempt` |
| Future settings panel | `feedback.submitted` |

Import from `src/lib/learnerMemory.ts`. Call `adaptationHints()` when rendering explanations (deeper copy when `explanationDepth === "deep"`).

## Drills (`drills/javascript/`)

Makefile tests do not run in browser — optional **post-run journal**:

1. After `make variables`, learner runs a one-line reflect command (Cursor `/reflect`) or appends `completion.mark` via a small Bun script later.

For now: Cursor skill records drill outcomes when the learner reports pass/fail in chat.

## Static tracks

| Track | Today | Target |
|-------|--------|--------|
| CS roadmap | `dsCompleted` in localStorage | Also emit `completion.mark` into unified profile via `lib/browser.js` |
| AIP-C01 | `aip-c01:v1:progress` | Same — dual-write during transition |
| Java hub | mostly none | `topic.visit` on lesson change |

Include `browser.js` only when you add visit/completion hooks; do not fork schema.

## Projects (`projects/`)

- Milestones in roadmap → `completion.mark` with keys `projects:01-weather-dashboard:phase-3`.
- Learner questions during build → `question.asked` via Cursor `/reflect` or future project journal file.

## Programs (`programs/code-for-cleaning/`)

- `progress.md` stays the **human** round summary for the deal.
- Copy struggle patterns into learner profile with `agent.observation` after each round (skill), not by committing solutions.

## Cursor agents

1. Read personal store `learner-profile.json` (see skill).
2. Before long explanations, print mental model from `adaptationHints()`.
3. After session, merge new `question.asked` / `feedback.submitted` / `agent.observation` events.
4. Never store task **solutions** in the profile (Cleaning program rule still applies).

## Export / backup

```bash
# From repo root — writes merged profile to .learner/profile.json
node docs/learner-memory/scripts/export-merge.mjs
```

Commit **never** includes `.learner/` (gitignored).
