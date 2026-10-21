# Project 4: step by step

Eight small steps. After each step, save, reload the browser and test. Test each new function in the console before you use it.

**Sheets:** [fetch and await](../../sheets/javascript/README.md) · [JSON](../../sheets/javascript/json.md) · **Help:** [Open-Meteo](help/open-meteo.md) · [Troubleshooting](help/troubleshooting.md) · **Brief:** [README](README.md)

## Step 0: open your desk

From the repo root:

```bash
cd projects/04-weather-dashboard/starter
ls
```

You should see `index.html`, `style.css`, `api.js`, `ui.js` and `app.js`. Open `index.html` in the browser and open the console (F12). The page shows a search box. Search does nothing yet.

> [!NOTE]
> If a request later fails with a CORS error, start a tiny local server in this folder: `npx serve .` and open the address it prints.

## Step 1: ask the weather service by hand

Before you write code, look at what the service sends back. In the terminal:

```bash
curl "https://geocoding-api.open-meteo.com/v1/search?name=London&count=1"
```

Then the same in the browser console:

```js
const response = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=London&count=1');
const data = await response.json();
data.results[0];
```

You should see an object with `name: "London"`, `latitude` and `longitude`. Read [Open-Meteo](help/open-meteo.md) to see the forecast answer too.

## Step 2: city → map numbers

Find `TODO 2` in `api.js` and write `geocodeCity(city)`:

```js
const params = new URLSearchParams({ name: city, count: '1', language: 'en', format: 'json' });
const response = await fetch(GEO_URL + '?' + params);
if (!response.ok) {
  throw new Error('Could not look up the city (status ' + response.status + ')');
}
const data = await response.json();
```

Then: if `data.results` is missing or empty, `throw new Error('City "' + city + '" not found')`. Otherwise `return data.results[0]`.

Test in the console:

```js
await geocodeCity('Paris');
await geocodeCity('asdfgh123');
```

You should see the Paris object, then a red error `City "asdfgh123" not found`.

## Step 3: map numbers → weather

Find the two `TODO 3`s in `api.js`.

1. `getForecast(place)` works like `geocodeCity`, with `WEATHER_URL` and these query fields: `latitude`, `longitude`, `current`, `daily`, `timezone: 'auto'` and `forecast_days: '5'` (the exact `current` and `daily` lists are in the TODO). Check `response.ok`, then `return response.json()`.
2. `getWeatherForCity(city)` calls both, one after the other:

```js
const place = await geocodeCity(city);
const weather = await getForecast(place);
return { place: place, weather: weather };
```

Test in the console: `await getWeatherForCity('London')`.

You should see an object with `place` and `weather`. Open `weather.current`: there is `temperature_2m`.

> [!TRY]
> Open the **Network** tab (F12), clear it, and run the test again.
> You should see two requests: `search?name=London…` and `forecast?latitude=…`. Click one and open **Response** to see the JSON.

## Step 4: show the weather now

Find `TODO 4` in `ui.js` and write `displayCurrentWeather(data)`. It is DOM work like in project 2:

```js
const place = data.place;
const current = data.weather.current;
document.querySelector('#city-name').textContent = place.name + ', ' + place.country;
document.querySelector('#temperature').textContent = Math.round(current.temperature_2m) + ' °C';
```

Fill `#description` with `weatherCodeLabel(current.weather_code)`, the icon with `weatherCodeEmoji(...)`, then humidity and wind. At the end: `currentSection.hidden = false;`

Test in the console:

```js
displayCurrentWeather(await getWeatherForCity('Rome'));
```

You should see a weather card for Rome on the page.

## Step 5: connect the Search button

1. Find `TODO 5` in `ui.js`. Each show/hide function is one line, for example `loadingText.hidden = false;`. `showError(message)` also puts the message in `errorText.textContent`.
2. Find `TODO 5` in `app.js` and write `handleSearch(event)`:

```js
showLoading();
try {
  const data = await getWeatherForCity(city);
  displayCurrentWeather(data);
} catch (error) {
  hideWeather();
  showError(error.message);
} finally {
  hideLoading();
}
```

Before that, stop on an empty input with `showError('Please type a city name.')`.

> [!NOTE]
> `try` runs the plan. If anything inside throws an error, the code jumps to `catch`. `finally` runs in both cases, so the loading line always goes away.

You should see the weather after you type a city and press Search. "asdfgh123" shows "City not found". An empty search shows your message.

## Step 6: the 5-day forecast

Find `TODO 6` in `ui.js`. `daily` holds parallel arrays: position `i` is the same day in every array. Loop over `daily.time`:

```js
const daily = data.weather.daily;
forecastBox.innerHTML = '';
for (let i = 0; i < daily.time.length; i++) {
  const date = new Date(daily.time[i] + 'T12:00');
  const dayName = date.toLocaleDateString('en-GB', { weekday: 'short' });
  // make a div.forecast-card with the day name, an emoji and "max° / min°"
}
```

Call `displayForecast(data)` in `handleSearch`, right after `displayCurrentWeather(data)`.

You should see five small cards under the weather card, starting with today.

## Step 7: recent searches (you know this one)

This is the shopping list from project 2 again: an array of city names in localStorage. Find `TODO 7` in `app.js`.

1. `loadRecentSearches()`: read `RECENT_KEY`; `null` gives `[]`, otherwise `JSON.parse`.
2. `saveRecentSearch(city)`: drop the city if it is already in the list, put it first, keep 5:

```js
const others = loadRecentSearches().filter((old) => old.toLowerCase() !== city.toLowerCase());
const recent = [city, ...others].slice(0, 5);
```

   Save with `JSON.stringify`, then call `renderRecentSearches()`.
3. `renderRecentSearches()`: one `<button>` per city. A click puts the city in the input and calls `searchForm.requestSubmit()`.
4. In `handleSearch`, call `saveRecentSearch(data.place.name)` after the forecast.

You should see a button for every city you searched, newest first, at most 5. They are still there after a reload.

## Step 8: test the hard cases

| Try this | You should see |
|----------|----------------|
| An empty search | "Please type a city name." and no request in the Network tab |
| `asdfgh123` | City "asdfgh123" not found |
| `São Paulo`, `New York` | The weather (spaces and `ã` work) |
| Network tab → **Offline**, then search | A friendly message instead of a broken page |
| Reload the page | The recent search buttons are still there |

> [!TRY]
> The offline message says "Failed to fetch". Make it friendlier: in `catch`, if `error instanceof TypeError`, show "No connection to the weather service." instead. (`fetch` throws a `TypeError` when there is no connection.)

## Done

Check every box under "Done when" in the [README](README.md). Then compare with the [solution](solution/).

Save your work:

```bash
git add projects/04-weather-dashboard/starter
git commit -m "Finish project 4: weather dashboard"
git push
```
