# Phase 05 — Learner memory (feedback & behavior)

**Prerequisites:** Phases [`01.md`](01.md)–[`04.md`](04.md) (platform + content).  
**Spec:** [`docs/learner-memory/README.md`](../learner-memory/README.md).

---

## Objectives

1. **Remember** questions, feedback, failures, and time-on-topic across sessions (local-first).
2. **Adapt** explanations (depth, pace) from derived hints — not from re-copying the whole curriculum into chat.
3. **Share** one profile shape across CodeStep, static tracks, drills (via export), and Cursor tutoring.

---

## Tasks

### 5.1 Schema & library

- [x] Document v1 schema and event catalog (`docs/learner-memory/`).
- [x] `apps/codestep/src/lib/learnerMemory.ts` with `track`, `adaptationHints`, `exportProfileJson`.
- [x] Portable `docs/learner-memory/lib/browser.js` for static sites.

### 5.2 CodeStep instrumentation

- [x] `topic.visit` on topic change (`useCurriculumLessonState`).
- [x] `playground.attempt` on task run complete (`PracticeExercise`).
- [ ] Guided example: `example.step` on step change (optional).
- [ ] In-app feedback control → `feedback.submitted`.
- [ ] Use `adaptationHints()` in `ExplanationPanel` copy depth (optional).

### 5.3 Static tracks

- [ ] CS roadmap: dual-write completions into unified profile (`LearnerMemory.track`).
- [ ] AIP-C01: map chapter done → `completion.mark` (keep existing keys during transition).

### 5.4 Cursor & export

- [x] Skill `.cursor/skills/learner-memory/` for personal store `learner-profile.json`.
- [x] Command `/reflect` to capture session Q&A and feedback.
- [ ] Periodic export reminder in hub or README.

### 5.5 Privacy

- [x] `.learner/` gitignored; no solutions in profile (Cleaning program rule stands).

---

## Acceptance

- After 3 failed playground runs on one topic, `adaptationHints().explanationDepth === "deep"`.
- Profile survives reload (localStorage key `learning-project:learner-memory:v1`).
- Agent with skill reads weak topics before teaching a new lesson.
