# learning-project

Interactive JavaScript learning tooling for guided walkthroughs and in-browser practice exercises.

## Project structure

High-level map of the monorepo (stacks: CodeStep UI in **`frontend/`**, Bun-tested drills in **`beginner-js/`**, static **`system-design/`** viewer).

| Path | What it is |
|------|------------|
| [`frontend/`](frontend/README.md) | **CodeStep** — Vite + React + TypeScript + Tailwind learner app (guided examples, playground, worker sandbox). Course logic and highlighting live under [`frontend/src/domains/`](frontend/src/domains/) (each subdomain may have a short `README.md`). |
| [`beginner-js/`](beginner-js/README.md) | **Topic folders** (variables, math, strings, …) with `tasks.js` / `tasks.test.js`; run tests from the repo root with **`make`** — see [`Makefile`](Makefile). |
| [`docs/codestep/`](docs/codestep/overview.md) | Product overview and **implementation phases** [`01.md`](docs/codestep/01.md)–[`04.md`](docs/codestep/04.md). |
| [`system-design/`](system-design/index.html) | Static HTML/CSS/JS **architecture explorer**; open `index.html` in a browser — separate from the React app. |
| [`data-structures/`](data-structures/README.md) | Static HTML/CSS/JS **data structures roadmap** with interactive demos; open `index.html` in a browser. |
| [`AGENTS.md`](AGENTS.md) | Short entry for **AI agents and automation** (stack summary, `.cursor/` layout); full navigation stays in this README. |
| [`Makefile`](Makefile) | Root **`make`** targets wrapping **Bun** tests for `beginner-js/`. |

```
learning-project/
├── AGENTS.md                 # Agents / automation orientation
├── Makefile                  # beginner-js test shortcuts (Bun)
├── beginner-js/              # Topic drills (tasks + tests)
├── docs/
│   └── codestep/             # CodeStep overview + phased specs (01–04)
├── frontend/                 # CodeStep app (Vite + React + TS + Tailwind)
│   ├── init_example.html     # Legacy static prototype (reference only)
│   ├── src/
│   │   ├── components/       # Shared UI
│   │   ├── domains/          # Course domains + walkthrough logic
│   │   └── workers/          # Sandbox worker(s)
│   ├── README.md
│   └── (other app files; see frontend/README.md)
├── system-design/            # Standalone architecture viewer (index.html)
└── README.md
```

**Cursor:** repo rules and optional skills live under [`.cursor/rules/`](.cursor/rules/) and [`.cursor/skills/`](.cursor/skills/) — summarized in [`AGENTS.md`](AGENTS.md).

## CodeStep app (main UI)

The **CodeStep** learner experience (guided examples + playground) is the Vite + React app under **`frontend/`**.

```bash
cd frontend
bun install
bun run dev
```

Documentation for design and phases lives in [`docs/codestep/overview.md`](docs/codestep/overview.md) (phases [`01.md`](docs/codestep/01.md)–[`04.md`](docs/codestep/04.md)).

Setup, scripts, and implementation notes: [`frontend/README.md`](frontend/README.md).

The file [`frontend/init_example.html`](frontend/init_example.html) is a legacy static prototype kept for reference only; the maintained entry point is the React app above.
