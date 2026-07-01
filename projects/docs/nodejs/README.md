# Node.js

**When:** Project 3 (CLI tool). Skim browser-vs-Node before that; deep read during Project 3 Phase 1.

**Roadmap:** [Project 3 Phase 1](../roadmap.md#phase-1--environment-1-h)

---

## One-sentence definition

**Node.js** runs JavaScript on your computer — outside the browser.

## Browser JavaScript vs Node.js

| | Browser JS | Node.js |
|---|------------|---------|
| **Runs where** | Chrome, Firefox, Safari | Your Mac/PC/Linux |
| **Main job** | Web pages, DOM | Files, servers, CLI |
| **Read local files?** | No | Yes (`fs`) |
| **`document` / `window`?** | Yes | No |
| **Output** | HTML on screen | Terminal text |
| **Example** | Weather dashboard UI | `weather london` CLI |

Same language, different environment — like English in different countries.

## What is Node.js technically?

1. **V8** — Chrome's JavaScript engine
2. **Bindings** — OS access (files, network, processes)
3. **Event loop** — async without freezing

Installing Node from [nodejs.org](https://nodejs.org/) gives you:

- `node` — run `.js` files
- **npm** — package manager ([npm guide](../npm/README.md))

## Running JavaScript

```bash
node app.js
```

No HTML required. File runs top to bottom.

## Built-in modules

| Module | Purpose |
|--------|---------|
| `fs` | Read/write files |
| `path` | Cross-platform paths |
| `os` | System info |
| `http` | Web servers (advanced) |
| `process` | argv, env, exit codes |

```javascript
console.log(process.argv.slice(2));
```

Run: `node read-args.js hello` → `['hello']`

## `process.argv`

```
node cli.js london --forecast
         argv[2]     argv[3]
```

Use **Commander** in Project 3 instead of parsing manually.

## Exit codes

- **0** = success
- **Non-zero** = error

```javascript
if (!city) {
  console.error('City required');
  process.exit(1);
}
```

## Environment variables

```bash
export MY_SECRET=abc123
```

```javascript
const secret = process.env.MY_SECRET;
```

Project 3: use `.env` + **dotenv** (optional for weather — Open-Meteo needs no key).

## Shebang

```javascript
#!/usr/bin/env node
```

First line of CLI entry file — run as `./weather.js` with `chmod +x`.

## node vs npm vs npx

| Tool | Purpose |
|------|---------|
| **node** | Run JS files |
| **npm** | Install packages |
| **npx** | Run package once (`npx serve .`) |

## Version

Install **LTS** (v20 or v22). Check: `node -v`

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `document.getElementById` in Node | Browser-only |
| Wrong folder | `cd` to project root |
| `node app.js` vs `npm start` | `npm start` runs `package.json` script |

## In this curriculum

```
Project 1  →  browser: fetch, DOM
Project 2  →  Docker serves static files (Node not in container)
Project 3  →  Node runs your CLI ⭐
Project 4  →  Node runs Vite dev server; React in browser
```

## Further reading

- [Node.js API docs](https://nodejs.org/docs/latest/api/)
- [npm](../npm/README.md)
- [03 CLI step-by-step](../../03-cli-tool/docs/step-by-step.md)
