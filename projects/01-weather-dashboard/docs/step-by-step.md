# Step-by-Step — Weather Dashboard

Follow phases in order. **Don't read all topic docs upfront** — each phase links what you need.

**Big picture:** [Roadmap — Project 1](../../docs/roadmap.md#project-1--weather-dashboard)

**API:** [Open-Meteo](https://open-meteo.com/) — no account, no API key.

## How to use this guide

Each phase has:

- **Goal** — what you are trying to make
- **Why** — why this matters
- **Do** — exact actions and commands
- **Checkpoint** — how to know it worked

Do not rush. If a checkpoint fails, fix that before moving on.

## Phase 1: Setup (≈1 hour)

**Learn:** [Setup: tools & local server](../../docs/setup/getting-started.md) · [Git: first commit](../../docs/git/README.md#first-time-setup-per-project)

**Goal:** Create the empty project files yourself.

**Why:** Real projects are easier when every file has a job. You are building the house before decorating it.

**Do:**

From the repo root:

```bash
cd projects/01-weather-dashboard
pwd
git init
mkdir -p css js assets
touch index.html css/styles.css js/api.js js/ui.js js/app.js
ls
ls css
ls js
```

- [ ] `pwd` ends with `projects/01-weather-dashboard`
- [ ] `index.html` exists
- [ ] `css/styles.css` exists
- [ ] `js/api.js`, `js/ui.js`, and `js/app.js` exist
- [ ] Install Live Server or plan to use `npx serve .`
- [ ] Skim [structure.md](./structure.md)
- [ ] Skim [concepts.md](./concepts.md) — API/HTTP overview only

**Apply:** Test the public API in DevTools Console:

```javascript
fetch('https://geocoding-api.open-meteo.com/v1/search?name=London&count=1')
  .then(r => r.json())
  .then(console.log);
```

If you see `results[0].latitude`, you're ready. No signup required.

Also test it in the terminal:

```bash
curl "https://geocoding-api.open-meteo.com/v1/search?name=London&count=1"
```

**Checkpoint:** You can point to the city name, latitude, and longitude in the JSON.

## Phase 2: UI foundation (≈2 hours)

**Learn:** [JavaScript: Project 1 — DOM & objects](../../docs/javascript/by-project.md#project-1--weather-dashboard) (skip async row for now)

**Goal:** Make the page shape before it has real weather.

**Why:** A page with fake boxes is easier to connect later than a blank page.

**Do:**

### HTML

- [ ] Create `index.html` with semantic structure
- [ ] Add `<title>Weather Dashboard</title>`
- [ ] Link your CSS: `<link rel="stylesheet" href="css/styles.css">`
- [ ] Add search `<form id="search-form">` and `<input id="search-input">`
- [ ] Add placeholders: `#loading`, `#error`, `#current-weather`, `#forecast`, `#recent-searches`
- [ ] Use `<span id="weather-icon">` for emoji or optional local icons
- [ ] Add script tags later, after the JavaScript files have useful code

Tiny starter idea:

```html
<form id="search-form">
  <label for="search-input">City</label>
  <input id="search-input" type="text" placeholder="London" />
  <button type="submit">Search</button>
</form>
```

### CSS

- [ ] Create `css/styles.css`
- [ ] Style page background, font, centered container
- [ ] Style search bar and button
- [ ] Style weather card (temperature large, details smaller)
- [ ] Add `.hidden` or `[hidden]` utility class
- [ ] Create loading spinner (CSS animation)
- [ ] Add `@media` query for mobile

**Checkpoint:** Open via Live Server — page looks good, form does nothing yet.

## Phase 3: API experiments (≈1 hour)

**Learn:** [concepts: API, HTTP, JSON, fetch](./concepts.md) · [JavaScript: async](../../docs/javascript/by-project.md#project-1--weather-dashboard)

**Goal:** Understand the API before hiding it inside functions.

**Why:** If you can test the API in small pieces, bugs feel less scary.

**Do:**

### Experiment 1: `curl`

```bash
curl "https://geocoding-api.open-meteo.com/v1/search?name=London&count=1"
```

- [ ] Find `name`
- [ ] Find `latitude`
- [ ] Find `longitude`

### Experiment 2: `fetch` without waiting

Paste in DevTools Console:

```javascript
const response = fetch('https://geocoding-api.open-meteo.com/v1/search?name=London&count=1');
console.log(response);
```

You should see a `Promise`, not the final data.

**Why this happens:** `fetch()` starts a network request. The internet is not instant, so JavaScript gives you a Promise while it waits.

### Experiment 3: `fetch` with `.then()`

```javascript
fetch('https://geocoding-api.open-meteo.com/v1/search?name=London&count=1')
  .then(response => response.json())
  .then(data => console.log(data.results[0]));
```

### Experiment 4: `fetch` with `async/await`

```javascript
async function testCity() {
  const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=London&count=1');
  const data = await response.json();
  console.log(data.results[0]);
}

testCity();
```

**Checkpoint:** You can explain: `await` means "pause this async function until the Promise is ready."

## Phase 4: API layer (≈2 hours)

**Learn:** [concepts: Fetch API](./concepts.md#fetch-api) · [code-reference: api layer](./code-reference.md#jsapijs--api-layer)

**Goal:** Put API code in `js/api.js`.

**Why:** The rest of your app should not care about exact URLs. It should ask simple functions like `getWeatherForCity('London')`.

**Do:**
- [ ] Create `js/api.js`
- [ ] Add `geocodeCity(city)` — fetch Open-Meteo geocoding API
- [ ] Handle empty `results` → throw "City not found"
- [ ] Add `getWeatherForCity(city)` — geocode, then fetch forecast with lat/lon
- [ ] Use `URLSearchParams` or template literals for query string
- [ ] Check `response.ok`; throw Error with status if not
- [ ] Return combined data for UI (`place` + `weather`)

**Checkpoint:** Temporarily load `js/api.js` in `index.html`, call `getWeatherForCity('London')` from the console, and see a weather object. Remove or keep the script tag depending on your Phase 6 loading plan.

## Phase 5: UI layer (≈1 hour)

**Learn:** [JavaScript: DOM rows](../../docs/javascript/by-project.md#project-1--weather-dashboard) · [code-reference: weather codes](./code-reference.md)

**Goal:** Write functions that update the page.

**Why:** API data is just raw data until your UI turns it into something humans can read.

**Do:**
- [ ] Create `js/ui.js`
- [ ] `showLoading()` / `hideLoading()`
- [ ] `showError(message)` / `hideError()`
- [ ] `weatherCodeLabel()` / `weatherCodeEmoji()` helpers
- [ ] `displayCurrentWeather({ place, weather })` — map fields to DOM
- [ ] `displayForecast({ weather })` — loop `daily.time` array

**Checkpoint:** Hard-code fake data and call display functions — UI updates.

## Phase 6: Wire it together (≈2 hours)

**Learn:** [JavaScript: events & try/catch](../../docs/javascript/by-project.md#project-1--weather-dashboard)

**Goal:** Make the Search button run the whole flow.

**Why:** This is where separate pieces become one app.

**Do:**
- [ ] Create `js/app.js`
- [ ] Form submit handler with `preventDefault`, validation
- [ ] showLoading → getWeatherForCity → display → hideLoading
- [ ] catch: showError
- [ ] Script tags in correct order in `index.html`

**Checkpoint:** Search "London" — real weather appears.

## Phase 7: Recent searches (≈1 hour)

**Learn:** [concepts: localStorage](./concepts.md#localstorage)

**Goal:** Remember recent city names.

**Why:** `localStorage` is a tiny browser shelf. You can put strings there and read them after refresh.

**Do:**
- [ ] `saveRecentSearch(city)` — localStorage, dedupe, max 5
- [ ] `renderRecentSearches()` — clickable chips
- [ ] Load on page open

## Phase 8: Forecast polish (≈1 hour)

Open-Meteo returns daily forecast in the same call as current weather — wire up if not done:

- [ ] Show 5 days from `weather.daily`
- [ ] Max/min temps per day
- [ ] Weather emoji per day

## Phase 9: Polish & edge cases (≈2 hours)

- [ ] Empty input → friendly error
- [ ] Invalid city → "City not found" (empty geocode results)
- [ ] Network offline → catch fetch errors
- [ ] Test "São Paulo", "New York"

## Phase 10: Deploy & document (≈1 hour)

**Learn:** [Git: daily workflow & Pages](../../docs/git/README.md)

**Goal:** Share the finished app.

**Do:**
- [ ] README screenshot + live URL
- [ ] Push to GitHub
- [ ] Deploy GitHub Pages
- [ ] Verify live site (no keys to worry about — Open-Meteo is public)

## Success checklist

- [ ] Explain API using restaurant analogy
- [ ] Make fetch request without copy-paste
- [ ] Use Network tab — see geocoding + forecast requests
- [ ] Handle invalid city and network errors
- [ ] Recent searches persist after refresh

## Stuck?

- [FAQ](./help/faq.md)
- [Troubleshooting](./help/troubleshooting.md)
- [Code reference](./code-reference.md)
