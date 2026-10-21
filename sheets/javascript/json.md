# JSON: data in a parcel

> [!PICTURE]
> You send a parcel. On the box you tape a **packing list**: "2 books, 1 scarf (red)". Anyone can read it, in any country, even without opening the box.
>
> **JSON** is that packing list for data. It is plain text, so every program and every language can read it.

## The idea

JSON looks almost like a JavaScript object. The differences: all keys are in **double quotes**, text uses double quotes, and there are no functions and no comments.

A JavaScript object lives inside your program. JSON is **text**: you can send it over the internet or save it in a file.

Two functions pack and unpack the parcel:

- `JSON.stringify(object)` packs: object → text.
- `JSON.parse(text)` unpacks: text → object.

The browser's **localStorage** (a small drawer that survives a page reload) only stores **strings**. So you pack with `stringify` before you save and unpack with `parse` when you load.

## Tiny example

A weather server answers with JSON like this:

```json
{
  "city": "Berlin",
  "current": { "temperature_2m": 14.2, "weather_code": 3 },
  "daily": { "time": ["2026-10-21", "2026-10-22"], "temperature_2m_max": [16.1, 13.4] }
}
```

```js
const text = '{"city":"Berlin","current":{"temperature_2m":14.2}}'
const weather = JSON.parse(text)                  // unpack
console.log(weather.current.temperature_2m)        // 14.2

const favourites = ['Berlin', 'Vienna']
localStorage.setItem('cities', JSON.stringify(favourites))       // pack and save
const loaded = JSON.parse(localStorage.getItem('cities') ?? '[]') // load and unpack
console.log(loaded[1])                              // Vienna
```

> [!TRY]
> 1. Open the console on any page: **F12** (Mac: **Cmd + Option + J**).
> 2. Type `JSON.stringify({ name: 'Sam', age: 9 })` and press Enter.
> 3. Type `JSON.parse('{"name":"Sam","age":9}').age` and press Enter.
> 4. Type `localStorage.setItem('test', [1, 2, 3])`, then `localStorage.getItem('test')`.
>
> You should see: `'{"name":"Sam","age":9}'` (text, with quotes around it), then `9`, then `'1,2,3'`: localStorage turned your array into a plain string. That is why you use `JSON.stringify`.

> [!WARN]
> `JSON.parse` throws an error on broken text, for example single quotes `{'name':'Sam'}` or a trailing comma `[1, 2,]`. Real JSON uses double quotes only.

> [!CHECK]
> 1. Is JSON an object or text?
>    <details><summary>Answer</summary>Text. <code>JSON.parse</code> turns it into an object.</details>
> 2. You want to save an array of cities in localStorage. What do you call first?
>    <details><summary>Answer</summary><code>JSON.stringify(cities)</code>, because localStorage stores only strings.</details>
> 3. In the weather sample, how do you read tomorrow's maximum temperature?
>    <details><summary>Answer</summary>After <code>const data = JSON.parse(text)</code>: <code>data.daily.temperature_2m_max[1]</code> (index 0 is today).</details>

**Next:** [Project 2: shopping list in the browser](../../projects/02-shopping-list-web/README.md) saves its list with JSON. Later, [fetch and await](README.md) gets JSON from the internet.
