# Open-Meteo: the weather service

Everything this project needs to know about [Open-Meteo](https://open-meteo.com/). It is free, needs no account and no key.

> [!PICTURE]
> A weather station does not know "London". It knows map numbers. So you ask twice: first a **map shop** ("where is London?" → latitude and longitude), then the **weather station** ("what is the weather at these numbers?").

How a request and an answer travel over the internet: [HTTP requests and responses](../../../tracks/computer-science/index.html#http-requests-responses). How `fetch` and `await` work: [fetch and await](../../../sheets/javascript/README.md). What JSON is: [JSON](../../../sheets/javascript/json.md).

## The two addresses

| Step | Address | You send | You get |
|------|---------|----------|---------|
| 1. Geocoding | `https://geocoding-api.open-meteo.com/v1/search` | `name=London&count=1` | `results[0]` with `name`, `country`, `latitude`, `longitude` |
| 2. Forecast | `https://api.open-meteo.com/v1/forecast` | `latitude`, `longitude`, the fields you want | `current` and `daily` |

Everything after the `?` is the **query string**: `name=value` pairs joined with `&`. `new URLSearchParams({ name: 'São Paulo' })` builds it for you and turns spaces and `ã` into safe characters.

## Test it in the terminal first

```bash
curl "https://geocoding-api.open-meteo.com/v1/search?name=London&count=1"
```

The answer (shortened):

```json
{ "results": [ { "name": "London", "latitude": 51.50853, "longitude": -0.12574, "country": "United Kingdom" } ] }
```

Now the weather for those numbers:

```bash
curl "https://api.open-meteo.com/v1/forecast?latitude=51.51&longitude=-0.13&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5"
```

The answer (shortened):

```json
{
  "current": { "temperature_2m": 9.1, "relative_humidity_2m": 92, "wind_speed_10m": 23.8, "weather_code": 61 },
  "daily": {
    "time": ["2026-10-21", "2026-10-22", "2026-10-23", "2026-10-24", "2026-10-25"],
    "weather_code": [63, 61, 65, 61, 3],
    "temperature_2m_max": [11.2, 13.9, 13.2, 14.9, 13.9],
    "temperature_2m_min": [8.4, 8.6, 8.7, 7.7, 9.8]
  }
}
```

> [!NOTE]
> `daily` holds **parallel arrays**: position `i` in every array belongs to the same day. Day 0 is `time[0]`, `weather_code[0]`, `temperature_2m_max[0]` and `temperature_2m_min[0]`.

A city that does not exist (`name=asdfgh123`) gives an answer **without** `results`. That is how you know "not found".

## The fields you use

| Path in the JSON | Meaning |
|------------------|---------|
| `results[0].name`, `results[0].country` | City and country |
| `results[0].latitude`, `results[0].longitude` | Map numbers |
| `current.temperature_2m` | Temperature now, °C |
| `current.relative_humidity_2m` | Humidity, % |
| `current.wind_speed_10m` | Wind, km/h |
| `current.weather_code` | Weather code (see below) |
| `daily.time[i]` | Date of day `i` |
| `daily.temperature_2m_max[i]`, `daily.temperature_2m_min[i]` | High and low of day `i` |

## Weather codes

Open-Meteo sends a number, not a picture. `ui.js` turns it into words and an emoji.

| Code | Weather |
|------|---------|
| 0 | Clear sky |
| 1–2 | Partly cloudy |
| 3 | Overcast |
| 45, 48 | Fog |
| 51–57 | Drizzle |
| 61–67 | Rain |
| 71–77 | Snow |
| 80–82 | Rain showers |
| 85–86 | Snow showers |
| 95–99 | Thunderstorm |

Full list and all other fields: [Open-Meteo docs](https://open-meteo.com/en/docs).

> [!WARN]
> Be fair: Open-Meteo is free for learning. Never call it in a loop that runs again and again.

> [!CHECK]
> 1. Why does the app call two addresses and not one?
>    <details><summary>Answer</summary>The forecast needs latitude and longitude. Geocoding turns the city name into those numbers first.</details>
> 2. How do you know that a city was not found?
>    <details><summary>Answer</summary>The geocoding answer has no <code>results</code> (or an empty list).</details>
> 3. Which value is the low temperature of the third day?
>    <details><summary>Answer</summary><code>daily.temperature_2m_min[2]</code>. Counting starts at 0.</details>

Back to the [step-by-step guide](../step-by-step.md).
