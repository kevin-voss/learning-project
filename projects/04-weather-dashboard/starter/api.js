// api.js — the messenger. It talks to Open-Meteo and never touches the page.
// Follow step-by-step.md. Test each function in the console before you go on.

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// TODO 2: city name → place with latitude and longitude.
//   - build the query with new URLSearchParams({ name: city, count: '1', language: 'en', format: 'json' })
//   - await fetch(GEO_URL + '?' + params)
//   - if response.ok is false: throw new Error(...)
//   - await response.json()
//   - if data.results is missing or empty: throw new Error('City "' + city + '" not found')
//   - return data.results[0]
async function geocodeCity(city) {
}

// TODO 3: latitude and longitude → current weather and a 5-day forecast.
//   Query fields: latitude, longitude,
//     current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code'
//     daily: 'weather_code,temperature_2m_max,temperature_2m_min'
//     timezone: 'auto', forecast_days: '5'
//   Check response.ok, then return the JSON.
async function getForecast(place) {
}

// TODO 3: both steps together. Return { place: place, weather: weather }.
async function getWeatherForCity(city) {
}
