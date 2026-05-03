# learning-project

Interactive JavaScript learning tooling for guided walkthroughs and in-browser practice exercises.

## CodeStep app (main UI)

The **CodeStep** learner experience (guided examples + playground) is the Vite + React app under **`frontend/`**. Course content, walkthrough execution, and code highlighting live in **`frontend/src/domains/`** (each subdomain has a short `README.md`).

```bash
cd frontend
bun install
bun run dev
```

Documentation for design and phases lives in [`docs/codestep/overview.md`](docs/codestep/overview.md) (phases [`01.md`](docs/codestep/01.md)–[`04.md`](docs/codestep/04.md)).

Setup, scripts, and implementation notes: [`frontend/README.md`](frontend/README.md).

The file [`frontend/init_example.html`](frontend/init_example.html) is a legacy static prototype kept for reference only; the maintained entry point is the React app above.
