// ui.js — the painter. It puts data on the page and never calls fetch.
// Follow step-by-step.md.

const loadingText = document.querySelector('#loading');
const errorText = document.querySelector('#error');
const currentSection = document.querySelector('#current-weather');
const forecastBox = document.querySelector('#forecast');

// TODO 5: show and hide the loading line and the error box.
//         Every element has a .hidden property: true hides it, false shows it.
function showLoading() {
}

function hideLoading() {
}

function showError(message) {
}

function hideError() {
}

// Ready for you: Open-Meteo sends WMO weather codes (numbers). These turn them into words and emoji.
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

// TODO 4: fill #city-name, #temperature, #description, #humidity, #wind and #weather-icon
//         from data.place and data.weather.current. Then show the section (currentSection.hidden = false).
function displayCurrentWeather(data) {
}

// TODO 6: empty forecastBox, then make one small card per day.
//         data.weather.daily.time[i] is the date, daily.temperature_2m_max[i] the high,
//         daily.temperature_2m_min[i] the low, daily.weather_code[i] the code.
function displayForecast(data) {
}

// Hide old weather when a search fails.
function hideWeather() {
  currentSection.hidden = true;
  forecastBox.innerHTML = '';
}
