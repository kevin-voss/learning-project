// app.js — the coach. It listens to the form and tells api.js and ui.js what to do.
// Follow step-by-step.md.

const RECENT_KEY = 'recent-searches';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const recentBox = document.querySelector('#recent-searches');

// TODO 5: the whole search, step by step.
//   - event.preventDefault() and hideError()
//   - read and trim the city; if it is empty: showError(...) and stop
//   - showLoading()
//   - try:     await getWeatherForCity(city), then displayCurrentWeather(data)
//              (later: displayForecast(data) and saveRecentSearch(data.place.name))
//   - catch:   hideWeather() and showError(error.message)
//   - finally: hideLoading()
async function handleSearch(event) {
  event.preventDefault();
}

// TODO 7: recent searches, like the shopping list in project 2.
//   loadRecentSearches: read RECENT_KEY from localStorage, [] when nothing is saved, else JSON.parse.
//   saveRecentSearch:   put the city first, drop a double, keep at most 5, save with JSON.stringify, render.
//   renderRecentSearches: one button per city; a click puts the city in the input and submits the form
//                         (searchForm.requestSubmit()).
function loadRecentSearches() {
  return [];
}

function saveRecentSearch(city) {
}

function renderRecentSearches() {
}

searchForm.addEventListener('submit', handleSearch);
renderRecentSearches();
