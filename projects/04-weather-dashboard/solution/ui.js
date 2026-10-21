// ui.js — the painter. It puts data on the page and never calls fetch.

const loadingText = document.querySelector('#loading');
const errorText = document.querySelector('#error');
const currentSection = document.querySelector('#current-weather');
const forecastBox = document.querySelector('#forecast');

function showLoading() {
  loadingText.hidden = false;
}

function hideLoading() {
  loadingText.hidden = true;
}

function showError(message) {
  errorText.textContent = message;
  errorText.hidden = false;
}

function hideError() {
  errorText.hidden = true;
}

// Open-Meteo sends WMO weather codes (numbers). Turn them into words and emoji.
function weatherCodeLabel(code) {
  if (code === 0) return 'Clear sky';
  if (code <= 2) return 'Partly cloudy';
  if (code === 3) return 'Overcast';
  if (code <= 48) return 'Fog';
  if (code <= 57) return 'Drizzle';
  if (code <= 67) return 'Rain';
  if (code <= 77) return 'Snow';
  if (code <= 82) return 'Rain showers';
  if (code <= 86) return 'Snow showers';
  return 'Thunderstorm';
}

function weatherCodeEmoji(code) {
  if (code === 0) return '☀️';
  if (code <= 2) return '🌤️';
  if (code === 3) return '☁️';
  if (code <= 48) return '🌫️';
  if (code <= 67) return '🌧️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌦️';
  if (code <= 86) return '🌨️';
  return '⛈️';
}

function displayCurrentWeather(data) {
  const place = data.place;
  const current = data.weather.current;

  document.querySelector('#city-name').textContent = place.name + ', ' + place.country;
  document.querySelector('#temperature').textContent = Math.round(current.temperature_2m) + ' °C';
  document.querySelector('#description').textContent = weatherCodeLabel(current.weather_code);
  document.querySelector('#humidity').textContent = current.relative_humidity_2m + ' %';
  document.querySelector('#wind').textContent = Math.round(current.wind_speed_10m) + ' km/h';
  document.querySelector('#weather-icon').textContent = weatherCodeEmoji(current.weather_code);

  currentSection.hidden = false;
}

function displayForecast(data) {
  const daily = data.weather.daily;
  forecastBox.innerHTML = '';

  // daily holds parallel arrays: daily.time[i] belongs to daily.temperature_2m_max[i].
  for (let i = 0; i < daily.time.length; i++) {
    // 'T12:00' keeps the date on the right day in every time zone.
    const date = new Date(daily.time[i] + 'T12:00');
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'short' });

    const card = document.createElement('div');
    card.className = 'forecast-card';

    const day = document.createElement('p');
    day.textContent = dayName;

    const emoji = document.createElement('p');
    emoji.className = 'forecast-emoji';
    emoji.textContent = weatherCodeEmoji(daily.weather_code[i]);

    const temps = document.createElement('p');
    temps.textContent =
      Math.round(daily.temperature_2m_max[i]) + '° / ' + Math.round(daily.temperature_2m_min[i]) + '°';

    card.append(day, emoji, temps);
    forecastBox.append(card);
  }
}

function hideWeather() {
  currentSection.hidden = true;
  forecastBox.innerHTML = '';
}
