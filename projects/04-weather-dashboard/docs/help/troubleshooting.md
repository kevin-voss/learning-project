# Troubleshooting — Weather Dashboard

## Network & fetch

### `Failed to fetch`

| Cause | Fix |
|-------|-----|
| No internet | Check connection |
| `file://` URL | Use Live Server or `npx serve .` |
| Wrong URL | Check Open-Meteo URLs in [code-reference](../code-reference.md) |

### CORS error

Serve over HTTP, not `file://`.

---

## Geocoding

### City not found for a real city

- Check spelling
- Try adding country: search "London" vs "Paris" 
- Open-Meteo geocoding may not have tiny villages — try nearest large city
- Inspect Network tab — is `results` empty?

### Test geocoding alone

```javascript
fetch('https://geocoding-api.open-meteo.com/v1/search?name=Paris&count=1')
  .then(r => r.json())
  .then(console.log);
```

---

## JavaScript errors

### `Cannot read properties of undefined (reading 'temperature_2m')`

Response shape mismatch. Log full JSON:

```javascript
const data = await getWeatherForCity('London');
console.log(data);
```

Check paths: `weather.current.temperature_2m`, not `main.temp` (that's OpenWeatherMap's shape — we don't use it).

### Element id mismatch

Match HTML ids to JS exactly (`city-name`, `temperature`, etc.).

---

## UI

### No emoji / icon showing

Use `textContent` on a `<span id="weather-icon">`, not `src` on `<img>`.

### Wrong units

Open-Meteo returns °C and km/h by default in metric mode. No `units=metric` param needed (unlike OpenWeatherMap).

---

## Getting help

Include: city searched, console error, Network tab response for geocoding request.

See [FAQ](./faq.md) · [code reference](../code-reference.md)
