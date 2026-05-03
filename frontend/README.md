## CodeStep frontend

[Vite](https://vite.dev/) + [React](https://react.dev/) TypeScript app: **Learn** (step-through guided examples) and **Practice** (Web Worker sandbox + tests).

Architecture and phased delivery are documented under [`../docs/codestep/`](../docs/codestep/overview.md).

### Scripts

Use [Bun](https://bun.sh/) from this directory:

| Command              | Purpose                                      |
|----------------------|----------------------------------------------|
| `bun install`        | Install dependencies                         |
| `bun run dev`        | Dev server (default `http://localhost:5173`) |
| `bun run build`    | Type-check (`tsc -b`) and production bundle  |
| `bun run preview`    | Preview the production build locally         |
| `bun run lint`       | ESLint (TypeScript + React Hooks refresh)   |
| `bun run test`       | Vitest (unit + hook tests, single run)       |
| `bun run test:watch` | Vitest watch mode                            |

Equivalent `npm run …` / `pnpm …` commands work if you prefer.

### Source layout

| Area | Role |
|------|------|
| `src/App.tsx`, `components/layout/` | Shell: topic rail, lesson panel, responsive topic sheet |
| `components/learn/` | Code viewer, playback, variables, console, topic intro blocks |
| `components/practice/` | Tasks, editor, hints, tests |
| `domains/topics/` | Curriculum assembly, intros, playground tasks — see `README.md` in that folder |
| `domains/walkthroughs/` | Lesson steps, worker run, replay, playback — see `README.md` |
| `domains/line-highlights/` | Syntax tint + `CodeLine` parsing — see `README.md` |
| `workers/playground.worker.ts` | Sandbox for learner code |
| `hooks/` | Persistence (`codestepSettings`), layout, lesson flow, playground runner |
| `lib/` | Small shared helpers (e.g. clamping indices) |

### Tests

Colocated tests: `*.test.ts` / `*.test.tsx` next to sources. Prefer **pure** tests for `lib/` and domain utilities; `useWideLayout` illustrates a minimal hook test with stubbed `matchMedia`.

### Paths

Imports use `@/` as an alias for `src/` (see `vite.config.ts` and `tsconfig.app.json`).

### Styles

Tokens: `src/styles/tokens.css`. Global base + accessibility helpers: `src/styles/global.css`. Feature UI uses CSS Modules beside components.
