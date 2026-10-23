# Agent instructions (learning-project)

Short orientation for AI agents. Full map: **[README.md](README.md)** and **[docs/LEARNING_PATH.md](docs/LEARNING_PATH.md)**.

## What this repo is

A learning site for complete beginners. **One path** in [`hub/path.mjs`](hub/path.mjs): four levels (Beginner → Java → Backend → Pro), each with stages and numbered Read / Do / Check steps. Why that order and where each topic lives: [`docs/LEARNING_PATH.md`](docs/LEARNING_PATH.md). How every page is written: [`docs/STYLE.md`](docs/STYLE.md). Root holds meta only.

## Layout

| Area | Path | Stack / notes |
|------|------|----------------|
| Hub | `hub/` | Landing page. `path.mjs` = the one ordered step list; `progress.js` = localStorage progress, step bar, theme toggle; `sheet.js` = Markdown page renderer; `theme/` = the one design + animations; `scripts/` checks the path, builds and checks the site · run `make site`. **My tasks** on the landing is a short card per student; the full collapsible list is `students/<name>/tasks.html` (written by `catalog.mjs`) |
| Sheets | `sheets/` | Short Markdown pages, one idea each, picture first |
| Drills | `drills/javascript/` | Bun tests via root `Makefile` |
| Java hub | `tracks/java/` | Static HTML/CSS/JS |
| CS roadmap | `tracks/computer-science/` | Static + demos (`verify-demos.mjs`) |
| Architecture | `tracks/architecture/` | Small static explorer (not Spring course) |
| Spring Boot | `tracks/spring-boot/` | Markdown topics + `references/<area>/` |
| AIP-C01 | `tracks/certifications/aws-genai-pro/` | Static prep app |
| Projects | `projects/` | The ladder `01`–`12` + `extras/`; each: `README.md`, `step-by-step.md`, `starter/`, `solution/` |
| Cleaning | `programs/code-for-cleaning/` | Slash commands in `programs/code-for-cleaning/.cursor/commands/` |
| Students | `students/` | `<student>/<subject>/exercises/exercise-NN-…/task-NN-k-…/` (README, `tests.json`, `my-solution/`, `solution/`) · create with `/new-exercise` or `make new-exercise` · rule `students.mdc` |
| Learner memory | `docs/learner-memory/` | Long-term profile; skill `learner-memory` (recorded by `/done`) |

## Cursor

- **Rules:** `.cursor/rules/` — `monorepo.mdc` (always on), `structure.mdc` (folder/line limits), `students.mdc` (`students/**`).
- **Skills:** `.cursor/skills/caveman/` — optional compressed replies when invoked.
- **Commands:** `.cursor/commands/`, seven in total. Students: `/next` → `/stuck` → `/test` → `/check` → `/done` (where am I · stuck, red text or a new word · run the tests · is it right · finished). Student tasks have a `tests.json` each, run with `make test-task TASK=NN_k` (`students/scripts/test-task.mjs`). They work on any task (student task, project, drill, Code for Cleaning, path lesson), follow `.cursor/rules/tutor.mdc` and never write the solution. Teachers: `/new-exercise` (an exercise sheet for one student), `/new-content` (a lesson, sheet, project or drill in its one home). Extend these instead of adding new ones.

## Conventions

- Match existing patterns in the subtree you edit. New pages follow `docs/STYLE.md` (picture → idea → tiny example → try it → check) and use the theme tokens (`--lp-*`), never new hex colours.
- **Max 5 files** per directory (split into subfolders when adding content).
- **~400 lines** soft cap per file; split when practical.
- Do not commit `programs/code-for-cleaning/solutions/` or secrets (`.env`).
- Everything in the buckets is public on the website, student tasks and solutions included. Run `make site` after adding or moving content: it refreshes the landing page and fails on broken links.
- New learning content goes on the path by adding a step to `hub/path.mjs` in the right place. Never rename or reuse a step `id`.
