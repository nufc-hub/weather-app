import './css/style.css';
import 'normalize.css';
import Searcher from './modules/searcher';
import API from './modules/api';
import UI from './modules/ui';
import validateSearch from './modules/validation';

function init() {
  // Define selectors. These are the DOM elements.
  const selectors = {
    // Weather
    city: 'city-name',
    country: 'country-name',
    temperature: 'temperature-number',
    weather: 'weather-type',
    feelsLike: 'feels-like',
    wind: 'wind',
    barometer: 'barometer',
    visibility: 'visibility',
    humidity: 'humidity',
    dewPoint: 'dew-point',
    firstForecastDay: 'first-forecast-day',
    secondForecastDay: 'second-forecast-day',
    thirdForecastDay: 'third-forecast-day',
    firstForecastHigh: 'first-forecast-high',
    secondForecastHigh: 'second-forecast-high',
    thirdForecastHigh: 'third-forecast-high',
    firstForecastLow: 'first-forecast-low',
    secondForecastLow: 'second-forecast-low',
    thirdForecastLow: 'third-forecast-low',
    firstForecastIcon: 'first-forecast-icon',
    secondForecastIcon: 'second-forecast-icon',
    thirdForecastIcon: 'third-forecast-icon',

    // Search element
    searchElement: 'search',

    // Error Element
    errorElement: 'search-error-message',
  };

  // Define the search element.
  // const searchElement = document.getElementById('search');

  //

  // Define the url.
  const url = 'https://api.weatherapi.com/v1/current.json';
  // Define the api key.
  const apiKey = '573237ec7c1e4149932133700241903';

  // Create class instances.
  // Add search element as argument.
  const searcher = new Searcher(selectors.searchElement);
  // Add url and apiKey variables as arguments
  const api = new API(url, apiKey); // Add correct arguments in.
  // Add selectors as argument.
  const ui = new UI(selectors);

  // On search, fetch weather data and update UI.
  searcher.onSearch(async () => {
    // Get the search value
    const searchValue = searcher.getSearchValue();
    // Validate the search.
    if (validateSearch(searchValue, selectors.errorElement)) {
      // Add searchValue to buildUrl parameter.
      const fullApiURL = api.buildUrl(searchValue);
      console.log(fullApiURL);

      try {
        // Fetch the weather data.
        const weatherData = await api.fetchData(fullApiURL);
        console.log(weatherData);

        // Update the UI.
        // Update city.
        ui.updateTextContent('city', weatherData.location.name);
        ui.updateTextContent('country', weatherData.location.country);
      } catch (error) {
        console.error(error);
      }
    }
  });
}

init();
