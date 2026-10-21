# Projects roadmap (sheet → build)

Whole-repo order lives in [`docs/LEARNING_PATH.md`](../../docs/LEARNING_PATH.md). Follow that spine first (CS → web basics → Java Layers A–F).

This page is only **project and sheet checklists**. Use it for Learn → Build → Checkpoint per build. Do not treat project numbers as the main curriculum order.

| Column | Meaning |
|--------|---------|
| **Learn** | Sheet(s) — 5–20 min |
| **Build** | Work in that project folder |
| **Checkpoint** | You can explain or demo this |
| **Layer** | Tag from LEARNING_PATH Phase 4 (or Web) |

**Hard stop:** Do **not** open `tracks/spring-boot` or design-patterns deep until **Gates A–D** are done.

---

## Order at a glance

| When | What | Layer |
|------|------|-------|
| Phase 2 (before or beside early Java) | Project 00 static page | Web |
| Phase 3 (before or beside early Java) | Project 01 weather browser | Web |
| Phase 4 Layers A–B | Java sheets + hub practice (no big apps yet) | A / B |
| Phase 4 Layer C | Project 05 Java weather CLI | C |
| Phase 4 Layer D / Phase 5 | Server layers + Postgres + Project 02 Docker | D |
| After Gates A–D | Spring Boot, patterns, architecture depth | F |
| Optional after Java A–B | Projects 03 / 04 | Web (optional) |

---

## Early web (Phases 2–3)

Optional relative to the Java path: do these before Java, or park them and return after Layer A starts. Keep them small. They support the Java fullstack path later; they are not a second career track.

### Project 00 — Static page

**Guide:** [00 step-by-step](../00-static-page/docs/step-by-step.md)

| | |
|---|---|
| **Learn** | [HTML sheet](./html/README.md) → [CSS sheet](./css/README.md) |
| **Build** | About-me page: headings, link, flex, one media query |
| **Checkpoint** | Looks fine on a narrow window |
| **Layer** | Web (Phase 2) |

---

### Project 01 — Weather dashboard (browser)

**Guide:** [01 step-by-step](../01-weather-dashboard/docs/step-by-step.md)

**When:** After HTML/CSS (00) and JS drills feel OK. Fine before Java Layer A, or later if you want Java foundation first.

| | |
|---|---|
| **Learn** | [`drills/javascript`](../../drills/javascript/) · CS HTTP if needed · [JS by-project P1](./javascript/by-project.md#project-1--weather-dashboard) · [01 concepts](../01-weather-dashboard/docs/concepts.md) (API bits only) |
| **Build** | Form → `fetch` geocode → show weather → optional recent cities |
| **Checkpoint** | Search a city → live weather; you can say what `async/await` waits for |
| **Layer** | Web (Phase 3) |

**Prep checkpoint:** `make test` mostly green on early drill topics.

---

## Layer A–C — Java foundation

Sheets: [`projects/docs/java/`](./java/README.md) · Hub: [`tracks/java/`](../../tracks/java/index.html)

Lock language and tools before frameworks. No Spring, no JPA, no pattern marathon yet.

### Layers A–B — Sheets and hub (no portfolio app yet)

| | |
|---|---|
| **Learn** | Java toys sheet · hub: setup, syntax, types, methods, classes, arrays, strings (A) · then collections, exceptions, light I/O / algorithms (B) |
| **Build** | Small console programs in packages; multi-file list with `ArrayList` / `HashMap` |
| **Checkpoint** | **Gate A:** folders, packages, `javac`/`java`, class vs object. **Gate B:** `ArrayList` and `HashMap` without panic |
| **Layer** | A / B |

---

### Project 05 — Java weather CLI (Layer C)

**Guide:** [05 step-by-step](../05-java-weather-cli/docs/step-by-step.md)

**When:** After Gates A–B. Still not Spring.

| | |
|---|---|
| **Learn** | Java sheet · hub through objects/collections · interfaces/enums/`equals` as available · Maven/`src/main/java` · JUnit basics · hub REST · HTTP client idea |
| **Build** | Clear folder layout · `HttpClient` → Open-Meteo → print temperature |
| **Checkpoint** | **Gate C:** one city prints °C from terminal; you know GET vs POST |
| **Layer** | C |

---

## Layer D — Server shape + Docker / Postgres

Do this **before** Spring Boot.

Picture jobs: Request → Controller → Service → Repository; DTO on the wire; Entity in the DB.

| | |
|---|---|
| **Learn** | [`server-layers.md`](./java/server-layers.md) · CS SQL fundamentals · JDBC idea (try-with-resources) · CS Docker intro |
| **Build** | Run Postgres in Docker; run one SQL `SELECT`; name each layer out loud |
| **Checkpoint** | **Gate D:** you can point at controller / service / repo / DTO / entity and say what each is for |
| **Layer** | D |

---

### Project 02 — Docker portfolio (Phase 5 / Layer D practice)

**Guide:** [02 step-by-step](../02-docker-portfolio/docs/step-by-step.md)

**When:** When Layer D needs container practice, or after Gate C.

| | |
|---|---|
| **Learn** | CS Docker · [docker apply sheet](./docker/README.md) |
| **Build** | Static site (reuse 00) + Dockerfile + `docker run -p 8080:80` |
| **Checkpoint** | Site or Postgres runs in Docker |
| **Layer** | D (Phase 5 apply) |

---

## Optional web depth (after Java A–B)

Skip if you prefer more Java time. Only after Layers A–B feel solid.

### Project 03 — Node weather CLI *(optional)*

**Guide:** [03 step-by-step](../03-cli-tool/docs/step-by-step.md) — Weather CLI only

| | |
|---|---|
| **Learn** | [nodejs](./nodejs/README.md) · [npm](./npm/README.md) |
| **Build** | `weather london` in terminal |
| **Checkpoint** | Same API idea as 01, outside the browser |
| **Layer** | Web (optional, Phase 6) |

---

### Project 04 — React todo *(optional)*

**Guide:** [04 step-by-step](../04-react-todo-app/docs/step-by-step.md)

| | |
|---|---|
| **Learn** | [react sheet](./react/README.md) |
| **Build** | Vite React todo: add, complete, filter, localStorage |
| **Checkpoint** | Todos persist after refresh |
| **Layer** | Web (optional, Phase 6) |

Then optional [typescript sheet](./typescript/README.md).

---

## Layer F — Deeper knowledge (after Gates A–D only)

Open when foundation feels boring (good sign):

| | |
|---|---|
| **Learn** | Hub JVM/concurrency light · design patterns (after interfaces/enums) · [`tracks/spring-boot`](../../tracks/spring-boot/) · [`tracks/architecture`](../../tracks/architecture/) |
| **Build** | ParcelPilot / Spring topics; architecture practice that implements ideas you already named |
| **Checkpoint** | You use frameworks on top of Gates A–D, not instead of them |
| **Layer** | F |

---

## Project map (hours)

| # | Folder | After… | Hours | Layer |
|---|--------|--------|-------|-------|
| 00 | `00-static-page` | HTML + CSS sheets | 2–4 | Web |
| 01 | `01-weather-dashboard` | JS drills + HTTP | 6–10 | Web |
| 05 | `05-java-weather-cli` | Java hub + Gates A–B | 3–5 | C |
| 02 | `02-docker-portfolio` | CS Docker / Layer D | 4–6 | D |
| 03 | `03-cli-tool` (optional) | Node sheets; after Java A–B | 4–8 | Web |
| 04 | `04-react-todo-app` (optional) | React sheet; after Java A–B | 6–10 | Web |

**→ Back to [LEARNING_PATH](../../docs/LEARNING_PATH.md)**
