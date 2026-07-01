# Glossary — Weather Dashboard

| Term | Definition |
|------|------------|
| **API** | Rules for programs to request and receive data |
| **Geocoding** | Converting a place name to coordinates |
| **async / await** | Syntax for waiting on Promises without blocking the page |
| **DOM** | Tree of HTML elements JS can update |
| **fetch** | Browser function for HTTP requests |
| **HTTP GET** | Request type for reading data |
| **JSON** | Text format for structured data |
| **localStorage** | Browser storage that persists after refresh |
| **Open-Meteo** | Free weather API — no key required |
| **Promise** | Placeholder for a future value |
| **WMO weather code** | Numeric code describing conditions (0=clear, 61=rain, …) |

## HTTP status codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 429 | Too many requests |
| 500 | Server error |

## Open-Meteo fields (common)

| Path | Meaning |
|------|---------|
| `results[0].name` | City name (geocoding) |
| `results[0].latitude` | Latitude |
| `results[0].longitude` | Longitude |
| `current.temperature_2m` | Current temp °C |
| `current.relative_humidity_2m` | Humidity % |
| `current.wind_speed_10m` | Wind km/h |
| `current.weather_code` | WMO code |
| `daily.time[]` | Forecast dates |
| `daily.temperature_2m_max[]` | Daily high |
| `daily.temperature_2m_min[]` | Daily low |

[concepts.md](../concepts.md) · [Open-Meteo docs](https://open-meteo.com/en/docs)
