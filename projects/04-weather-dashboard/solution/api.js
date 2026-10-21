// api.js — the messenger. It talks to Open-Meteo and never touches the page.

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

// Step 1: city name → place with latitude and longitude.
async function geocodeCity(city) {
  const params = new URLSearchParams({ name: city, count: '1', language: 'en', format: 'json' });
  const response = await fetch(GEO_URL + '?' + params);

  if (!response.ok) {
    throw new Error('Could not look up the city (status ' + response.status + ')');
  }

  const data = await response.json();

  // Open-Meteo leaves out "results" when it finds nothing.
  if (!data.results || data.results.length === 0) {
    throw new Error('City "' + city + '" not found');
  }

  return data.results[0]; // { name, country, latitude, longitude, ... }
}

// Step 2: latitude and longitude → current weather and a 5-day forecast.
async function getForecast(place) {
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
    forecast_days: '5',
  });
  const response = await fetch(WEATHER_URL + '?' + params);

  if (!response.ok) {
    throw new Error('The weather service did not answer (status ' + response.status + ')');
  }

  return response.json();
}

// Both steps together. The rest of the app only calls this one.
async function getWeatherForCity(city) {
  const place = await geocodeCity(city);
  const weather = await getForecast(place);
  return { place: place, weather: weather };
}
