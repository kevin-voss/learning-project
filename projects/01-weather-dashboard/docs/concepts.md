# Concepts — Weather Dashboard

Keywords explained for beginners. Read before writing code.

## API (Application Programming Interface)

**Simple:** A waiter between your app and a data kitchen.

You don't access the weather database directly. You send a structured request; the API returns JSON.

```
You (browser)  →  API  →  Weather service  →  API  →  You
     "London?"                              { temp: 15, ... }
```

**In this project:** [Open-Meteo](https://open-meteo.com/) — **free, no account, no API key.**

Kid version:

- You ask: "Weather for London, please."
- The API checks the weather service.
- The API gives back a neat data package.
- Your app reads that package and shows it nicely.

Two steps:

1. **Geocoding** — city name → latitude & longitude  
2. **Forecast** — lat/lon → current weather + daily forecast

```
https://geocoding-api.open-meteo.com/v1/search?name=London&count=1
https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=-0.12&current=...
```

Why two steps? Weather APIs usually need coordinates, not just a city name. "London" could mean London in the UK, Canada, or another place. Geocoding helps your app turn a human city name into exact map numbers.

## HTTP (HyperText Transfer Protocol)

The language of the web. For this project you only need **GET** (read data).

| Method | Use | This project |
|--------|-----|--------------|
| GET | Fetch data | ✅ Weather lookup |
| POST | Send new data | ❌ Not needed |
| PUT/PATCH | Update | ❌ |
| DELETE | Remove | ❌ |

### Status codes (memorize these)

| Code | Meaning | Your app should |
|------|---------|-----------------|
| 200 | OK | Show weather |
| 404 | Not found | Rare for Open-Meteo; handle empty geocode results instead |
| 429 | Too many requests | "Try again later" |
| 500 | Server error | "Service unavailable" |

## Test the API with `curl`

Before JavaScript touches the API, ask the API from the terminal.

Run:

```bash
curl "https://geocoding-api.open-meteo.com/v1/search?name=London&count=1"
```

You should see text that looks like this:

```json
{
  "results": [
    {
      "name": "London",
      "latitude": 51.50853,
      "longitude": -0.12574,
      "country": "United Kingdom"
    }
  ]
}
```

What happened:

- `curl` is a terminal tool that asks a URL for data.
- The URL has a `?` after the path. Everything after `?` is a query string.
- `name=London` means "search for London."
- `count=1` means "only give me one result."

Now try a forecast URL using the latitude and longitude:

```bash
curl "https://api.open-meteo.com/v1/forecast?latitude=51.50853&longitude=-0.12574&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&forecast_days=1"
```

If `curl` works, your API is reachable. That makes JavaScript debugging easier later.

## JSON (JavaScript Object Notation)

Text format for data. Looks like JavaScript objects but keys must use double quotes.

Open-Meteo current weather (simplified):

```json
{
  "current": {
    "temperature_2m": 15.2,
    "relative_humidity_2m": 72,
    "wind_speed_10m": 3.5,
    "weather_code": 3
  },
  "daily": {
    "time": ["2026-07-01", "2026-07-02"],
    "temperature_2m_max": [16, 14],
    "weather_code": [3, 61]
  }
}
```

Geocoding response:

```json
{
  "results": [
    {
      "name": "London",
      "country": "United Kingdom",
      "latitude": 51.51,
      "longitude": -0.13
    }
  ]
}
```

In JS: `const data = await response.json();` then `data.current.temperature_2m`.

## Asynchronous programming

Network requests **take time**. Async code lets the page stay responsive.

### Coffee shop analogy

- **Sync:** Stand at counter until coffee is ready — can't do anything else
- **Async:** Order, get buzzer, sit down — buzzer means data is ready

### Promises and async/await

`fetch()` returns a **Promise** — "I will give you a response later."

### The common beginner mistake

This code looks reasonable, but it does not work the way beginners expect:

```javascript
const response = fetch('https://geocoding-api.open-meteo.com/v1/search?name=London&count=1');
console.log(response);
```

You do **not** get the weather data yet. You get a Promise.

A Promise is like a pizza receipt. The receipt is not the pizza. It only means, "pizza is coming later."

### Using `.then()`

One way to wait is `.then()`:

```javascript
fetch('https://geocoding-api.open-meteo.com/v1/search?name=London&count=1')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.results[0].name);
  });
```

This works, but many beginners find it harder to read when there are several steps.

### Using `async` and `await`

`async/await` lets async code read more like normal step-by-step instructions:

```javascript
async function getWeather(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

getWeather('London').then(console.log);
```

**Rules:**

- `async` functions always return a Promise
- `await` only works inside `async` functions
- Use `try/catch` around `await fetch` for errors

## Sync vs async

**Synchronous** means one thing finishes before the next thing starts.

```javascript
console.log('1. Put bread in toaster');
console.log('2. Wait at toaster');
console.log('3. Eat toast');
```

The order is simple: 1, 2, 3.

**Asynchronous** means one thing starts, then JavaScript can keep doing other work while it waits.

```javascript
console.log('1. Ask API for weather');

fetch('https://geocoding-api.open-meteo.com/v1/search?name=London&count=1')
  .then(() => {
    console.log('3. API answered');
  });

console.log('2. Page can still respond while waiting');
```

The output is usually:

```text
1. Ask API for weather
2. Page can still respond while waiting
3. API answered
```

That is why loading messages matter. The user needs to know the app is waiting, not broken.

## Fetch API

Built into browsers — no npm needed.

```javascript
const response = await fetch(url);

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const data = await response.json();
```

Steps: request → response → parse JSON → use data.

Beginner translation:

1. `fetch(url)` asks the internet for something.
2. `await fetch(url)` waits for the first answer.
3. `response.ok` tells you if the HTTP request worked.
4. `await response.json()` opens the data package.
5. Now you can use `data.current.temperature_2m`, `data.results[0].latitude`, etc.

## No API key needed (this project)

Open-Meteo is **public** — just call the URL. No signup.

Many production APIs *do* use keys (you'll learn that pattern in **Project 3** with `.env`). Here you focus on fetch, JSON, and async without account friction.

**Fair use:** Open-Meteo is for personal and learning use. Don't hammer the API with thousands of requests per minute.

## Weather codes

Open-Meteo uses **WMO weather codes** (numbers), not image URLs. Map them to text or emoji in `ui.js`:

| Code | Meaning |
|------|---------|
| 0 | Clear sky |
| 1–3 | Mainly clear → overcast |
| 45, 48 | Fog |
| 51–55 | Drizzle |
| 61–65 | Rain |
| 71–77 | Snow |
| 80–82 | Rain showers |
| 95 | Thunderstorm |

Full list: [Open-Meteo docs](https://open-meteo.com/en/docs)

## localStorage

Browser database that survives refresh.

```javascript
localStorage.setItem('recentSearches', JSON.stringify(['London', 'Paris']));
const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
```

Only stores strings — use `JSON.stringify` / `JSON.parse` for arrays.

## DOM manipulation

You'll select elements and update them:

```javascript
document.getElementById('temperature').textContent = '15°C';
document.getElementById('error').style.display = 'block';
```

See [MDN DOM introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction).

## Application flow

```
User submits city
    → Validate input
    → Show loading
    → fetch geocoding API (city → lat/lon)
    → if no results: "City not found"
    → fetch forecast API (lat/lon → weather)
    → Success: update UI → save recent search
    → Error: show message → hide loading
```

Draw this on paper before coding.

## CORS and local server

Opening `index.html` as `file://` often breaks `fetch`. Serve via Live Server or `npx serve .` — see [setup/getting-started](../../docs/setup/getting-started.md).

## Open-Meteo endpoints

| API | URL base | Purpose |
|-----|----------|---------|
| Geocoding | `geocoding-api.open-meteo.com/v1/search` | City → coordinates |
| Forecast | `api.open-meteo.com/v1/forecast` | Current + daily forecast |

Docs: https://open-meteo.com/en/docs

## Further reading

- [Step-by-step plan](./step-by-step.md)
- [Code reference](./code-reference.md) — example snippets when you're ready to type
