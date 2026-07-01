# Troubleshooting — CLI Tool

## npm install fails

### `EACCES` permission errors

Don't use `sudo npm install` in projects. Fix npm permissions or use [nvm](https://github.com/nvm-sh/nvm).

### `ENOENT package.json`

Run commands from project root where `package.json` lives.

---

## Module errors

### `Cannot find module 'commander'`

```bash
npm install
```

Run from folder with `package.json`.

### `require() of ES Module not supported` (chalk)

Chalk 5 is ESM-only. Either:

```bash
npm install chalk@4
```

Or add `"type": "module"` and convert to `import` syntax.

---

## Runtime errors

### `Missing WEATHER_API_KEY`

This curriculum uses Open-Meteo — no key. Remove old OpenWeatherMap env checks from copied tutorials.

### `weather: command not found` after npm link

```bash
cd projects/03-cli-tool
npm link
which weather    # Should show path
```

Restart terminal. On Windows, check npm global bin path is in PATH.

### Axios 404 / city not found

Same as Project 1 — check geocoding `results` array is empty.

---

## Shebang / execution

### `env: node: No such file or directory`

Node not in PATH. Use `node bin/weather.js` or reinstall Node LTS.

---

## package.json / bin

### Command runs wrong file

Check `"bin"` field matches actual path:

```json
"bin": {
  "weather": "./bin/weather.js"
}
```

---

## Debugging tips

```bash
node --trace-warnings bin/weather.js london
echo $?                    # Exit code of last command
DEBUG=* node bin/weather.js london   # If you add debug package later
```

Log `process.argv` to see raw arguments:

```javascript
console.log(process.argv);
// ['node', '/path/bin/weather.js', 'london', '--forecast']
```

---

## Getting help

Include: Node version, npm version, full error, command you ran.

See [FAQ](./faq.md) and [npm guide](../../../docs/npm/README.md).
