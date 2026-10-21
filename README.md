# learning-project

**Students: open the website and start at step 1.** One numbered list takes you from zero (what is a terminal?) to building a Spring Boot backend. Every step says what to do:

| Mark | Meaning |
|------|---------|
| **Read** | Read a page on the website |
| **Do** | Build or practise it on your computer |
| **Check** | Can you really do it? Tick it and move on |

Your ticks are saved in your browser. The **Continue** button always opens the next step, and on every lesson page a small bar says which step it is, with **I did this ✓**.

The path itself lives in [`hub/path.mjs`](hub/path.mjs). The landing page is [`hub/index.html`](hub/index.html). Everything is visible to everyone, student tasks and solutions included.

## On your computer

Step 3 of the path ([Get set up](sheets/setup/README.md)) does this with you:

```bash
git clone https://github.com/kevin-voss/learning-project.git
cd learning-project
git switch -c your-name
```

Personal Übungen from a teacher are in [`students/<your-name>/`](students/README.md): one folder per Übung, one per Aufgabe. Write your code in the Aufgabe's `meine-loesung/`, compare with `musterloesung/`, commit and push. In Cursor, `/task`, `/hint`, `/check`, `/review` and `/done` help without giving the answer.

## Structure

| Path | What lives there | Used by the path |
|------|------------------|---------------------|
| [`hub/`](hub/index.html) | Landing page, `path.mjs` (the step list), `progress.js`, `scripts/` | — |
| [`docs/`](docs/LEARNING_PATH.md) | `LEARNING_PATH.md` (why the path has this order), learner memory | Look it up |
| [`tracks/`](tracks/) | Deep courses: computer science, Java, Spring Boot, architecture, AI field guide, AWS GenAI Pro | Most Read steps |
| [`sheets/`](sheets/README.md) | Sheets: short topic pages (HTML, CSS, JS, Java, Git, Docker, …) | Read steps before projects |
| [`projects/`](projects/README.md) | Small builds `00`–`05`, each with step-by-step docs | Do steps |
| [`drills/`](drills/javascript/README.md) | JavaScript drills with tests | Stage 5 |
| [`programs/`](programs/code-for-cleaning/README.md) | Code for Cleaning: real-life Java task rounds | Extras |
| [`students/`](students/README.md) | `<student>/<subject>/uebungen/uebung-NN-…/aufgabe-NN-k-…/` with README, `meine-loesung/`, `musterloesung/` | My tasks |

```
learning-project/
├── README.md · AGENTS.md · Makefile · vercel.json · .gitignore
├── hub/            # index.html · path.mjs · progress.js · landing.css · scripts/
├── docs/           # LEARNING_PATH.md · learner-memory/
├── tracks/         # computer-science · java · spring-boot · architecture · ai · certifications/
├── projects/       # docs/ (sheets) · 00 static → 01 weather → 05 java CLI → 02 docker → optional 03/04
├── drills/         # javascript/
├── programs/       # code-for-cleaning/
└── students/       # <student>/<subject>/uebungen/<uebung>/<aufgabe>/
```

## The website

The landing page has four parts: **The path** (from `hub/path.mjs`), **My tasks** (from `students/`), **Look it up** (every page, by folder) and **On your computer**. Only the path order is written by hand.

| File | Job |
|------|-----|
| `hub/path.mjs` | The ordered steps. Add a step here to put it on the path. Never rename a step `id`: browsers save progress by id |
| `hub/progress.js` | Ticks, Continue button and the step bar on every page, saved in `localStorage` |
| `hub/scripts/catalog.mjs` | Writes path, students and catalog into `hub/index.html`; fails if a step links to a missing file |
| `hub/scripts/build-site.mjs` | Builds `dist/site`: every `.md` as a page, code pages for `.java` files, `hub/path.json` for the step bar |
| `hub/scripts/check-links.mjs` | Fails when any internal link on the site is broken |

Vercel runs build + link check on every deploy (`vercel.json`). Locally: `make site`, then serve `dist/site` (for example `python3 -m http.server -d dist/site`).

## Quick commands

```bash
# JS drills
make test

# Website: refresh catalog, build dist/site, check links
make site

# New Übung with Aufgaben for a student (or /new-uebung in Cursor); also updates the landing page
make new-uebung STUDENT=becky SUBJECT=computer-science NUMBER=05 TITLE="Schleifen" AUFGABEN="Einmaleins, Zahlenraten"

# CS demos after edits
node tracks/computer-science/scripts/verify-demos.mjs
```

## Cursor

Rules: [`.cursor/rules/`](.cursor/rules/). Skills: `learner-memory`, `caveman`. Commands for students working on an Aufgabe: `/task`, `/hint`, `/explain`, `/error`, `/check`, `/review`, `/done` (shared tutor rules in `.cursor/rules/students.mdc`). For teachers: `/new-uebung`, `/path`, `/learning-path`, `/reflect`.

Agents: [`AGENTS.md`](AGENTS.md).
