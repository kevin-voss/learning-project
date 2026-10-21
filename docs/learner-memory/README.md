# Learner memory (long-term, feedback-driven)

Static tracks, drills, and Cursor tutoring share one **learner profile**: what you struggled with, asked about, rated, and how you behaved (time, retries, hints). The profile **improves over time** from events — not from duplicating lesson text in chat.

## Principles

1. **Events in, insights out** — Append small facts (`question.asked`, `task.failed`, `feedback.submitted`). Summaries (`struggles`, `preferences`) are derived and safe to rebuild.
2. **One learner, many surfaces** — Same schema on device (`localStorage`) and in optional exports (`.learner/profile.json`, Cursor personal store).
3. **Local-first** — No server required. Sync/export is explicit (file, paste, agent store).
4. **Actionable for tutors** — Agents read `adaptationHints()` (pace, detail, weak topics) before explaining.

## Docs in this folder

| File | Purpose |
|------|---------|
| [schema-v1.md](./schema-v1.md) | JSON shape and field rules |
| [events.md](./events.md) | Event types and when to emit them |
| [integrations.md](./integrations.md) | Per-surface wiring (drills, tracks, projects, Cursor) |

## Quick start (developers)

- **Static mini-sites:** copy or import [`lib/browser.js`](./lib/browser.js) (same storage key and API).
- **Cursor:** skill `.cursor/skills/learner-memory/SKILL.md` (in your clone; hidden folders are not on the website) — update personal `learner-profile.json` after sessions.
- **Export for backup:** `node docs/learner-memory/scripts/export-merge.mjs` (merge event log into profile file).

## Storage keys

| Location | Key / path |
|----------|------------|
| Browser | `localStorage["learning-project:learner-memory:v1"]` |
| Repo export (gitignored) | `.learner/profile.json` |
| Cursor personal store | `learner-profile.json` (see skill) |

## Roadmap

- UI: in-app “What should I review?” driven by `struggles` (not built yet)
- Optional merge of CS / AIP progress into unified `completions` map
