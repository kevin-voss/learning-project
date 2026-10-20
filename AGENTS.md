# Agent instructions (learning-project)

Short orientation for AI agents. Full map: **[README.md](README.md)** and **[docs/LEARNING_PATH.md](docs/LEARNING_PATH.md)**.

## What this repo is

A monorepo of **drills**, **tracks**, **apps**, **projects** (sheet → small build), and **programs**. **One spine:** [`docs/LEARNING_PATH.md`](docs/LEARNING_PATH.md) — CS → web basics → **Java focus** → infra/architecture/Spring. Root holds meta + `hub/` only.

## Layout

| Area | Path | Stack / notes |
|------|------|----------------|
| Hub | `hub/` | Static landing |
| Drills | `drills/javascript/` | Bun tests via root `Makefile` |
| CodeStep | `apps/codestep/` | Vite, React, TS, Tailwind; domains under `src/domains/` |
| Todo e2e | `apps/todo-e2e/` | HTML/CSS/JS + Spring + JdbcTemplate + Postgres |
| Pokédex | `apps/pokedex/` | React + Spring + JPA |
| Java hub | `tracks/java/` | Static HTML/CSS/JS |
| CS roadmap | `tracks/computer-science/` | Static + demos (`verify-demos.mjs`) |
| Architecture | `tracks/architecture/` | Small static explorer (not Spring course) |
| Spring Boot | `tracks/spring-boot/` | Markdown topics + `references/<area>/` |
| AIP-C01 | `tracks/certifications/aws-genai-pro/` | Static prep app |
| Projects | `projects/` | Four brief-only curricula |
| Cleaning | `programs/code-for-cleaning/` | Slash commands in `programs/code-for-cleaning/.cursor/commands/` |
| CodeStep specs | `docs/codestep/` | Phases 01–05 |
| Learner memory | `docs/learner-memory/` | Long-term profile; skill `learner-memory`, `/reflect` |

## Cursor

- **Rules:** `.cursor/rules/` — `monorepo.mdc` (always on), `structure.mdc` (folder/line limits).
- **Skills:** `.cursor/skills/caveman/` — optional compressed replies when invoked.
- **Commands:** `.cursor/commands/` — repo-wide helpers; cleaning program keeps its own commands under `programs/code-for-cleaning/.cursor/commands/`.

## Conventions

- Match existing patterns in the subtree you edit.
- **Max 5 files** per directory (split into subfolders when adding content).
- **~400 lines** soft cap per file; split when practical.
- Do not commit `programs/code-for-cleaning/solutions/` or secrets (`.env`).
