# npm (Node Package Manager)

> [!NOTE]
> A **look it up** page. It is not a step on the path. Java projects use [Maven](../../tracks/java/topics/build-tools/index.html) instead of npm.

## One-sentence definition

**npm** is the app store and package manager for Node.js projects.

## What npm does

| Feature | Analogy |
|---------|---------|
| Install packages | Download apps |
| `package.json` | Installed apps list + settings |
| `node_modules/` | Where packages live |
| Scripts | Shortcuts: `npm start` |
| Publish | Share your package |

Comes free with Node.js.

## Essential commands

```bash
npm init -y
npm install commander chalk ora axios
npm i -D jest              # dev dependency
npm install -g create-vite # global (scaffolding)
npm uninstall commander
npm run test
npm start
npm list --depth=0
npm audit
```

## `package.json`

Created by `npm init`. Key fields:

```json
{
  "name": "weather-cli",
  "version": "1.0.0",
  "main": "bin/weather.js",
  "bin": { "weather": "./bin/weather.js" },
  "scripts": {
    "start": "node bin/weather.js"
  },
  "dependencies": {
    "commander": "^11.0.0"
  },
  "devDependencies": {},
  "engines": { "node": ">=18.0.0" }
}
```

| Field | Meaning |
|-------|---------|
| `name` | Package name (unique on npm if publishing) |
| `bin` | command name → file, for command-line tools |
| `scripts` | `npm run <name>` |
| `dependencies` | Required at runtime |
| `devDependencies` | Dev/test only |

## `npm install` flow

1. Reads `package.json`
2. Downloads from registry.npmjs.org
3. Writes to `node_modules/`
4. Updates `package-lock.json` — **commit this file**

## `node_modules/` rules

- Huge — normal
- Never edit manually
- Never commit — `.gitignore`
- Broken? `rm -rf node_modules && npm install`

## Version symbols

| Syntax | Meaning |
|--------|---------|
| `"5.3.0"` | Exact |
| `"^5.3.0"` | Compatible minor (`>=5.3.0 <6.0.0`) |
| `"~5.3.0"` | Patch only |

## Local vs global

| | Local | Global |
|---|-------|--------|
| Command | `npm i pkg` | `npm i -g pkg` |
| In package.json | Yes | No |
| Use | Project code | Tools like `create-vite` |

## `npm link`

Try your own command-line tool as if it were installed:

```bash
cd my-weather-cli
npm link
weather london   # works everywhere while you develop
npm unlink -g weather-cli
```

## `npx`

```bash
npm create vite@latest my-app -- --template react
npx serve .
```

Run without permanent global install.

## Security

- Secrets in `.env`, not `package.json`
- Run `npm audit`
- Check package names on npmjs.com

## Publishing (optional)

```bash
npm login
npm publish --dry-run
npm publish
```

## npm in the [React todo extra](../../projects/extras/react-todo/README.md)

```bash
npm create vite@latest react-todo-app -- --template react
npm install
npm run dev
npm run build
```

| Script | Purpose |
|--------|---------|
| `dev` | Dev server + hot reload |
| `build` | Production `dist/` |
| `preview` | Preview build |

## Troubleshooting

| Problem | Try |
|---------|-----|
| `command not found: npm` | Reinstall Node LTS |
| `ENOENT package.json` | Run from project root |
| Module not found | `npm install` |

## See also

[Node.js](../nodejs/README.md) · [React](../react/README.md)
