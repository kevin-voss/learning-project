# Project 1: Weather Dashboard

**Your first app that talks to the internet.**

Build a weather app where a person types a city, clicks Search, and sees real weather from a public weather service.

Think of this project like making a tiny weather robot:

1. You ask the robot, "What is the weather in London?"
2. The robot asks the internet.
3. The internet sends back data.
4. Your page turns that data into friendly text, numbers, and cards.

## Status

This folder contains **guides only**. You create all HTML, CSS, and JavaScript files yourself.

That is on purpose. You learn more by making the folders and files with your own hands.

## Prerequisites

- HTML, CSS, basic JS (arrays, functions, loops)
- [Getting Started](../docs/setup/getting-started.md) — editor, Git, local server (Phase 1 only)
- [Learning Roadmap](../docs/roadmap.md) — **start here for phase order**
- **No account needed** — we use [Open-Meteo](https://open-meteo.com/) (free public API)

## Project goal

By the end, your app should:

- Let the user search for a city
- Ask an API for that city's location
- Ask another API for the weather at that location
- Show current weather and a 5-day forecast
- Show friendly errors when something goes wrong
- Remember recent searches after refresh

The deeper goal is bigger than weather: you are learning how websites get data from other computers.

## What you'll build

| Feature | Skill learned |
|---------|---------------|
| City search | Forms, events, validation |
| Geocoding + forecast | Two-step API flow |
| Current weather display | DOM updates, objects |
| 5-day forecast | Daily data from JSON |
| Loading spinner | UX, async timing |
| Error messages | try/catch, empty results |
| Recent searches | localStorage, JSON |
| Responsive layout | CSS media queries |

**Time estimate:** 8–12 hours

## Read this order

| Doc | Read when |
|-----|-----------|
| [Project structure](./docs/structure.md) | First, to create folders/files in the terminal |
| [Concepts](./docs/concepts.md) | Before API work — API, HTTP, JSON, fetch, async |
| [Step-by-step plan](./docs/step-by-step.md) | **Main build guide** — follow this while coding |
| [Code reference](./docs/code-reference.md) | When you need example code patterns |
| [Help: FAQ](./docs/help/faq.md) | Quick answers |
| [Help: Troubleshooting](./docs/help/troubleshooting.md) | When something breaks |
| [Help: Glossary](./docs/help/glossary.md) | Term definitions |

## First terminal commands

From the repo root:

```bash
cd projects/01-weather-dashboard
pwd
mkdir -p css js assets
touch index.html css/styles.css js/api.js js/ui.js js/app.js
```

What those commands mean:

- `cd` moves you into this project folder.
- `pwd` prints where you are, so you can check you are in the right place.
- `mkdir -p` creates folders. The `-p` means "do not complain if they already exist."
- `touch` creates empty files.

After that, open [Project structure](./docs/structure.md) to understand what each file is for.

## Files you will create

```
01-weather-dashboard/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js       # Main logic, event listeners
│   ├── api.js       # fetch + Open-Meteo (geocode + forecast)
│   └── ui.js        # Update DOM, loading, errors
├── assets/          # Optional local icons
├── .gitignore
└── README.md
```

## Learning goals

When finished, you can explain:

- What an API is and why browsers use HTTP GET for weather data
- How to test an API with `curl` before using it in JavaScript
- How `fetch()` asks the internet for data
- Why `async/await` exists (network takes time)
- The difference between synchronous and asynchronous code
- How to chain two API calls (city → coordinates → weather)
- How to read the Network tab in DevTools
- HTTP status codes 200, 404, 500
- How to store and read JSON from localStorage

## Quick start

1. Open [Project structure](./docs/structure.md) and create the folders/files.
2. Run `git init` in this folder.
3. Open [Roadmap — Project 1 Phase 1](../docs/roadmap.md#phase-1--setup-1-h).
4. Follow [step-by-step](./docs/step-by-step.md).

## Resources

- [Open-Meteo API docs](https://open-meteo.com/en/docs)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)

## Next project

When deployed and working → [02-docker-portfolio](../02-docker-portfolio/)
