import './css/style.css';
import 'normalize.css';
import Searcher from './modules/searcher';
import API from './modules/api';
import UI from './modules/ui';
import validateSearch from './modules/validation';
import ErrorHandler from './modules/errorHandler';

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

  // Define the url.
  const url = 'https://api.weatherapi.com/v1/current.json';
  // Define the api key.
  const apiKey = '573237ec7c1e4149932133700241903';
  // Define search regex
  const searchRegex = /^[a-zA-Z\s'-]+$/;

  // Create class instances.
  // New Searcher instance. Search element added as argument.
  const searcher = new Searcher(selectors.searchElement);
  // New API instance. url and apiKey variables added as arguments
  const api = new API(url, apiKey);
  // New UI instance. Selectors added as argument.
  const ui = new UI(selectors);
  // New ErrorHandler instance. Error element added as argument.
  const errorHandler = new ErrorHandler(selectors.errorElement);

  // On search, fetch weather data and update UI.
  searcher.onSearch(async () => {
    // Clear errorElement text in necessary.
    if (selectors.errorElement) {
      errorHandler.clearError();
    }
    // Get the search value.
    const searchValue = searcher.getSearchValue();
    console.log(searchValue);
    if (!searchValue) {
      console.log('Add search value.');
      errorHandler.displayError(
        'Please enter a city name.',
        selectors.errorElement
      );
    } else if (!searchRegex.test(searchValue)) {
      console.log('Follow regex.');
      errorHandler.displayError(
        `Invalid location format. Please enter as 'City', 'City, State', 'City, Country' or 'Post/Zip code.`,
        selectors.errorElement
      );
    } else if (validateSearch(searchValue, selectors.errorElement)) {
      // Validate the search.
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
