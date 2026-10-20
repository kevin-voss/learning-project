# Project 3: CLI Tool

**Optional Node.js practice - command-line weather, not on the main Java spine.**

Build a **Weather CLI** - a terminal program that fetches weather (same API ideas as Project 1). You learn npm, Node.js, and how real developer tools work.

> **Scope**
>
> | | |
> |---|---|
> | **Phase** | Phase 6 (**optional**) |
> | **Hours** | about 10–15 |
> | **Java path** | **Off** the main spine. Only after Java Layers A–B feel solid. Or skip. Java HTTP CLI is [05](../05-java-weather-cli/), not this project. |

## Status

This folder contains **guides only**. You create all JavaScript, `package.json`, and project files yourself.

## Where this sits

[Learning path - Phase 6 (optional web depth)](../../docs/LEARNING_PATH.md#phase-6--optional-web-depth-node--react--ts)

## Prerequisites

- Java Layers A–B solid (or you accept this is side practice)
- Finished [Project 1](../01-weather-dashboard/) (API concepts carry over)
- [Node.js](../docs/nodejs/README.md) - Phase 1 of this project
- [npm](../docs/npm/README.md) - Phase 2 of this project
- Node.js LTS installed (`node -v`, `npm -v`)

## What you'll build

```
$ weather london
London, UK
Temperature: 15°C
Humidity: 72%
Conditions: cloudy

$ weather paris --unit imperial --forecast
$ weather --help
```

Older options (task manager, file organizer) are **removed** - follow Weather CLI only.

## Goal in plain words

You will build a program that runs in the terminal instead of the browser.

```text
User types command -> Node.js prints an answer
```

## Documentation map

| Doc | Read when |
|-----|-----------|
| [Concepts](./docs/concepts.md) | CLI, Node, npm, stdin/stdout, exit codes |
| [Project structure](./docs/structure.md) | Folders and files YOU will create |
| [Step-by-step plan](./docs/step-by-step.md) | **Main build guide** |
| [Code reference](./docs/code-reference.md) | Example snippets |
| [Weather CLI guide](./docs/options/weather-cli.md) | Command design and edge cases |
| [Help: FAQ](./docs/help/faq.md) | Quick answers |
| [Help: Troubleshooting](./docs/help/troubleshooting.md) | npm and runtime errors |
| [Help: Glossary](./docs/help/glossary.md) | Term definitions |

## Files you will create

```
03-cli-tool/
├── bin/
│   └── weather.js
├── src/
│   ├── index.js
│   ├── commands/
│   ├── utils/
│   └── config/
├── package.json
├── .env                    # Optional - not needed for weather CLI
├── .gitignore              # already here
└── README.md
```

Do **not** create these until [step-by-step](./docs/step-by-step.md) tells you to.

## Learning goals

When finished, you can explain:

- Browser JavaScript vs Node.js
- What `package.json` and `node_modules` are
- How `npm install` and `npm link` work
- Command-line arguments and `--help`
- Environment variables for secrets (optional practice)
- Exit codes and `process.exit()`

## Quick start

```bash
cd projects/03-cli-tool
pwd
node -v
npm -v
```

Then:

1. Skim [Weather CLI](./docs/options/weather-cli.md).
2. Follow [step-by-step](./docs/step-by-step.md).

## Resources

- [Node.js docs](https://nodejs.org/docs/latest/api/)
- [npm docs](https://docs.npmjs.com/)
- [Commander.js](https://github.com/tj/commander.js)

## Next

Optional sibling: [04 React Todo App](../04-react-todo-app/). Main spine stays Java → Layer D → [todo-e2e](../../apps/todo-e2e/).
