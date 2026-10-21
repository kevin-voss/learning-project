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
| **Sheet** | CS web lessons (client/server, HTTP) if Phase 1 skimmed them |
| **Project** | [`projects/01-weather-dashboard/`](../projects/01-weather-dashboard/) — browser `fetch` (~6–10 h) |
| **Checkpoint** | Search a city → live weather; you can say what `async/await` is waiting for |

### Phase 4 — Java (main focus)

**Rule:** strong foundation first. No Spring deep-dive, no design-pattern marathon, no JPA until the layers below feel easy.

Toy words: **class** = cookie cutter · **object** = cookie · **method** = what it can do.

Sheet: [`projects/docs/java/`](../projects/docs/java/README.md) · Hub: [`tracks/java/`](../tracks/java/index.html)

#### Layer A — Language foundation (must lock in)

| Learn | Hub / CS | Prove it |
|-------|----------|----------|
| Setup, folders, files, `javac` / `java` | Getting started · project layout | Compile a one-file program |
| Syntax, packages, imports | Syntax fundamentals | Second file in a package |
| Data types, primitives vs references | Types and variables · CS `stack-heap-gc` | Explain stack vs heap in one sentence |
| Operators, control flow | Operators · control flow | Small menu loop |
| Methods | Methods | Extract a method and call it |
| Classes and objects | Classes and objects | Cookie-cutter story out loud |
| Arrays | Arrays · CS `arrays` | Fill and print an array |
| Strings | Strings and text | `equals` vs `==` on strings |

**Gate A:** You create folders, put classes in a package, compile from the terminal, and explain class vs object.

#### Layer B — Types you use every day + algorithms (light)

| Learn | Where | Prove it |
|-------|-------|----------|
| `ArrayList`, `HashMap`, `HashSet` | Hub collections · CS lists/maps/sets | Build a multi-file console list |
| When array vs list vs map | Same + CS `big-o-notation` (skim) | Pick the right type for a task |
| Exceptions, basic I/O | Hub exceptions · I/O | Fail safely, read/write a small file |
| Simple algorithms | CS searching/sorting skim · practice projects | Linear search or sort a small list |

**Gate B:** You use `ArrayList` and `HashMap` without copy-paste panic.

#### Layer C — Java features that finish the base

Stay practical. Still not Spring.

| Learn | Notes |
|-------|--------|
| Interfaces, enums, `equals` / `hashCode` | Hub gaps to add (P0) · needed before maps as keys |
| Maven layout, classpath, multi-module-ish folders | Hub build tools · `src/main/java` |
| JUnit basics | Real `@Test` before trusting Spring tests |
| REST as vocabulary + one HTTP client | Hub REST · [`projects/05-java-weather-cli`](../projects/05-java-weather-cli/) |

**Gate C:** Weather CLI works. You know GET vs POST. Project uses a clear folder layout.

#### Layer D — How a server is structured (still foundation)

Picture the jobs before frameworks go deep:

```text
Request
  → Controller   (HTTP in/out, status codes)
  → Service      (business rules)
  → Repository   (talk to DB)
       ↑
  DTO            (data shape on the wire)
  Entity         (data shape in the DB / domain)
```

| Learn | Where |
|-------|--------|
| What each layer owns | Sheet [`projects/docs/java/server-layers.md`](../projects/docs/java/server-layers.md) |
| Postgres: tables, SQL CRUD | CS `database-sql-fundamentals` |
| Connect from Java (JDBC) | Hub JDBC gap · try-with-resources |
| Docker for Postgres (and later the app) | CS Docker · project 02 |

**Gate D:** You can point at controller / service / repo / DTO / entity and say what each is for. You run Postgres in Docker and run one SQL `SELECT`.

#### Layer F — Deeper knowledge (only after Gates A–D)

Open these **after** the foundation feels boring (good sign):

| Deeper | Where |
|--------|--------|
| JVM GC detail, concurrency | Hub JVM · concurrency light · CS concurrency |
| Design patterns catalog | Hub patterns (after interfaces/enums) |
| Spring Boot product path | [`tracks/spring-boot`](../tracks/spring-boot/) ParcelPilot |
| Architecture tradeoffs | [`tracks/architecture`](../tracks/architecture/) |
| Streams, Optional, sealed, advanced generics | Hub P1/P2 gaps |

#### Still missing in the hub (build these into Layers A–D)

| Priority | Topic |
|----------|--------|
| P0 | Packages + multi-file layout drills |
| P0 | Interfaces, enums, `equals` / `hashCode` |
| P0 | Collections depth (ArrayList / HashMap day-to-day) |
| P0 | JDBC + Postgres connect |
| P0 | Server layers lesson (controller → … → entity) |
| P0 | JUnit 5 basics |
| P1 | Maven `src/main/java` as default layout |
| P1 | Optional, Streams, `java.time` |

### Phase 5 — Docker apply (static site)

Do when Layer D needs container practice, or after Gate C.

| | |
|---|---|
| **Sheet** | CS Docker · [`projects/docs/docker/`](../projects/docs/docker/README.md) |
| **Project** | [`projects/02-docker-portfolio/`](../projects/02-docker-portfolio/) |
| **Checkpoint** | Site or Postgres runs in Docker |

### Phase 6 — Optional web depth (Node / React / TS)

Only after Java Layers A–B feel solid. Or skip.

| | |
|---|---|
| **Optional** | [`projects/03-cli-tool/`](../projects/03-cli-tool/) · [`projects/04-react-todo-app/`](../projects/04-react-todo-app/) |

### Phase 7 — Spring course

Same as Layer F: [`tracks/spring-boot`](../tracks/spring-boot/). No shortcut past Gates A–D.

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
| [`students/`](../students/README.md) | Per-student tasks by subject (e.g. Becky · Computer Science) · `/new-task` |
| [`tracks/certifications/aws-genai-pro/`](../tracks/certifications/aws-genai-pro/index.html) | Exam prep only |
| Learner memory | [`docs/learner-memory/`](learner-memory/README.md) · Cursor `/reflect` |

---

## Canonical homes (no duplicate curricula)

| Topic | Canonical | Everywhere else |
|-------|-----------|-----------------|
| CS foundations, networks, Docker intro, Git intro | `tracks/computer-science/` | Thin project notes + links |
| HTML / CSS first page | `projects/docs/html` + `css` → project `00` | — |
| JS syntax drills | `drills/javascript/` | Project sheets = apply only |
| Java language & patterns | `tracks/java/` | Spring refs link; project `05` applies HTTP |
| REST in Java | Java hub REST topic | Spring `web-and-api/` = Spring-flavored |
| Architecture tradeoffs | `tracks/architecture/` | Spring = build |
| Backend product path | `tracks/spring-boot/` | — |
| Portfolio briefs | `projects/` | — |

---

## Project map (small on purpose)

| # | Folder | Layer / phase | Sheet scope | Hours |
|---|--------|---------------|-------------|-------|
| 00 | `00-static-page` | Phase 2 (web) | html + css only | 2–4 |
| 01 | `01-weather-dashboard` | Phase 3 (JS) | drills + HTTP · not Java | 6–10 |
| 05 | `05-java-weather-cli` | Java **C** | java sheet + hub REST | 3–5 |
| 02 | `02-docker-portfolio` | Phase 5 / Java **D** | CS Docker + docker apply | 4–6 |
| 03 | `03-cli-tool` | Phase 6 optional | node + npm · off Java spine | 4–8 |
| 04 | `04-react-todo-app` | Phase 6 optional | react · after Java A–B | 6–10 |

| Course (not under `projects/`) | Layer | After |
|--------------------------------|-------|--------|
| `tracks/spring-boot` | **F** | Gates A–D · server-layers · SQL |

Detail checklist: [`projects/docs/roadmap.md`](../projects/docs/roadmap.md).

---

## Folder conventions

- Max **5 files** per directory (subfolders OK).
- Soft cap **~400 lines** per source/lesson file.
- Root = meta only (`README`, `AGENTS`, `Makefile`, `.gitignore`) — content lives in buckets.
