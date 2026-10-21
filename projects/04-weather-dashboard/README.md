# Project 4: Weather dashboard

Your first app that talks to the internet. You type a city, press Search, and see the real weather right now and for the next five days.

> [!PICTURE]
> A tiny weather robot. You ask it: "What is the weather in London?" The robot phones a weather service on the internet, waits for the answer, and turns the numbers into a friendly card on your page.

## What you build

- A search box for a city.
- The weather now: city, temperature, words and an emoji, humidity and wind.
- A 5-day forecast with high and low temperatures.
- A loading line while the app waits, and friendly error messages ("City not found", no internet).
- Buttons for your last 5 searches. They are still there after a reload.

The weather comes from [Open-Meteo](https://open-meteo.com/): free, no account, no key.

## New in this project

| New skill | You already know |
|-----------|------------------|
| `fetch`: ask a server for data | DOM and events (projects 2 and 3) |
| `async` / `await`: wait for the answer | localStorage and JSON (project 2) |
| Read a JSON answer and handle errors (`try` / `catch`) | Objects and arrays (drills) |

## What you need to know

- [Client and server](../../tracks/computer-science/index.html#client-server) and [HTTP requests and responses](../../tracks/computer-science/index.html#http-requests-responses)
- [fetch and await](../../sheets/javascript/README.md): the pizza-phone picture
- [JSON](../../sheets/javascript/json.md) and [DOM and events](../../sheets/javascript/dom.md)

A word you do not know? Look it up in the [glossary](../../sheets/start/glossary.md).

## How this folder works

| File or folder | What it is for |
|----------------|----------------|
| [step-by-step.md](step-by-step.md) | The build guide in eight steps. Each ends with "You should see …" |
| [starter/](starter/) | **Your desk.** `index.html` and `style.css` are ready. `api.js`, `ui.js` and `app.js` have numbered `TODO`s |
| [solution/](solution/) | One finished app. Peek only when you are done or really stuck |
| [help/open-meteo.md](help/open-meteo.md) | The two weather addresses, what the answers look like, weather codes |
| [help/troubleshooting.md](help/troubleshooting.md) | Common errors and questions |

Three JavaScript files, three jobs:

| File | Job | Never does |
|------|-----|------------|
| `api.js` | The **messenger**: talks to Open-Meteo | touch the page |
| `ui.js` | The **painter**: puts data on the page | call `fetch` |
| `app.js` | The **coach**: listens to the form, tells the other two what to do | big jobs itself |

If the city search goes wrong, look in `api.js`. If the temperature is in the wrong place, look in `ui.js`. If Search does nothing, look in `app.js`.

## How one search flows

```text
Search pressed
  → empty?           show an error, stop
  → show loading
  → geocoding        city → latitude, longitude    (no results? "City not found")
  → forecast         latitude, longitude → weather
  → show weather and forecast, save the city
  → error anywhere?  show a friendly message
  → hide loading
```

## Done when

- [ ] Searching "London" shows the weather now and 5 forecast days.
- [ ] "São Paulo" and "New York" work too.
- [ ] An empty search shows an error and sends no request.
- [ ] "asdfgh123" shows "City not found".
- [ ] Without internet you see a friendly message, not a broken page.
- [ ] A loading line shows while the app waits.
- [ ] The last 5 cities are buttons, still there after a reload.
- [ ] In the Network tab (F12) you can point to the geocoding and the forecast request.
- [ ] Your work is committed and pushed on your branch.

> [!CHECK]
> 1. Why do you need `await` in front of `fetch(...)`?
>    <details><summary>Answer</summary>The answer takes time. Without <code>await</code> you get a Promise (a "comes later" note), not the response.</details>
> 2. The geocoding answer has no <code>results</code>. What should the app do?
>    <details><summary>Answer</summary>Throw an error like <code>City "…" not found</code>. The <code>catch</code> in <code>app.js</code> shows it to the user.</details>
> 3. Which file should change if Open-Meteo gave you a new address?
>    <details><summary>Answer</summary>Only <code>api.js</code>, the messenger. That is why the jobs are split.</details>

## Next

Start the [step-by-step guide](step-by-step.md). The same weather service comes back in Java in [Project 10: Java weather CLI](../10-java-weather-cli/README.md).
