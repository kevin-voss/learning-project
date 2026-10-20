# learning-project

Local curriculum: **CS from the ground up → web basics → Java (focus) → small projects → Spring / architecture.**

**Start:** [`docs/LEARNING_PATH.md`](docs/LEARNING_PATH.md) · visual index: [`hub/index.html`](hub/index.html)

Pattern everywhere: **read a short sheet → build a small related project → next step.**

## Buckets

| Path | Role |
|------|------|
| [`hub/`](hub/index.html) | Landing |
| [`docs/LEARNING_PATH.md`](docs/LEARNING_PATH.md) | **One** ordered spine |
| [`tracks/computer-science/`](tracks/computer-science/README.md) | CS, networks, Git/Docker *intros* |
| [`tracks/java/`](tracks/java/README.md) | Java language path (detail + simple examples) |
| [`tracks/architecture/`](tracks/architecture/index.html) | System-design concepts |
| [`tracks/spring-boot/`](tracks/spring-boot/README.md) | Build services (ParcelPilot) |
| [`tracks/ai/`](tracks/ai/README.md) | AI engineering cheatsheet (RAG, agents, MCP) |
| [`drills/javascript/`](drills/javascript/README.md) | JS repetition (`make test`) |
| [`apps/codestep/`](apps/codestep/README.md) | Guided JS / TS UI |
| [`apps/todo-e2e/`](apps/todo-e2e/README.md) · [`apps/pokedex/`](apps/pokedex/README.md) | Java fullstack ladder |
| [`projects/`](projects/README.md) | Sheets + small portfolio builds |
| [`docs/learner-memory/`](docs/learner-memory/README.md) | Long-term learner profile |
| [`programs/code-for-cleaning/`](programs/code-for-cleaning/README.md) | Optional Java practice |

```
learning-project/
├── README.md · AGENTS.md · Makefile · .gitignore
├── hub/
├── docs/           # LEARNING_PATH, codestep, learner-memory
├── drills/javascript/
├── apps/           # codestep, todo-e2e, pokedex
├── tracks/         # java, computer-science, architecture, spring-boot, certifications
├── projects/       # 00 static → 01 weather → 05 java CLI → 02 docker → optional 03/04
└── programs/
```

## Quick commands

```bash
# JS drills
make test

# CodeStep
cd apps/codestep && bun install && bun run dev

# CS demos after edits
node tracks/computer-science/scripts/verify-demos.mjs
```

## Cursor

Rules: [`.cursor/rules/`](.cursor/rules/). Skills: `learner-memory`, `caveman`. Commands: `/path`, `/learning-path`, `/reflect`.

Agents: [`AGENTS.md`](AGENTS.md).
