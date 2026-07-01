# Concepts — CLI Tool

Keywords for Node.js CLI development. Read when [Roadmap Project 3](../../docs/roadmap.md#project-3--cli-tool) points you here.

Deep dives: [Node.js](../../docs/nodejs/README.md) · [npm](../../docs/npm/README.md)

## CLI (Command Line Interface)

Text-based control — you type commands, program prints text.

```
$ weather london --unit metric
  │       │         │
  │       │         └── option (flag)
  │       └── argument (city name)
  └── program name
```

**Why learn CLI?** Automation, servers without GUIs, speed, and every professional dev tool (`git`, `npm`, `docker`) is CLI-first.

## Node.js

JavaScript **outside the browser**.

| Browser | Node.js |
|---------|---------|
| `document`, `window` | `fs`, `path`, `process` |
| DOM updates | Terminal output |
| `fetch` (built-in) | `fetch` (modern Node) or `axios` (npm) |
| Can't read local files | `fs.readFile`, `fs.writeFile` |

Run a file: `node bin/weather.js london`

## npm

Package manager bundled with Node. Installs libraries into `node_modules/` and records them in `package.json`.

```bash
npm init -y
npm install commander chalk ora axios
npm install dotenv --save
```

See full guide: [npm](../../docs/npm/README.md).

## package.json

Project manifest:

- **name** — package name
- **bin** — maps command name to executable file (makes `weather` runnable globally after `npm link`)
- **scripts** — shortcuts like `npm start`
- **dependencies** — packages needed at runtime

## Shebang

First line of executable scripts:

```javascript
#!/usr/bin/env node
```

Tells the OS to run this file with Node. Required for `./weather.js` and `bin` entries.

Also run: `chmod +x bin/weather.js` (Mac/Linux).

## stdin / stdout / stderr

| Stream | Direction | In code |
|--------|-----------|---------|
| **stdin** | Input to program | `process.stdin` |
| **stdout** | Normal output | `console.log()` |
| **stderr** | Errors | `console.error()` |

Errors on stderr stay visible even when stdout is redirected to a file.

## Exit codes

When program finishes:

- **0** — success
- **1** (or other non-zero) — failure

```javascript
process.exit(1);
```

Scripts and CI check exit codes to decide whether to continue.

## Environment variables

Key-value config outside your code — used for secrets in many CLIs.

```bash
# .env (optional practice — weather CLI doesn't need this)
DEBUG=1
```

```javascript
require('dotenv').config();
const debug = process.env.DEBUG === '1';
```

Weather uses Open-Meteo (no key). Use `.env` optionally to learn the pattern.

## Commander.js

Library that parses `argv` into structured options and arguments — saves you from manual `process.argv` parsing.

## Modules in Node

CommonJS (this curriculum):

```javascript
const fs = require('fs');
module.exports = getWeather;
```

ES modules (optional, `"type": "module"` in package.json):

```javascript
import fs from 'fs';
export default getWeather;
```

Stick with CommonJS unless you're comfortable with both.

## Architecture

```
User types command
    → bin/weather.js (entry)
    → Commander parses args
    → src/commands/current.js (logic)
    → src/utils/api.js (HTTP)
    → chalk/ora format output to terminal
    → exit 0 or 1
```

## Further reading

- [Step-by-step](./step-by-step.md)
- [Options: Weather CLI](./options/weather-cli.md)
- [Code reference](./code-reference.md)
