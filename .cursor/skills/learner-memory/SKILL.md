---
name: learner-memory
description: >-
  Read and update long-term learner profile from feedback, questions, and
  behavior. Use when tutoring in this repo, after practice sessions, when the
  user asks to remember struggles, or when adapting explanation depth/pace.
---

# Learner memory (tutoring)

Canonical spec: [docs/learner-memory/README.md](../../docs/learner-memory/README.md).

## Where the profile lives

1. **Browser (static tracks):** `localStorage["learning-project:learner-memory:v1"]`
2. **Repo export (gitignored):** `.learner/profile.json` — merge via `node docs/learner-memory/scripts/export-merge.mjs`
3. **Cursor personal store (long-term tutoring):**  
   `/Users/kevin.voss/Library/Application Support/Cursor/AgentStores/cursor_agent_stores/u170701032/files/learner-profile.json`  
   If missing, create it from schema v1 in `docs/learner-memory/schema-v1.md`.

When the user says **"my user store"** or **"personal store"**, use that path.

## Before teaching

1. Read `learner-profile.json` from the personal store (or ask the user to paste export).
2. Note `preferences.explanationDepth`, `preferences.pace`, top `struggles`, and unresolved `questions`.
3. Start with a one-sentence plan tied to weak topics (do not repeat entire lessons).

## After a session (required when user gave feedback or asked questions)

Append events by merging into the profile:

| User did | Event type | payload |
|----------|------------|---------|
| Asked a question | `question.asked` | `{ "text": "..." }` + `topicId` if known |
| Said something was too fast/hard | `feedback.submitted` | `{ "rating": 1-5, "text": "..." }` |
| Failed tasks repeatedly | `playground.attempt` or `agent.observation` | `{ "passed": false }` / `{ "text", "confidence" }` |
| Finished a milestone | `completion.mark` | `{ "completionKey": "projects:01:phase-2" }` |

Recompute mentally:

- 3+ fails on a topic → prefer **deep** explanations.
- Low ratings or "too fast" → **slow** pace, smaller steps.

Write the updated JSON back to `learner-profile.json` in the personal store.

## Do not store

- Task solutions (especially `programs/code-for-cleaning/`)
- Secrets, API keys, passwords
- Verbatim copies of entire curriculum chapters

## Browser export

- User can export from devtools: `localStorage.getItem("learning-project:learner-memory:v1")` → save as file → `export-merge.mjs`

## Invoke

User may say: "remember that I struggle with loops", "/reflect", or "use my learner profile". Load skill behavior immediately.
