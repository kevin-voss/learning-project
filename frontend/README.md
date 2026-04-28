## CodeStep frontend

[Vite](https://vite.dev/) + [React](https://react.dev/) TypeScript app: **Learn** (step-through guided examples) and **Practice** (Web Worker sandbox + tests).

Architecture and phased delivery are documented under [`../docs/codestep/`](../docs/codestep/overview.md).

### Scripts

Use [Bun](https://bun.sh/) from this directory:

| Command           | Purpose                                      |
|-------------------|----------------------------------------------|
| `bun install`     | Install dependencies                         |
| `bun run dev`     | Dev server (default `http://localhost:5173`) |
| `bun run build`   | Type-check (`tsc -b`) and production bundle  |
| `bun run preview` | Preview the production build locally         |
| `bun run lint`    | ESLint (TypeScript + React Hooks refresh)   |

Equivalent `npm run …` / `pnpm …` commands work if you prefer.

### Source layout

| Area | Role |
|------|------|
| `src/App.tsx`, `components/layout/` | Shell: topics, Learn/Practice tabs |
| `components/learn/` | Code viewer, playback, variables, console |
| `components/practice/` | Task picker, editor, hints, tests |
| `data/curriculumData.ts` | Assembled fourteen-topic guided curriculum (+ topic intros) |
| `data/examples/_topics_raw.json` | Legacy JSON still merged for early guided examples |
| `data/playground/` | Playground tasks per topic |
| `workers/playground.worker.ts` | Sandbox for learner code |
| `hooks/codestepSettings.ts` | Persist sound, playback speed, last topic/mode/example index |

### Paths

Imports use `@/` as an alias for `src/` (see `vite.config.ts` and `tsconfig.app.json`).

### Styles

Tokens: `src/styles/tokens.css`. Global base + accessibility helpers: `src/styles/global.css`. Feature UI uses CSS Modules beside components.
