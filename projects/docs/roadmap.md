# Learning roadmap

**Start Project 1 now.** Read topic pages only when a phase below points you to them — not before.

You know: HTML, CSS, arrays, functions, loops. Everything else is learned **just in time**.

---

## How to use this page

| Column | Meaning |
|--------|---------|
| **Build** | Do this in the project (details in each project's `docs/step-by-step.md`) |
| **Learn** | Skim these pages (5–15 min), then code immediately |
| **Checkpoint** | You should be able to… before moving on |

Project folders:

- [01 Weather Dashboard](../01-weather-dashboard/)
- [02 Docker Portfolio](../02-docker-portfolio/)
- [03 CLI Tool](../03-cli-tool/)
- [04 React Todo App](../04-react-todo-app/)

---

# Project 1 — Weather Dashboard

**Goal:** Fetch real weather data and show it in the browser.  
**Guide:** [01 step-by-step](../01-weather-dashboard/docs/step-by-step.md)

### Phase 1 — Setup (~1 h)

| | |
|---|---|
| **Build** | `git init`, create folders, Live Server |
| **Learn** | [Setup](./setup/getting-started.md) · [Git: first commit](./git/README.md#first-time-setup-per-project) |
| **Checkpoint** | Geocoding test in DevTools returns `results[0].latitude` |

### Phase 2 — UI foundation (~2 h)

| | |
|---|---|
| **Build** | `index.html` structure, `css/styles.css`, responsive layout |
| **Learn** | [JavaScript: Project 1 basics](../javascript/by-project.md#project-1--weather-dashboard) — skip async row for now |
| **Checkpoint** | Page looks good in browser; form does nothing yet |

### Phase 3 — API layer (~2 h)

| | |
|---|---|
| **Build** | `js/api.js` with `fetch`, URL building, error checks |
| **Learn** | [01 concepts: API, HTTP, JSON, fetch](../01-weather-dashboard/docs/concepts.md) · [JS: async section](../javascript/by-project.md#project-1--weather-dashboard) |
| **Checkpoint** | One city returns JSON in console or via test call |

### Phase 4 — UI layer (~1 h)

| | |
|---|---|
| **Build** | `js/ui.js` — loading, errors, display weather fields |
| **Learn** | [JS: DOM rows](../javascript/by-project.md#project-1--weather-dashboard) · MDN [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) |
| **Checkpoint** | Fake data object updates the page |

### Phase 5 — Wire together (~2 h)

| | |
|---|---|
| **Build** | `js/app.js`, form submit, try/catch flow |
| **Learn** | [JS: events & try/catch](../javascript/by-project.md#project-1--weather-dashboard) |
| **Checkpoint** | Search "London" → real weather on screen |

### Phase 6 — Recent searches (~1 h)

| | |
|---|---|
| **Build** | localStorage save/load, clickable chips |
| **Learn** | [01 concepts: localStorage](../01-weather-dashboard/docs/concepts.md#localstorage) · [JS: JSON](../javascript/by-project.md#syntax-youll-see-for-the-first-time) |
| **Checkpoint** | Recent cities survive page refresh |

### Phase 7–9 — Forecast, polish, deploy

| | |
|---|---|
| **Build** | Forecast endpoint, edge cases, GitHub + Pages |
| **Learn** | [Git: daily workflow + Pages](./git/README.md) |
| **Checkpoint** | Live URL in README; no keys in Git |

**Project 1 done when:** You can explain API, fetch, and async/await to a friend.

---

# Project 2 — Docker Portfolio

**Goal:** Package a static site in Docker; run it anywhere.  
**Guide:** [02 step-by-step](../02-docker-portfolio/docs/step-by-step.md)

### Phase 1 — Prerequisites (~1 h)

| | |
|---|---|
| **Build** | Install Docker Desktop; `docker run hello-world` |
| **Learn** | [Docker: first half — concepts](./docker/README.md) (stop before "Checklist") |
| **Checkpoint** | Docker runs on your machine |

### Phase 2 — Portfolio site (~2–3 h)

| | |
|---|---|
| **Build** | HTML/CSS portfolio (or adapt Project 1 showcase) |
| **Learn** | [JS: Project 2 notes](../javascript/by-project.md#project-2--docker-portfolio) — relative paths matter |
| **Checkpoint** | Site works in Live Server |

### Phase 3–4 — Dockerfile & run (~3 h)

| | |
|---|---|
| **Build** | `Dockerfile`, `.dockerignore`, `docker build`, `docker run -p 8080:80` |
| **Learn** | [Docker: Dockerfile, Nginx, ports](./docker/README.md) · [Terminal cheat sheet](../02-docker-portfolio/docs/help/terminal-cheatsheet.md) |
| **Checkpoint** | `http://localhost:8080` serves your site from container |

### Phase 5–7 — Explore, Docker Hub, docs

| | |
|---|---|
| **Build** | `docker exec`, push to Docker Hub, update README |
| **Learn** | [Git: push + portfolio links](./git/README.md#connecting-projects-to-your-portfolio) |
| **Checkpoint** | Explain image vs container without notes |

---

# Project 3 — CLI Tool

**Goal:** JavaScript in the terminal via Node.js and npm.  
**Guide:** [03 step-by-step](../03-cli-tool/docs/step-by-step.md)

### Phase 1 — Environment (~1 h)

| | |
|---|---|
| **Build** | Verify `node -v`, `npm -v` |
| **Learn** | [Node.js: browser vs Node + process](./nodejs/README.md) (first 3 sections) |
| **Checkpoint** | `node -e "console.log('hi')"` works |

### Phase 2–3 — npm project & dependencies (~1.5 h)

| | |
|---|---|
| **Build** | `npm init -y`, folders, `npm install commander chalk …` |
| **Learn** | [npm: commands + package.json](./npm/README.md) (sections through `package.json`) |
| **Checkpoint** | `package.json` and `node_modules/` exist |

### Phase 4–5 — CLI parsing & logic (~6 h)

| | |
|---|---|
| **Build** | Commander setup, API or fs logic, error handling |
| **Learn** | [Node.js: argv, exit codes, env, shebang](./nodejs/README.md) · [JS: Project 3](../javascript/by-project.md#project-3--cli-tool-nodejs) · [Your option guide](../03-cli-tool/docs/options/) |
| **Checkpoint** | `node bin/your-cli.js args` runs correctly |

### Phase 6–9 — Polish, .env, npm link, publish

| | |
|---|---|
| **Build** | chalk/ora output, `.env`, `npm link`, README |
| **Learn** | [npm: link, npx, security](./npm/README.md) · [Git: ignore secrets](./git/README.md#gitignore) |
| **Checkpoint** | Typed command works globally after `npm link` |

---

# Project 4 — React Todo App

**Goal:** Component-based UI with hooks and persistence.  
**Guide:** [04 step-by-step](../04-react-todo-app/docs/step-by-step.md)

### Phase 1 — Scaffold (~1 h)

| | |
|---|---|
| **Build** | `npm create vite@latest`, `npm install`, `npm run dev` |
| **Learn** | [npm: Vite scripts](./npm/README.md#npm-in-project-4-react) · [React: what is React + JSX](./react/README.md) (sections 1–3) |
| **Checkpoint** | Dev server shows Vite welcome page |

### Phase 2–3 — Components (~2.5 h)

| | |
|---|---|
| **Build** | Component files, static layout in `App.jsx` |
| **Learn** | [React: components & props](./react/README.md) · [04 component guide](../04-react-todo-app/docs/component-guide.md) |
| **Checkpoint** | All placeholder components render |

### Phase 4–6 — State & CRUD (~5 h)

| | |
|---|---|
| **Build** | `useState`, add/toggle/delete, list rendering |
| **Learn** | [React: state & useState](./react/README.md) · [JS: Project 4 + spread](../javascript/by-project.md#project-4--react-todo-app) |
| **Checkpoint** | Full todo CRUD works |

### Phase 7–9 — Filters, edit, localStorage (~4 h)

| | |
|---|---|
| **Build** | Filter buttons, inline edit + `useRef`, `useEffect` save |
| **Learn** | [React: useEffect, useRef, lists](./react/README.md) |
| **Checkpoint** | Todos persist after refresh |

### Phase 10–11 — Polish & deploy

| | |
|---|---|
| **Build** | CSS, `npm run build`, deploy |
| **Learn** | [Git: deploy links](./git/README.md) · [TypeScript: what's next](./typescript/README.md) (optional peek) |
| **Checkpoint** | Portfolio-ready app with screenshot |

---

# After all four projects

| Next step | Doc |
|-----------|-----|
| TypeScript | [typescript/README.md](./typescript/README.md) |
| Larger React app | [`frontend/`](../../frontend/) CodeStep |
| Rebuild weather in React | [react/README.md](./react/README.md) + Project 1 API knowledge |

---

# Quick reference — which topic when?

| Topic | Project | Phase |
|-------|---------|-------|
| Setup / editor / server | 1 | 1 |
| Git init & commits | 1 | 1, 9 |
| DOM, events, objects | 1 | 2–5 |
| fetch, async, JSON | 1 | 3–6 |
| GitHub Pages | 1 | 9 |
| Docker, Nginx | 2 | 1–4 |
| Terminal commands | 2 | 4–5 |
| Node.js runtime | 3 | 1, 4–5 |
| npm, package.json | 3–4 | 2–3 |
| React, hooks, JSX | 4 | 1–9 |
| TypeScript | After 4 | — |

**Lost?** Open the project's `docs/help/troubleshooting.md` or return to this roadmap at your current phase.
