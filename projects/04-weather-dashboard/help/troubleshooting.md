# Weather dashboard: troubleshooting and questions

Find your problem below. Back to the [step-by-step guide](../step-by-step.md). The console (F12) and the **Network** tab are your best friends: the Network tab lists every request and its answer.

## Do I need an account or a key?

No. Open-Meteo is free and public. There is nothing secret in this project, so it is safe to push.

## `Failed to fetch` or a CORS error

| Cause | Fix |
|-------|-----|
| No internet | Check your connection |
| A typo in the address | Compare with [the two addresses](open-meteo.md#the-two-addresses) |
| The browser blocks `file://` pages | Start a tiny local server in `starter/`: `npx serve .` and open the address it prints |

## "City not found" for a real city

- Check the spelling.
- Small villages may be missing. Try the nearest big city.
- Look at the geocoding request in the Network tab. Is `results` there?

## `Cannot read properties of undefined (reading 'temperature_2m')`

The path into the JSON is wrong. Log the whole answer and read it:

```js
const data = await getWeatherForCity('London');
console.log(data);
```

The right path is `data.weather.current.temperature_2m`.

## I see `Promise {<pending>}` instead of data

You forgot `await`. Both `fetch(...)` and `response.json()` need it. See [fetch and await](../../../sheets/javascript/README.md).

## `await is only valid in async functions`

Put `async` in front of the function that uses `await`: `async function handleSearch(event) { … }`.

## The page reloads when I press Search

Call `event.preventDefault()` as the first line of the submit handler.

## `geocodeCity is not defined`

The script tags are in the wrong order, or one file has a red error. `api.js` and `ui.js` must load **before** `app.js`.

## Nothing shows, but there is no error

- Did you set `hidden = false` on the section?
- Do the ids in `index.html` and in your JavaScript match exactly (`city-name`, `temperature`, …)?

## The forecast shows yesterday's weekday

`new Date('2026-10-21')` means midnight in London time. West of London that is still the day before. Use `new Date(day + 'T12:00')`.

## Where do I ask for help?

Write down: the city you searched, the red error in the console and the answer of the request in the Network tab.
