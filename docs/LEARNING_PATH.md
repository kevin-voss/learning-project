# Learning path (one spine)

One order. One home per topic. **Read a short sheet → build a small related project → next step.**

Open the visual index anytime: [`hub/index.html`](../hub/index.html).

---

## How learning works

```text
Sheet (5–20 min)  →  Small project (2–8 h)  →  Checkpoint  →  Next sheet
```

- **Sheets** explain one idea with tiny examples (toy analogies welcome).
- **Projects** apply that idea. You write the code. Keep them small.
- **Tracks / drills / apps** are the deep homes — project docs only add *this build’s* checklist, then **link** out.

**Focus of this repo:** Java (language → fullstack → Spring). Web (HTML/CSS/JS/TS/React) and CS foundations support that path — they are not a second career syllabus.

---

## The spine (do in order)

### Phase 0 — Orientation

| | |
|---|---|
| **Read** | This file · [`hub/index.html`](../hub/index.html) |
| **Checkpoint** | You know: sheet → project → next |

### Phase 1 — CS from the ground up

| | |
|---|---|
| **Read** | [`tracks/computer-science/`](../tracks/computer-science/index.html) — foundations → data structures → algorithms (skim DP/greedy if tired) |
| **Then** | Computer internals (skim) · **Linux / terminal** lesson (do the playground) |
| **Canonical for** | Memory, Big-O, structures, **networks / HTTP basics**, **Git intro**, **Docker intro** |
| **Checkpoint** | You can explain array vs list, what a port is, and run 5 shell commands without panic |

Skip rewriting Git/Docker/HTTP elsewhere — only deepen later.

### Phase 2 — HTML & CSS (sheets → tiny site)

| | |
|---|---|
| **Sheet** | [`projects/docs/html/`](../projects/docs/html/README.md) |
| **Project** | [`projects/00-static-page/`](../projects/00-static-page/) (~2–3 h) |
| **Sheet** | [`projects/docs/css/`](../projects/docs/css/README.md) |
| **Project** | Style the same page (flex + one media query) — still in `00-static-page` |
| **Checkpoint** | A simple page looks good on phone and desktop |

### Phase 3 — JavaScript

| | |
|---|---|
| **Drill** | [`drills/javascript/`](../drills/javascript/README.md) — `make test` (variables → objects) |
| **Optional guide** | [`apps/codestep/`](../apps/codestep/README.md) — walkthroughs only; skip TS pressure |
| **Sheet** | CS web lessons (client/server, HTTP) if Phase 1 skimmed them |
| **Project** | [`projects/01-weather-dashboard/`](../projects/01-weather-dashboard/) — browser `fetch` (~6–10 h) |
| **Checkpoint** | Search a city → live weather; you can say what `async/await` is waiting for |

### Phase 4 — Java (main focus)

| | |
|---|---|
| **Sheet bridge** | [`projects/docs/java/`](../projects/docs/java/README.md) — objects like toy boxes |
| **Deep read** | [`tracks/java/`](../tracks/java/index.html) — getting-started → … → collections → exceptions → build tools |
| **Keep going** | REST & HTTP · design patterns · JVM memory (as the hub orders them) |
| **Project** | [`projects/05-java-weather-cli/`](../projects/05-java-weather-cli/) — same Open-Meteo API in Java (~3–5 h) |
| **Checkpoint** | You compile/run with `javac`/`java` or Maven; a class is a stamp, an object is one stamp print |

Explain Java like toys: **class** = cookie cutter, **object** = cookie, **method** = what the cookie can do.

### Phase 5 — Infra apply (small)

| | |
|---|---|
| **Sheet** | CS Docker lesson (canonical) · thin apply notes in [`projects/docs/docker/`](../projects/docs/docker/README.md) |
| **Project** | [`projects/02-docker-portfolio/`](../projects/02-docker-portfolio/) — containerize `00` or a tiny static site (~4–6 h) |
| **Checkpoint** | `docker run -p 8080:80 …` shows your site |

### Phase 6 — Optional web depth (Node / React / TS)

Do this **after** Java basics feel comfortable — or skip straight to Phase 7.

| | |
|---|---|
| **Optional** | [`projects/03-cli-tool/`](../projects/03-cli-tool/) — Node weather CLI only (~4–8 h) |
| **Sheet** | [`projects/docs/react/`](../projects/docs/react/README.md) |
| **Project** | [`projects/04-react-todo-app/`](../projects/04-react-todo-app/) — keep scope to add / complete / filter (~6–10 h) |
| **Sheet** | [`projects/docs/typescript/`](../projects/docs/typescript/README.md) → practice in CodeStep |

### Phase 7 — Java fullstack ladder

| | |
|---|---|
| **App** | [`apps/todo-e2e/`](../apps/todo-e2e/README.md) — HTML + Spring + SQL (JdbcTemplate) |
| **App** | [`apps/pokedex/`](../apps/pokedex/README.md) — React + Spring + JPA |
| **Course** | [`tracks/spring-boot/`](../tracks/spring-boot/README.md) — ParcelPilot (build services) |

### Phase 8 — Architecture & system design basics

| | |
|---|---|
| **Concepts** | [`tracks/architecture/`](../tracks/architecture/index.html) — load balancing, cache, layers, tradeoffs |
| **Practice** | Spring topics that *implement* those ideas (don’t re-read CS Docker/queues as a second course) |

### Side paths (never the main spine)

| Path | When |
|------|------|
| [`tracks/ai/`](../tracks/ai/README.md) | AI engineering sheet (RAG, agents, MCP, evals) |
| [`programs/code-for-cleaning/`](../programs/code-for-cleaning/README.md) | Extra Java practice |
| [`tracks/certifications/aws-genai-pro/`](../tracks/certifications/aws-genai-pro/index.html) | Exam prep only |
| Learner memory | [`docs/learner-memory/`](learner-memory/README.md) · Cursor `/reflect` |

---

## Canonical homes (no duplicate curricula)

| Topic | Canonical | Everywhere else |
|-------|-----------|-----------------|
| CS foundations, networks, Docker intro, Git intro | `tracks/computer-science/` | Thin project notes + links |
| HTML / CSS first page | `projects/docs/html` + `css` → project `00` | — |
| JS syntax drills | `drills/javascript/` | Project sheets = apply only |
| Guided JS UI | `apps/codestep/` | — |
| Java language & patterns | `tracks/java/` | Spring refs link; project `05` applies HTTP |
| REST in Java | Java hub REST topic | Spring `web-and-api/` = Spring-flavored |
| Architecture tradeoffs | `tracks/architecture/` | Spring = build |
| Backend product path | `tracks/spring-boot/` | — |
| Portfolio briefs | `projects/` | — |

---

## Project map (small on purpose)

| # | Folder | After sheet… | Hours |
|---|--------|--------------|-------|
| 00 | `00-static-page` | HTML + CSS sheets | 2–4 |
| 01 | `01-weather-dashboard` | JS drills + HTTP | 6–10 |
| 05 | `05-java-weather-cli` | Java hub REST | 3–5 |
| 02 | `02-docker-portfolio` | CS Docker | 4–6 |
| 03 | `03-cli-tool` (optional) | Node sheets | 4–8 |
| 04 | `04-react-todo-app` (optional) | React sheet | 6–10 |

Detail checklist: [`projects/docs/roadmap.md`](../projects/docs/roadmap.md).

---

## Folder conventions

- Max **5 files** per directory (subfolders OK).
- Soft cap **~400 lines** per source/lesson file.
- Root = meta only (`README`, `AGENTS`, `Makefile`, `.gitignore`) — content lives in buckets.
