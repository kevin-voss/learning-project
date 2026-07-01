# Code Reference — Weather Dashboard

**Reference snippets only.** Type these yourself — they are not pre-built project files.

Uses **[Open-Meteo](https://open-meteo.com/)** — no API key, no account.

---

## `js/api.js` — API layer

Before copying any pattern here, run the small experiments in [step-by-step Phase 3](./step-by-step.md#phase-3-api-experiments-1-hour). It is easier to understand this file after you have seen `curl`, `fetch`, a Promise, and `await`.

```javascript
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

async function geocodeCity(city) {
  const url = `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geocoding failed (${response.status})`);
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${city}" not found`);
  }

  return data.results[0]; // { name, country, latitude, longitude, ... }
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

  if (!response.ok) {
    throw new Error(`Weather service error (${response.status})`);
  }

  const weather = await response.json();

  // Attach place info for UI (city name, country)
  return {
    place,
    weather,
  };
}
```

**Notes:**

- Two requests: geocode, then forecast — both async
- `encodeURIComponent(city)` handles `New York`, `São Paulo`
- Return shape is **yours** — combine `place` + `weather` however you like
- Keep DOM code out of this file

---

## Weather code helper (in `api.js` or `ui.js`)

```javascript
function weatherCodeLabel(code) {
  const map = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Fog',
    51: 'Light drizzle',
    61: 'Rain',
    63: 'Rain',
    65: 'Heavy rain',
    71: 'Snow',
    80: 'Rain showers',
    95: 'Thunderstorm',
  };
  return map[code] ?? 'Unknown';
}

function weatherCodeEmoji(code) {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95) return '⛈️';
  return '🌡️';
}
```

---

## `js/ui.js` — UI layer

```javascript
function displayCurrentWeather({ place, weather }) {
  const current = weather.current;

  document.getElementById('city-name').textContent =
    `${place.name}, ${place.country}`;
  document.getElementById('temperature').textContent =
    `${Math.round(current.temperature_2m)}°C`;
  document.getElementById('description').textContent =
    weatherCodeLabel(current.weather_code);
  document.getElementById('humidity').textContent =
    `${current.relative_humidity_2m}%`;
  document.getElementById('wind').textContent =
    `${current.wind_speed_10m} km/h`;

  // Emoji in a span — or use your own icons in assets/
  document.getElementById('weather-icon').textContent =
    weatherCodeEmoji(current.weather_code);
}

function displayForecast({ weather }) {
  const container = document.getElementById('forecast');
  container.innerHTML = '';

  const { daily } = weather;

  for (let i = 0; i < daily.time.length; i++) {
    const date = new Date(daily.time[i]);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <p class="forecast-day">${dayName}</p>
      <span class="forecast-emoji">${weatherCodeEmoji(daily.weather_code[i])}</span>
      <p class="forecast-temp">${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</p>
    `;
    container.appendChild(card);
  }
}
```

Use `<span id="weather-icon">` instead of `<img>` if you use emoji.

---

## `js/app.js` — Main logic

```javascript
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  hideError();

  const city = searchInput.value.trim();
  if (!city) {
    showError('Please enter a city name');
    return;
  }

  try {
    showLoading();
    const data = await getWeatherForCity(city);
    displayCurrentWeather(data);
    displayForecast(data);
    saveRecentSearch(city);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
    searchInput.value = '';
  }
}
```

---

## Recent searches helpers

Put these in `js/app.js` or a small `js/storage.js` file if you want extra organization.

```javascript
const RECENT_SEARCHES_KEY = 'recentSearches';

function getRecentSearches() {
  const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
  return JSON.parse(saved) || [];
}

function saveRecentSearch(city) {
  const oldSearches = getRecentSearches();
  const withoutDuplicate = oldSearches.filter(
    oldCity => oldCity.toLowerCase() !== city.toLowerCase()
  );

  const nextSearches = [city, ...withoutDuplicate].slice(0, 5);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(nextSearches));
  renderRecentSearches();
}

function renderRecentSearches() {
  const container = document.getElementById('recent-searches');
  container.innerHTML = '';

  for (const city of getRecentSearches()) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = city;
    button.addEventListener('click', () => {
      searchInput.value = city;
      searchForm.requestSubmit();
    });
    container.appendChild(button);
  }
}
```

Beginner notes:

- `localStorage` only stores strings.
- `JSON.stringify()` turns an array into a string.
- `JSON.parse()` turns the string back into an array.
- `slice(0, 5)` keeps only the newest 5 searches.

---

## Test in DevTools (Phase 1)

No key needed — paste in Console:

```javascript
fetch('https://geocoding-api.open-meteo.com/v1/search?name=London&count=1')
  .then(r => r.json())
  .then(console.log);
```

You should see `results[0].name` and `latitude` / `longitude`.

---

## HTML skeleton (structure only)

```html
<section id="current-weather">
  <span id="weather-icon" aria-hidden="true"></span>
  <h2 id="city-name"></h2>
  <p id="temperature"></p>
  <p id="description"></p>
  <p>Humidity: <span id="humidity"></span></p>
  <p>Wind: <span id="wind"></span></p>
</section>
```

---

## Testing checklist

| Test | Expected |
|------|----------|
| Valid city | Weather displays |
| Empty submit | Error, no API call |
| `asdfgh123` | "City not found" |
| Offline | Network error message |
| Refresh page | Recent searches persist |

---

## Next

- [Step-by-step plan](./step-by-step.md)
- [Open-Meteo docs](https://open-meteo.com/en/docs)
