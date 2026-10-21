# fetch and await: asking the internet

> [!PICTURE]
> You order a pizza by phone. The shop says "OK!" right away, but the pizza is not in your hands yet. You **wait for the doorbell**. Then you open the box and eat.
>
> `fetch` is the phone call. `await` is waiting for the doorbell. `response.json()` is opening the box.

<div data-anim="request"></div>

## The idea

`fetch(url)` sends an HTTP request to a server (see [HTTP requests and responses](../../tracks/computer-science/index.html#http-requests-responses)).

The answer takes time. So `fetch` gives you a **Promise** first: a note that says "your result comes later".

`await` waits for that promise and gives you the real result. You may only write `await` inside a function marked `async` (or straight in the browser console).

The server sends a [JSON](json.md) text. `await response.json()` turns it into a normal JavaScript object.

Things can go wrong: no internet, a typo in the URL, a busy server. `try { … } catch (error) { … }` catches the problem so your page can show a friendly message instead of breaking.

## Tiny example

This asks the free [Open-Meteo](https://open-meteo.com/) weather service for the temperature in Berlin. It needs no key.

```js
async function showWeather() {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m'
  try {
    const response = await fetch(url)          // call the shop, wait for the doorbell
    if (!response.ok) throw new Error('Status ' + response.status)
    const data = await response.json()         // open the box
    console.log('Berlin:', data.current.temperature_2m, '°C')
  } catch (error) {
    console.log('No weather today:', error.message)
  }
}

showWeather()
```

`response.ok` is true when the [status code](../start/glossary.md) is 200–299. A 404 or 500 does **not** jump to `catch` by itself, so you check it.

> [!TRY]
> 1. Open [open-meteo.com](https://open-meteo.com/) in a new tab.
> 2. Open the console: **F12** (Mac: **Cmd + Option + J**), tab **Console**.
> 3. Paste the whole example and press **Enter**.
> 4. Change `latitude=52.52&longitude=13.41` to `latitude=48.21&longitude=16.37` (Vienna) and run it again.
> 5. Break the URL on purpose: change `api.open-meteo.com` to `api.open-meteo.comx`.
>
> You should see: `Berlin: 14.2 °C` (your number differs), then a new number for Vienna, then `No weather today: Failed to fetch` (the words differ a little per browser).

> [!WARN]
> Forgetting `await` is the most common mistake. `const data = response.json()` gives you a Promise, not the data. You see `Promise {<pending>}` and `data.current` is `undefined`.

> [!NOTE]
> Syntax you will meet in the weather project:
>
> - **Template literal:** `` `It is ${temp} °C` `` puts a value inside text.
> - **Arrow function:** `const double = (n) => n * 2` is a short way to write a function.
> - **Destructuring:** `const { temperature_2m } = data.current` takes one field out of an object.
> - **Optional chaining:** `data.results?.[0]` gives `undefined` instead of an error when `results` is missing.
>
> Look things up on MDN: [Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Using_Fetch).

> [!CHECK]
> 1. In the pizza picture, what is `await`?
>    <details><summary>Answer</summary>Waiting for the doorbell: the code pauses until the answer is there.</details>
> 2. What is a Promise, in one sentence?
>    <details><summary>Answer</summary>A note that says "your result comes later".</details>
> 3. Why do you write `await response.json()` and not only `response.json()`?
>    <details><summary>Answer</summary>Reading the body also takes time and returns a Promise. Without `await` you get the Promise, not the object.</details>
> 4. The server answers with status 404. Does the code jump to `catch` by itself?
>    <details><summary>Answer</summary>No. `fetch` only fails on network problems. You check `response.ok` and throw an error yourself.</details>

**Next:** [Project 4: the weather dashboard](../../projects/04-weather-dashboard/README.md)
