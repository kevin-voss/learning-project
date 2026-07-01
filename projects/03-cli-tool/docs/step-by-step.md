# Step-by-Step — CLI Tool

Choose **one** option: [Weather](./options/weather-cli.md) · [Task manager](./options/task-manager.md) · [File organizer](./options/file-organizer.md)

Learn topics **per phase** — see [Roadmap — Project 3](../../docs/roadmap.md#project-3--cli-tool).

---

## How to use this guide

A CLI is just a program you talk to by typing commands.

Move through each phase like this:

```text
Check tools -> Create files -> Run command -> Read output -> Fix one thing
```

If the terminal prints an error, read the first line slowly. It usually tells you the file or command that went wrong.

---

## Phase 1: Environment (≈1 hour)

**Learn:** [Node.js: first 3 sections](../../docs/nodejs/README.md)

**Goal:** Prove Node and npm work.

**Why:** Browser JavaScript runs in the browser. CLI JavaScript runs with Node.js.

**Do:**
```bash
cd projects/03-cli-tool
pwd
node -v
npm -v
git init
```

- [ ] `node -v` prints a version
- [ ] `npm -v` prints a version
- [ ] `git init`
- [ ] Read [concepts.md](./concepts.md) — skim CLI vocabulary

**Apply:** Explain Node vs browser in one sentence.

---

## Phase 2: npm project setup (≈1 hour)

**Learn:** [npm: commands + package.json](../../docs/npm/README.md) (through package.json section)

**Goal:** Create a real npm project with an entry file.

**Why:** `package.json` is the ID card for your Node project. It tells npm how your project works.

**Do:**

```bash
npm init -y
mkdir -p bin src/commands src/utils src/config
touch bin/weather.js src/index.js
```

- [ ] Run `npm init -y`
- [ ] Edit `package.json`: set `description`, `author`, `license` (MIT)
- [ ] Add shebang as first line: `#!/usr/bin/env node`
- [ ] Add `"bin"` field pointing to your entry file
- [ ] Add `"scripts": { "start": "node bin/weather.js" }`

Put a tiny test in `bin/weather.js`:

```javascript
#!/usr/bin/env node

console.log('Hello from my CLI');
```

**Checkpoint:** `node bin/weather.js` runs (even if it only prints "hello").

---

## Phase 3: Install dependencies (≈30 min)

**Learn:** [npm: node_modules rules](../../docs/npm/README.md#node_modules-rules)

**Build:**
Weather CLI:

```bash
npm install commander chalk ora axios dotenv
```

Task manager:

```bash
npm install commander chalk inquirer
```

File organizer:

```bash
npm install commander chalk
```

- [ ] Confirm `node_modules/` appeared
- [ ] Confirm `package.json` lists dependencies
- [ ] Confirm `package-lock.json` created — **commit this file**

**Why:** `node_modules/` is the downloaded toolbox. `package-lock.json` is the exact shopping receipt so another computer can install the same versions.

---

## Phase 4: CLI parsing (≈2 hours)

**Learn:** [Node.js: argv, exit codes, shebang](../../docs/nodejs/README.md)

**Build:**
- [ ] Set up Commander in `bin/weather.js`
- [ ] Program name, description, version
- [ ] `--help` and `--version` work
- [ ] Main argument: `<city>` (or subcommands for task/organize)
- [ ] Options: `--unit`, `--forecast` (weather) or equivalent
- [ ] On missing required input: print help, `process.exit(1)`

**Checkpoint:** `node bin/weather.js --help` shows usage.

Beginner check: if `--help` works, your CLI can listen to arguments.

---

## Phase 5: Core logic (≈4 hours)

**Learn:** [JavaScript: Project 3](../../docs/javascript/by-project.md#project-3--cli-tool-nodejs) · your [option guide](./options/)

**Build:**
- [ ] Weather: API module + current weather command
- [ ] Weather: forecast command (optional flag)
- [ ] Task: read/write JSON file with `fs`
- [ ] Organizer: scan directory, move files by extension

- [ ] Use `try/catch` for errors
- [ ] Meaningful `console.error` messages
- [ ] `process.exit(1)` on failure

**Checkpoint:** Happy path works for real input.

---

## Phase 6: Polish output (≈2 hours)

- [ ] Use **chalk** for colors (title, errors, success)
- [ ] Use **ora** spinner during API calls (weather)
- [ ] Align columns or use simple tables for lists
- [ ] `--help` text is clear and complete

**Checkpoint:** Output looks intentional, not raw JSON.

---

## Phase 7: Secrets and config (≈1 hour)

**Learn:** [Git: .gitignore](../../docs/git/README.md#gitignore) · [Node.js: env vars](../../docs/nodejs/README.md#environment-variables)

**Build (weather CLI):** Skip `.env` — Open-Meteo needs no key. Optional: add `DEBUG=1` in `.env` to practice dotenv.

**Build (other options):** Store task JSON in `src/storage/` — add path to `.gitignore` if personal data.

- [ ] Optional: `.env.example` + `dotenv` with `DEBUG=1` to learn the pattern
- [ ] Verify `.env` is in `.gitignore` if you use one

**Checkpoint:** No secrets in committed files.

---

## Phase 8: npm link and test (≈2 hours)

**Learn:** [npm: link & npx](../../docs/npm/README.md#npm-link-project-3)

**Build:**
```bash
chmod +x bin/weather.js    # Mac/Linux
npm link
weather london
weather --help
weather notrealcity999     # Should error gracefully
```

- [ ] Test edge cases from option guide
- [ ] Test wrong flags
- [ ] `npm unlink -g` when switching machines

---

## Phase 9: Document and publish (≈2 hours)

- [ ] Write README: install, usage, examples, env setup
- [ ] Push to GitHub
- [ ] Optional: `npm login` → `npm publish --dry-run` → `npm publish`
- [ ] Optional: `npm install -g your-package` on another machine

---

## Success checklist

- [ ] Explain Node vs browser JS
- [ ] Explain `package.json`, `dependencies`, `bin`
- [ ] Use 10+ npm commands from memory
- [ ] Parse CLI args with Commander
- [ ] Handle errors with exit code 1
- [ ] Optional: practice `.env` pattern (not required for Open-Meteo weather CLI)

---

## Stuck?

- [FAQ](./help/faq.md)
- [Troubleshooting](./help/troubleshooting.md)
- [Code reference](./code-reference.md)

## Next project

→ [04-react-todo-app](../04-react-todo-app/)
