# Project Structure — CLI Tool

Layout depends slightly on which option you choose. Same core pattern for all.

## Weather CLI (recommended)

```
03-cli-tool/
├── bin/
│   └── weather.js          # #!/usr/bin/env node — entry point
├── src/
│   ├── commands/
│   │   ├── current.js      # weather <city>
│   │   └── forecast.js     # --forecast flag
│   ├── utils/
│   │   ├── api.js          # Open-Meteo geocode + forecast
│   │   ├── format.js       # chalk, weather codes
│   │   └── validate.js     # city name checks
│   └── config/             # optional
├── package.json
├── .env                    # optional — practice dotenv
├── .env.example            # optional
├── .gitignore
└── README.md
```

## Task manager CLI

```
03-cli-tool/
├── bin/
│   └── task.js
├── src/
│   ├── commands/
│   │   ├── add.js
│   │   ├── list.js
│   │   ├── complete.js
│   │   └── clear.js
│   ├── storage/
│   │   └── tasks.json      # Created at runtime — gitignore optional
│   └── utils/
│       └── format.js
├── package.json
└── ...
```

## File organizer CLI

```
03-cli-tool/
├── bin/
│   └── organize.js
├── src/
│   ├── organizer.js        # Main logic
│   └── categories.js       # Extension → folder map
├── package.json
└── ...
```

## package.json essentials

You create this with `npm init` then edit:

```json
{
  "name": "weather-cli",
  "version": "1.0.0",
  "bin": {
    "weather": "./bin/weather.js"
  },
  "scripts": {
    "start": "node bin/weather.js"
  },
  "dependencies": {}
}
```

After `npm install commander chalk`, dependencies fill in automatically.

## Responsibility split

| File | Does | Does not |
|------|------|----------|
| `bin/weather.js` | Parse CLI args, route to commands | Fetch API directly |
| `src/commands/*.js` | One user action per file | Parse raw argv |
| `src/utils/api.js` | HTTP only | Print colored output |
| `src/utils/format.js` | Terminal display | HTTP |

## `.env` (optional)

Weather CLI uses Open-Meteo — **no key**. Optional `.env` for learning:

```
DEBUG=1
```

## node_modules

Created by `npm install`. Never edit manually. Never commit. Can be huge — that's normal.

## Testing locally

```bash
npm link              # Makes `weather` available globally on your machine
weather london
npm unlink -g weather-cli   # Clean up when done
```

Or without link:

```bash
node bin/weather.js london
npm start -- london    # if start script passes args
```

## Git checkpoints

1. `npm init and folder structure`
2. `Add commander and basic --help`
3. `Add weather fetch and display`
4. `Add error handling and exit codes`
5. `Optional: dotenv exercise with DEBUG flag`
6. `Polish output with chalk and ora`

## Next

[Step-by-step plan](./step-by-step.md)
