# Agent instructions (learning-project)

Short orientation for AI agents. Full map: **[README.md](README.md)** and **[docs/LEARNING_PATH.md](docs/LEARNING_PATH.md)**.

## What this repo is

A monorepo of **drills**, **tracks**, **projects** (sheet → small build), and **programs**. **One spine:** [`docs/LEARNING_PATH.md`](docs/LEARNING_PATH.md): CS → web basics → **Java Layers A–F** (foundation A–D, deeper F) → infra/architecture/Spring. Root holds meta + `hub/` only.

## Layout

| Area | Path | Stack / notes |
|------|------|----------------|
| Hub | `hub/` | Landing page. `path.mjs` = the one ordered step list students follow; `progress.js` = localStorage progress + step bar; `scripts/` builds and checks the site · run `make site` |
| Drills | `drills/javascript/` | Bun tests via root `Makefile` |
| Java hub | `tracks/java/` | Static HTML/CSS/JS |
| CS roadmap | `tracks/computer-science/` | Static + demos (`verify-demos.mjs`) |
| Architecture | `tracks/architecture/` | Small static explorer (not Spring course) |
| Spring Boot | `tracks/spring-boot/` | Markdown topics + `references/<area>/` |
| AIP-C01 | `tracks/certifications/aws-genai-pro/` | Static prep app |
| Projects | `projects/` | Four brief-only curricula |
| Cleaning | `programs/code-for-cleaning/` | Slash commands in `programs/code-for-cleaning/.cursor/commands/` |
| Students | `students/` | `<student>/<subject>/uebungen/uebung-NN-…/aufgabe-NN-k-…/` (README, `meine-loesung/`, `musterloesung/`) · create with `/new-uebung` or `make new-uebung` · rule `students.mdc` |
| Learner memory | `docs/learner-memory/` | Long-term profile; skill `learner-memory`, `/reflect` |

## Cursor

- **Rules:** `.cursor/rules/` — `monorepo.mdc` (always on), `structure.mdc` (folder/line limits), `students.mdc` (`students/**`).
- **Skills:** `.cursor/skills/caveman/` — optional compressed replies when invoked.
- **Commands:** `.cursor/commands/` — student tutor commands for the current Aufgabe (`/task`, `/hint`, `/explain`, `/error`, `/check`, `/review`, `/done`; they never write the solution), teacher commands (`/new-uebung`, `/path`, `/learning-path`, `/reflect`). The cleaning program keeps its own commands under `programs/code-for-cleaning/.cursor/commands/`.

## Conventions

- Match existing patterns in the subtree you edit.
- **Max 5 files** per directory (split into subfolders when adding content).
- **~400 lines** soft cap per file; split when practical.
- Do not commit `programs/code-for-cleaning/solutions/` or secrets (`.env`).
- Everything in the buckets is public on the website, student tasks and solutions included. Run `make site` after adding or moving content: it refreshes the landing page and fails on broken links.
- New learning content goes on the path by adding a step to `hub/path.mjs` in the right place. Never rename or reuse a step `id`.
