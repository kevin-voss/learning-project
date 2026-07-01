# FAQ — CLI Tool

## Do I need to finish Project 2 (Docker) first?

No. Project 3 only requires Project 1 concepts (for weather option) and Node/npm installed.

## What's the difference between `npm start` and `node bin/weather.js`?

`npm start` runs the `"start"` script from `package.json`, which typically calls `node bin/weather.js`. Same result, npm is a shortcut.

## What is `npm link` for?

Links your local project globally so typing `weather` runs your in-development code without publishing to npm.

## Should I commit `node_modules`?

**Never.** It's recreated with `npm install`. Do commit `package.json` and `package-lock.json`.

## CommonJS or ES modules?

This curriculum uses **CommonJS** (`require` / `module.exports`) for simplicity. Chalk 5+ is ESM-only — use Chalk 4.x or enable `"type": "module"` and use `import`.

### Where does the API key go?

**Weather CLI:** nowhere — Open-Meteo is public, same as Project 1.

**Optional:** use `.env` for `DEBUG=1` to practice the pattern before keyed APIs later.

## Can I use `fetch` instead of axios in Node?

Yes — Node 18+ has built-in `fetch`. Axios is fine too and shows how npm packages work.

## How do I unpublish from npm?

Within 72 hours: `npm unpublish package-name@version`. Be careful — prefer publishing a fixed version instead.

## `permission denied` running `./bin/weather.js`

```bash
chmod +x bin/weather.js
```

Or always use: `node bin/weather.js`

## Which option should I pick?

- **Weather** — best continuity from Project 1
- **Task manager** — best for learning file I/O
- **File organizer** — most "real utility" feeling

Only build one for the curriculum; try others later as practice.
