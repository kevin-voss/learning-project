# Agent instructions (learning-project)

Short orientation for AI agents and humans automating this repo. Full structure and commands: **[README.md](README.md)**.

## What this repo is

Interactive **JavaScript learning** tooling: the main **CodeStep** learner UI (`frontend/`), **beginner-js** drill topics (`beginner-js/` + root `Makefile`), **Codestep product docs** (`docs/codestep/`), and a separate **system-design** static viewer (`system-design/`).

## Cursor configuration

- **Rules:** `.cursor/rules/` — always-on or scoped guidance (e.g. monorepo layout).
- **Skills:** `.cursor/skills/` — optional workflows (e.g. `caveman` for low-token communication when the user invokes it).

Prefer the README’s project table and phase docs over duplicating long structure here.

## Stack summary

| Area | Stack / notes |
|------|----------------|
| `frontend/` | Vite, React, TypeScript, Tailwind; Vitest/ESLint per `frontend/package.json` |
| `beginner-js/` | Bun-driven tests via `Makefile` |
| `system-design/` | Static HTML/CSS/JS |

Match existing style and file layout in the subtree you edit; domain logic for CodeStep belongs under `frontend/src/domains/`.
