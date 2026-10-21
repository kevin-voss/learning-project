# Projects — sheets then small builds

Repo order (Java focus): **[../docs/LEARNING_PATH.md](../docs/LEARNING_PATH.md)**.

**Pattern:** read a short sheet (5–20 min) → build the linked project (hours, not weeks) → checkpoint → next.

Docs only: you write all code. No pre-filled apps. Each project is a small sheet→build loop, measured in hours.

---

## Start here

1. Follow **[LEARNING_PATH](../docs/LEARNING_PATH.md)** Phases 0–2 first (CS + HTML/CSS), unless you already know those.
2. Open **[docs/roadmap.md](./docs/roadmap.md)** for phase checklists.
3. When a phase says **Learn**, open that sheet, then code.

```text
Sheet  →  Build  →  Checkpoint  →  Next
```

---

## Project order (learning spine)

| # | Project | After you read… | Hours | Spine |
|---|---------|-----------------|-------|-------|
| 00 | [Static page](./00-static-page/) | [html](./docs/html/) + [css](./docs/css/) sheets | 2–4 | Phase 2 |
| 01 | [Weather dashboard](./01-weather-dashboard/) | JS drills + HTTP (CS) | 6–10 | Phase 3 |
| — | Java foundation (no numbered build yet) | [java](./docs/java/) Layers A–C + [server-layers](./docs/java/server-layers.md) | sheets | Phase 4 Layers A–C |
| 05 | [Java weather CLI](./05-java-weather-cli/) | Java Layers A–C + hub REST | 3–5 | Gate C |
| 02 | [Docker portfolio](./02-docker-portfolio/) | CS Docker + [docker](./docs/docker/) apply notes | 4–6 | Phase 5 / Layer D |
| 03 | [Node weather CLI](./03-cli-tool/) *(optional)* | [nodejs](./docs/nodejs/) + [npm](./docs/npm/) | 4–8 | Phase 6 |
| 04 | [React todo](./04-react-todo-app/) *(optional)* | [react](./docs/react/) sheet | 6–10 | Phase 6 |

**Main path after 00 → 01 → Java foundation → 05:** Layer D ([server-layers](./docs/java/server-layers.md)) → [`tracks/spring-boot`](../tracks/spring-boot/). Not React.

Optional 03/04 are Phase 6 side paths. Skip them on the Java career track.

---

## Sheets (topic library)

| Sheet | Folder | Used by |
|-------|--------|---------|
| HTML | [docs/html/](./docs/html/) | Project 00 (Phase 2) |
| CSS | [docs/css/](./docs/css/) | Project 00 (Phase 2) |
| Java (Layers A–C + Layer D picture) | [docs/java/](./docs/java/) · [server-layers](./docs/java/server-layers.md) | Foundation → 05 → Spring Boot |
| Setup | [docs/setup/](./docs/setup/) | Early projects |
| JavaScript (apply notes) | [docs/javascript/](./docs/javascript/) | Project 01 |
| Git (apply only) | [docs/git/](./docs/git/) | Links CS Git |
| Docker (apply only) | [docs/docker/](./docs/docker/) | Links CS Docker · project 02 |
| Node / npm | [docs/nodejs/](./docs/nodejs/) · [npm](./docs/npm/) | Optional 03 |
| React / TS | [docs/react/](./docs/react/) · [typescript](./docs/typescript/) | Optional 04 |

Deep theory for networks, Docker, Git lives in **`tracks/computer-science/`**. Not recopied here.

---

## Beginner rule

1. Type commands yourself.  
2. `pwd` / `ls` before creating files.  
3. Stop at checkpoints.  
4. Prefer one small win per session.

---

## After the spine projects

**Main (Java):** Gates A–D → [`tracks/spring-boot`](../tracks/spring-boot/) (Layer F).

**Optional (Phase 6):** [typescript](./docs/typescript/) if you took React.

**→ [Roadmap](./docs/roadmap.md)** · **→ [LEARNING_PATH](../docs/LEARNING_PATH.md)**
