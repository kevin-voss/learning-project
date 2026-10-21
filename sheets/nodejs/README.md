# Node.js

> [!NOTE]
> A **look it up** page. It is not a step on the path. Open it when an extra project or a tutorial uses Node.js.

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

For bigger tools, a package like **Commander** reads the arguments for you.

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

Keep secrets in a `.env` file (never commit it) and load them with the **dotenv** package.

## Shebang

```javascript
#!/usr/bin/env node
```

First line of a command-line tool. After `chmod +x weather.js` you can run it as `./weather.js`.

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

## Where you meet it here

- The [React todo extra](../../projects/extras/react-todo/README.md): Node runs the Vite dev server, React runs in the browser.
- The JavaScript drills use **Bun**, a Node-like runtime. See [How the drills work](../../drills/javascript/README.md).

## Further reading

- [Node.js API docs](https://nodejs.org/docs/latest/api/)
- [npm](../npm/README.md)
