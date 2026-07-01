# Beginner Project Curriculum

Four hands-on projects that build on each other. You know **HTML**, **CSS**, and basic **JavaScript** (arrays, functions, loops). Everything else is learned **while you build**.

**Important:** Documentation and scaffolding only — you write all code yourself.

---

## Start here (don't read everything first)

1. Open the **[Learning Roadmap](./docs/roadmap.md)** — project-first path with learn → build → apply per phase.
2. Begin **[Project 1](./01-weather-dashboard/)** Phase 1.
3. When a phase says **Learn**, open that topic page (5–15 min), then code.

```
Roadmap phase  →  Read linked topic page  →  Build  →  Next phase
```

Topic library (reference, not a prerequisite list): **[docs/](./docs/README.md)**

## Beginner rule: type, check, understand

For every project:

1. **Type the terminal commands yourself.** Do not just read them.
2. **Check where you are** with `pwd` before creating files.
3. **Check what exists** with `ls` after creating files.
4. **Ask why this file exists** before adding code to it.
5. **Stop at checkpoints.** A broken checkpoint usually means the next phase will be confusing.

Tiny example:

```bash
cd projects/01-weather-dashboard
pwd
ls
```

If `pwd` shows the wrong folder, fix that before running `mkdir`, `touch`, `npm`, or `docker` commands.

---

## Project order

| # | Project | Focus | Time |
|---|---------|-------|------|
| 1 | [Weather Dashboard](./01-weather-dashboard/) | APIs, fetch, async/await, localStorage | 8–12 h |
| 2 | [Docker Portfolio](./02-docker-portfolio/) | Docker, Nginx, terminal | 6–10 h |
| 3 | [CLI Tool](./03-cli-tool/) | Node.js, npm, CLI | 10–15 h |
| 4 | [React Todo App](./04-react-todo-app/) | Components, hooks, JSX | 12–18 h |

**Total:** ~47–60 hours.

---

## Topic folders (read when roadmap says so)

| Topic | Folder | First needed |
|-------|--------|--------------|
| Setup & tools | [docs/setup/](./docs/setup/) | Project 1 |
| JavaScript (new syntax) | [docs/javascript/](./docs/javascript/) | Project 1 Phase 2+ |
| Git | [docs/git/](./docs/git/) | Project 1 Phase 1 |
| Docker | [docs/docker/](./docs/docker/) | Project 2 |
| Node.js | [docs/nodejs/](./docs/nodejs/) | Project 3 |
| npm | [docs/npm/](./docs/npm/) | Project 3–4 |
| React | [docs/react/](./docs/react/) | Project 4 |
| TypeScript | [docs/typescript/](./docs/typescript/) | After Project 4 |

---

## Each project folder

```
project-name/
├── README.md
├── docs/
│   ├── concepts.md
│   ├── step-by-step.md    ← build checklist (+ learn links per phase)
│   ├── structure.md
│   └── help/
└── .gitignore
```

1. Project **README** — overview  
2. **[Roadmap](./docs/roadmap.md)** — where you are in the big picture  
3. **step-by-step.md** — what to build this session  
4. **help/** — when stuck  

Most project guides now use this rhythm:

```text
Goal -> Why -> Do -> Checkpoint
```

That means you should know what you are building, why it matters, exactly what to type or edit, and how to know it worked before moving on.

---

## What you will NOT find

- Pre-written `index.html`, `.css`, `.js`, or `.jsx` files  
- A finished app you run without building it  

---

## After all four

- Fetch APIs, Dockerize sites, build CLIs, build React apps  
- Next: [TypeScript](./docs/typescript/README.md) or [`frontend/`](../frontend/) CodeStep  

**→ [Open the Roadmap — Project 1 Phase 1](./docs/roadmap.md#project-1--weather-dashboard)**
