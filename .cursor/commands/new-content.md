# /new-content

For teachers: add a lesson, sheet, project or drill in the right place, without copying what already exists. (A personal exercise sheet for one student is `/new-exercise` instead.)

## 1. Find its home

1. Look it up in the "One home per topic" table of [`docs/LEARNING_PATH.md`](../../docs/LEARNING_PATH.md) and in [`hub/path.mjs`](../../hub/path.mjs). **If the topic already has a home, add to that page or link to it. Never write a second copy.**
2. Otherwise pick the bucket:

| It is … | Goes in |
|---------|---------|
| a short page, one idea | `sheets/<topic>/` |
| a build that reuses the last project and adds one skill | `projects/<NN>-<name>/` (`README.md`, `step-by-step.md`, `starter/`, `solution/`) |
| tested JavaScript practice | `drills/javascript/<topic>/` |
| a lesson inside a big course | `tracks/<track>/` (CS, Java, Spring Boot, architecture, AI) |
| background for teachers | `docs/` |

## 2. Write it

Follow [`docs/STYLE.md`](../../docs/STYLE.md): picture → one idea → tiny example → try it → check, English, short sentences, `> [!PICTURE]` / `[!TRY]` / `[!CHECK]` boxes, colours only from the theme. Max 5 files per folder, about 400 lines per file. A scene from `hub/theme/README.md` (`<div data-anim="…">`) helps when something moves.

## 3. Put it on the path

If students should do it, add a step to `hub/path.mjs` in the right stage: a new, never-used `id`, `type` read / do / check, `title`, `href`, `time`. Never rename or reuse an id; a step that leaves the path goes into `RETIRED`.

## 4. Verify

`make site` (path check, build, 0 broken links). Changed CS lessons: `node tracks/computer-science/scripts/verify-demos.mjs`. Changed the AI guide: `node tracks/ai/scripts/verify.mjs`. Project solutions must compile and run.

Reply with three bullets: where it went, what it links to, check results.
