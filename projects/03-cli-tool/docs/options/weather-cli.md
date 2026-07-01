# Weather CLI Option

Recommended path — reuses **Open-Meteo** from Project 1 (no API key).

## Commands to implement

| Command | Behavior |
|---------|----------|
| `weather <city>` | Current conditions |
| `weather <city> -f` | 5-day forecast summary |
| `weather <city> -u imperial` | Fahrenheit (optional — convert from °C) |
| `weather --help` | Usage text |
| `weather --version` | 1.0.0 |

## Dependencies

```bash
npm install commander chalk ora
```

No `axios` or `dotenv` required unless you want them — `fetch` works in Node 18+.

## No `.env` needed

Same public API as Project 1. Copy your geocode + forecast logic from `api.js`.

You'll learn **`.env` for secrets** in Project 3 using a optional example (fake API key exercise) or when adding a keyed API later.

## Error cases

| Situation | User sees | Exit code |
|-----------|-----------|-----------|
| Missing city | Help or usage hint | 1 |
| Invalid city | `City "x" not found` | 1 |
| Network failure | `Failed to fetch weather` | 1 |

## Milestones

1. `node bin/weather.js london` prints formatted output
2. chalk colors + ora spinner
3. `--forecast` flag
4. `npm link` → `weather` works globally

## See also

[Code reference](../code-reference.md) · [Project 1 api.js pattern](../../01-weather-dashboard/docs/code-reference.md)
