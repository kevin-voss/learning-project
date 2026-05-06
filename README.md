# learning-project

Interactive JavaScript learning tooling for guided walkthroughs and in-browser practice exercises.

## Project structure

| Path | What it is |
|------|------------|
| [`frontend/`](frontend/README.md) | **CodeStep** — Vite + React learner app (guided examples, playground, worker sandbox). Course logic and highlighting live under [`frontend/src/domains/`](frontend/src/domains/) (each subdomain has a short `README.md`). |
| [`beginner-js/`](beginner-js/README.md) | Small **topic folders** (variables, math, strings, …) with `tasks.js` / `tasks.test.js`; run tests from the repo root with **`make`** — see [`Makefile`](Makefile). |
| [`docs/codestep/`](docs/codestep/overview.md) | Product overview and **implementation phases** [`01.md`](docs/codestep/01.md)–[`04.md`](docs/codestep/04.md). |
| [`system-design/`](system-design/index.html) | Static HTML/CSS/JS **architecture explorer** (diagrams and theory content); open `index.html` in a browser — separate from the React app. |

```
learning-project/
├── beginner-js/          # Bun-tested drills (Makefile targets)
├── docs/
│   └── codestep/         # CodeStep overview + phased specs
├── frontend/             # Main CodeStep UI (Vite + React + TypeScript)
├── system-design/        # Standalone system-design viewer
├── Makefile              # Root test shortcuts for beginner-js/
└── README.md
```

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
