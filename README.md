# learning-project

One repository, two ways to use it:

- **Read on the web.** The Vercel site shows every roadmap step, track, sheet, project, drill, program and student task. It starts at the landing page ([`hub/index.html`](hub/index.html)).
- **Work locally.** Clone the repo, open your folder under [`students/`](students/README.md), build in `starter/`, run drills with `make test`.

Everything is visible to everyone, student tasks and solutions included.

Curriculum: **CS → web basics → Java Layers A–D → projects 00→01→05→02 → Layer F (Spring / architecture).** Optional React last. The full order with gates is in [`docs/LEARNING_PATH.md`](docs/LEARNING_PATH.md).

Pattern everywhere: **read a short sheet → build a small related project → next step.**

## For students

```bash
git clone https://github.com/kevin-voss/learning-project.git
cd learning-project
git switch -c <your-name>/<task>      # e.g. becky/04-branches
```

1. Find your tasks on the landing page (**Students** section) or in `students/<your-name>/`.
2. Read the task's `README.md`, then `TASK.md`.
3. Write your code in `starter/`. Compare with `solution/` when you are done.
4. Commit and push your branch. Details: [`students/README.md`](students/README.md).

## Structure

| Path | What lives there | On the landing page |
|------|------------------|---------------------|
| [`hub/`](hub/index.html) | Landing page + `scripts/` that build the site | — |
| [`docs/`](docs/LEARNING_PATH.md) | `LEARNING_PATH.md` (the one roadmap), learner memory | Roadmap · Docs |
| [`tracks/`](tracks/) | Deep courses: computer science, Java, Spring Boot, architecture, AI field guide, AWS GenAI Pro | Tracks |
| [`projects/docs/`](projects/docs/README.md) | Sheets: short topic pages (HTML, CSS, JS, Java, Git, Docker, …) | Sheets |
| [`projects/`](projects/README.md) | Small builds `00`–`05`, each with step-by-step docs | Projects |
| [`drills/`](drills/javascript/README.md) | JavaScript drills with tests | Practice |
| [`programs/`](programs/code-for-cleaning/README.md) | Code for Cleaning: real-life Java task rounds | Practice |
| [`students/`](students/README.md) | `<student>/<subject>/<NN-task>/` with README, TASK, `starter/`, `solution/` | Students |

```
learning-project/
├── README.md · AGENTS.md · Makefile · vercel.json · .gitignore
├── hub/            # index.html (landing) · landing.css · scripts/
├── docs/           # LEARNING_PATH.md · learner-memory/
├── tracks/         # computer-science · java · spring-boot · architecture · ai · certifications/
├── projects/       # docs/ (sheets) · 00 static → 01 weather → 05 java CLI → 02 docker → optional 03/04
├── drills/         # javascript/
├── programs/       # code-for-cleaning/
└── students/       # <student>/<subject>/<NN-task>/
```

## The website

The landing page has a hand-written **Roadmap** and a generated catalog: **Tracks, Sheets, Projects, Practice, Students, Docs**. The catalog is built from the folders, so a new track, sheet, project or student task appears without editing HTML.

| Script | Job |
|--------|-----|
| `hub/scripts/catalog.mjs` | Writes the catalog into `hub/index.html` between the `catalog:start` / `catalog:end` markers |
| `hub/scripts/build-site.mjs` | Refreshes the catalog, copies all buckets to `dist/site`, renders every `.md` as a page, adds code pages for `.java` and other source files |
| `hub/scripts/check-links.mjs` | Fails when any internal link on the site is broken |

Vercel runs build + link check on every deploy (`vercel.json`). Locally: `make site`, then serve `dist/site` (for example `npx serve dist/site`).

## Quick commands

```bash
# JS drills
make test

# Website: refresh catalog, build dist/site, check links
make site

# New task for a student (or /new-task in Cursor); also updates the landing page
make new-task STUDENT=becky SUBJECT=computer-science TITLE="Loops"

# CS demos after edits
node tracks/computer-science/scripts/verify-demos.mjs
```

## Cursor

Rules: [`.cursor/rules/`](.cursor/rules/). Skills: `learner-memory`, `caveman`. Commands: `/path`, `/learning-path`, `/reflect`, `/new-task`.

Agents: [`AGENTS.md`](AGENTS.md).
