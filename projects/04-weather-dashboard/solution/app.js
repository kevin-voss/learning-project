// app.js — the coach. It listens to the form and tells api.js and ui.js what to do.

const RECENT_KEY = 'recent-searches';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const recentBox = document.querySelector('#recent-searches');

async function handleSearch(event) {
  event.preventDefault();
  hideError();

  const city = searchInput.value.trim();
  if (city === '') {
    showError('Please type a city name.');
    return;
  }

  showLoading();
  try {
    const data = await getWeatherForCity(city);
    displayCurrentWeather(data);
    displayForecast(data);
    saveRecentSearch(data.place.name);
    searchInput.value = '';
  } catch (error) {
    hideWeather();
    // fetch itself fails with a TypeError when there is no connection.
    if (error instanceof TypeError) {
      showError('No connection to the weather service. Check your internet and try again.');
    } else {
      showError(error.message);
    }
  } finally {
    hideLoading();
  }
}

// Recent searches: the same localStorage + JSON idea as the shopping list.
function loadRecentSearches() {
  const saved = localStorage.getItem(RECENT_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

function saveRecentSearch(city) {
  const others = loadRecentSearches().filter((old) => old.toLowerCase() !== city.toLowerCase());
  const recent = [city, ...others].slice(0, 5); // newest first, at most 5
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  renderRecentSearches();
}

function renderRecentSearches() {
  recentBox.innerHTML = '';
  for (const city of loadRecentSearches()) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = city;
    button.addEventListener('click', () => {
      searchInput.value = city;
      searchForm.requestSubmit();
    });
    recentBox.append(button);
  }
}

searchForm.addEventListener('submit', handleSearch);
renderRecentSearches();
