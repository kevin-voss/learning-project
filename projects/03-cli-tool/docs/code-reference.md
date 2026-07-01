# Code Reference — CLI Tool

Snippets to study and type — not pre-built files.

---

## package.json (weather CLI example)

```json
{
  "name": "weather-cli",
  "version": "1.0.0",
  "description": "Weather forecasts in your terminal",
  "main": "bin/weather.js",
  "bin": {
    "weather": "./bin/weather.js"
  },
  "scripts": {
    "start": "node bin/weather.js"
  },
  "keywords": ["cli", "weather"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "chalk": "^4.1.2",
    "commander": "^11.0.0",
    "ora": "^5.4.1"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

Node 18+ has built-in `fetch` — no axios required.

---

## bin/weather.js — entry point

```javascript
#!/usr/bin/env node
'use strict';

const { Command } = require('commander');
const getCurrentWeather = require('../src/commands/current');
const getForecast = require('../src/commands/forecast');

const program = new Command();

program
  .name('weather')
  .description('Get weather in your terminal (Open-Meteo, no API key)')
  .version('1.0.0');

program
  .argument('<city>', 'City name')
  .option('-f, --forecast', 'Show 5-day forecast')
  .action(async (city, options) => {
    try {
      if (options.forecast) {
        await getForecast(city);
      } else {
        await getCurrentWeather(city);
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);
```

---

## src/utils/api.js (Open-Meteo — same as Project 1)

```javascript
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

async function geocodeCity(city) {
  const url = `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Geocoding failed (${response.status})`);
  const data = await response.json();
  if (!data.results?.length) throw new Error(`City "${city}" not found`);
  return data.results[0];
}

async function getWeatherForCity(city) {
  const place = await geocodeCity(city);
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    timezone: 'auto',
    forecast_days: '5',
    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
  });
  const response = await fetch(`${WEATHER_URL}?${params}`);
  if (!response.ok) throw new Error(`Weather failed (${response.status})`);
  const weather = await response.json();
  return { place, weather };
}

module.exports = { getWeatherForCity };
```

---

## src/commands/current.js

```javascript
const chalk = require('chalk');
const ora = require('ora');
const { getWeatherForCity } = require('../utils/api');

async function getCurrentWeather(city) {
  const spinner = ora('Fetching weather...').start();
  try {
    const { place, weather } = await getWeatherForCity(city);
    const c = weather.current;
    spinner.stop();
    console.log('');
    console.log(chalk.bold.cyan(`  ${place.name}, ${place.country}`));
    console.log(chalk.yellow(`  ${Math.round(c.temperature_2m)}°C`));
    console.log(chalk.gray(`  Humidity: ${c.relative_humidity_2m}%`));
    console.log(chalk.gray(`  Wind: ${c.wind_speed_10m} km/h`));
    console.log('');
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

module.exports = getCurrentWeather;
```

---

## Task manager — storage helper

```javascript
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../storage/tasks.json');

function loadTasks() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function saveTasks(tasks) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks };
```

---

## Optional: `.env` exercise (not needed for weather)

If you want to practice env vars without a real secret:

`.env.example`:
```
DEBUG=0
```

```javascript
require('dotenv').config();
if (process.env.DEBUG === '1') console.log('verbose logging');
```

Real API keys come later with keyed services — weather uses Open-Meteo with no key.

---

## Next

- [Weather option](./options/weather-cli.md)
- [Project 1 code reference](../../01-weather-dashboard/docs/code-reference.md)
