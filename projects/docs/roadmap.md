# Projects roadmap (sheet → build)

Whole-repo order: [`../../docs/LEARNING_PATH.md`](../../docs/LEARNING_PATH.md).

This page is only the **project** checklists. Prefer LEARNING_PATH Phases 1–2 (CS + HTML/CSS) before Project 01 if you are new.

| Column | Meaning |
|--------|---------|
| **Learn** | Sheet(s) — 5–20 min |
| **Build** | Work in that project folder |
| **Checkpoint** | You can explain / demo this |

---

# Project 00 — Static page

**Guide:** [00 step-by-step](../00-static-page/docs/step-by-step.md)

| | |
|---|---|
| **Learn** | [HTML sheet](./html/README.md) → [CSS sheet](./css/README.md) |
| **Build** | About-me page: headings, link, flex card, one media query |
| **Checkpoint** | Looks fine on a narrow window |

---

# Project 01 — Weather dashboard (browser)

**Guide:** [01 step-by-step](../01-weather-dashboard/docs/step-by-step.md)

### Prep

| | |
|---|---|
| **Learn** | [`drills/javascript`](../../drills/javascript/) until arrays/functions feel OK · CS HTTP lessons if needed |
| **Checkpoint** | `make test` mostly green on early topics |

### Build phases (short)

| Phase | Learn | Build | Checkpoint |
|-------|-------|-------|------------|
| Setup | [setup](./setup/getting-started.md) · [git apply](./git/README.md) | folders, Live Server | page opens |
| UI | [JS by-project P1](./javascript/by-project.md#project-1--weather-dashboard) | HTML/CSS form | form visible |
| API | [01 concepts](../01-weather-dashboard/docs/concepts.md) (Open-Meteo bits only; HTTP depth = CS) | `fetch` geocode | JSON in console |
| Wire | JS events / try-catch rows | show weather | London works |
| Extra | localStorage section in concepts | recent cities | survives refresh |

**Done when:** You can explain fetch + async to a friend.

---

# Project 05 — Java weather CLI *(Java focus apply)*

**Guide:** [05 step-by-step](../05-java-weather-cli/docs/step-by-step.md)

| | |
|---|---|
| **Learn** | [Java toys sheet](./java/README.md) · Java hub through methods/objects · REST & HTTP topic |
| **Build** | `HttpClient` → Open-Meteo → print temperature |
| **Checkpoint** | One city prints °C from terminal |

Then continue **Java hub** depth (collections, exceptions, build tools, patterns).

---

# Project 02 — Docker portfolio

**Guide:** [02 step-by-step](../02-docker-portfolio/docs/step-by-step.md)

| | |
|---|---|
| **Learn** | CS Docker lesson · [docker apply sheet](./docker/README.md) |
| **Build** | Static site (reuse 00) + Dockerfile + `docker run -p 8080:80` |
| **Checkpoint** | Site via container URL |

---

# Project 03 — Node weather CLI *(optional)*

**Guide:** [03 step-by-step](../03-cli-tool/docs/step-by-step.md) — **Weather CLI only**

| | |
|---|---|
| **Learn** | [nodejs](./nodejs/README.md) · [npm](./npm/README.md) |
| **Build** | `weather london` in terminal |
| **Checkpoint** | Same API idea as 01, outside the browser |

Skip if you prefer more Java time.

---

# Project 04 — React todo *(optional)*

**Guide:** [04 step-by-step](../04-react-todo-app/docs/step-by-step.md)

Keep scope small: add, complete, filter, localStorage. Skip polish if tired.

| | |
|---|---|
| **Learn** | [react sheet](./react/README.md) |
| **Build** | Vite React todo |
| **Checkpoint** | Todos persist after refresh |

Then [typescript sheet](./typescript/README.md) → [`apps/codestep`](../../apps/codestep/).

---

# After the small projects

1. Finish [`tracks/java`](../../tracks/java/) path  
2. [`apps/todo-e2e`](../../apps/todo-e2e/) → [`apps/pokedex`](../../apps/pokedex/)  
3. [`tracks/architecture`](../../tracks/architecture/) concepts  
4. [`tracks/spring-boot`](../../tracks/spring-boot/) ParcelPilot  

**→ Back to [LEARNING_PATH](../../docs/LEARNING_PATH.md)**
