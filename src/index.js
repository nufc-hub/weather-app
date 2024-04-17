import './css/style.css';
import 'normalize.css';
import Searcher from './modules/searcher';
import API from './modules/api';
import UI from './modules/ui';
import Validator from './modules/validator';
import ErrorHandler from './modules/errorHandler';
import { dayGetter, buildWeatherURL } from './modules/utils';
import config from './modules/config';

function init() {
  // Get selectors.
  const selectors = getSelectors();

  // Create class instances.
  const { searcher, errorHandler, api, ui, validator } =
    createInstances(selectors);
  // Add search event listener.
  search(selectors, searcher, errorHandler, api, ui, validator, config);
  // Add load page event listener.
  loadDefaultWeather(errorHandler, api, ui, config);
}

function getSelectors() {
  // Define selectors. These are the HTML elements.
  const selectors = {
    // Weather and weather details.
    city: 'city-name',
    country: 'country-name',
    temperature: 'temperature-number',
    weather: 'weather-type',
    feelsLike: 'feels-like',
    wind: 'wind',
    barometer: 'barometer',
    visibility: 'visibility',
    humidity: 'humidity',
    precipitation: 'precipitation',
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

    // Search element.
    searchElement: 'search',

    // Error Element.
    errorElement: 'search-error-message',
  };

  return selectors;
}

function createInstances(selectors) {
  // Create class instances.
  // New Searcher instance. Search element added as argument.
  const searcher = new Searcher(selectors.searchElement);
  // New API instance. url and apiKey variables added as arguments
  const api = new API();
  // New UI instance. Selectors added as argument.
  const ui = new UI(selectors);
  // New ErrorHandler instance. Error element added as argument.
  const errorHandler = new ErrorHandler(selectors.errorElement);
  // New Validator instance. Error element added as argument.
  const validator = new Validator(errorHandler);

  return { searcher, api, ui, errorHandler, validator, config };
}

// This function will be called when the page finishes loading.
// This is responsible for the default load page data.
function loadDefaultWeather(errorHandler, api, ui, config) {
  // Set default location.
  const searchValue = 'Newcastle, UK';
  window.addEventListener('load', async () => {
    // Get the weather data URL.
    const weatherDataURl = buildWeatherURL(config, searchValue);
    try {
      // Fetch the weather data.
      const weatherData = await api.fetchData(weatherDataURl);
      console.log(weatherData);
      console.log(dayGetter(weatherData.forecast.forecastday[0].date_epoch));
      // After receiving the weather data, update the UI.
      updateUI(ui, weatherData);
    } catch (error) {
      handleErrors(error, errorHandler);
    }
  });
}

function search(selectors, searcher, errorHandler, api, ui, validator, config) {
  const { regex } = config;
  // On search, fetch weather data and update UI.
  searcher.onSearch(async () => {
    // Clear errorElement text in necessary.
    if (selectors.errorElement) {
      errorHandler.clearError();
    }
    // Get the search value.
    const searchValue = searcher.getSearchValue().trim();
    console.log(searchValue);
    if (
      validator.validateSearch(searchValue) &&
      validator.validateSearchRegex(regex.searchRegex, searchValue)
    ) {
      // If all validation checks pass.
      // Get the weather data URL.
      const weatherDataURl = buildWeatherURL(config, searchValue);
      try {
        // Fetch the weather data.
        const weatherData = await api.fetchData(weatherDataURl);
        console.log(weatherData);
        console.log(dayGetter(weatherData.forecast.forecastday[0].date_epoch));
        // After receiving the weather data, update the UI.
        updateUI(ui, weatherData);
      } catch (error) {
        handleErrors(error, errorHandler);
      }
    }
  });
}

function updateUI(ui, weatherData) {
  updateLocationUI(ui, weatherData);
  updateTempUI(ui, weatherData);
  updateDetailsUI(ui, weatherData);
  updateForecastWeather(ui, weatherData);
}

// Update location UI.
function updateLocationUI(ui, weatherData) {
  ui.updateTextContent('city', weatherData.location.name);
  ui.updateTextContent('country', weatherData.location.country);
}

// Update temperature UI.
function updateTempUI(ui, weatherData) {
  ui.updateTextContent('temperature', weatherData.current.temp_c + '°');
}

// Update weather details UI.
function updateDetailsUI(ui, weatherData) {
  ui.updateTextContent('weather', weatherData.current.condition.text);
  ui.updateTextContent('feelsLike', weatherData.current.feelslike_c + ' °C');
  ui.updateTextContent('wind', weatherData.current.wind_kph + ' kph');
  ui.updateTextContent('barometer', weatherData.current.pressure_mb + ' mb');
  ui.updateTextContent('visibility', weatherData.current.vis_km + ' km');
  ui.updateTextContent('humidity', weatherData.current.humidity + ' %');
  ui.updateTextContent('precipitation', weatherData.current.precip_mm + ' mm');
}

// Function for updating the forecast weather UI.
function updateForecastWeather(ui, weatherData) {
  ui.updateTextContent(
    'firstForecastDay',
    dayGetter(weatherData.forecast.forecastday[0].date_epoch)
  );
  ui.updateTextContent(
    'secondForecastDay',
    dayGetter(weatherData.forecast.forecastday[1].date_epoch)
  );
  ui.updateTextContent(
    'thirdForecastDay',
    dayGetter(weatherData.forecast.forecastday[2].date_epoch)
  );
  ui.updateTextContent(
    'firstForecastHigh',
    weatherData.forecast.forecastday[0].day.maxtemp_c + ' °C'
  );
  ui.updateTextContent(
    'secondForecastHigh',
    weatherData.forecast.forecastday[1].day.maxtemp_c + ' °C'
  );
  ui.updateTextContent(
    'thirdForecastHigh',
    weatherData.forecast.forecastday[2].day.maxtemp_c + ' °C'
  );
  ui.updateTextContent(
    'firstForecastLow',
    weatherData.forecast.forecastday[0].day.mintemp_c + ' °C'
  );
  ui.updateTextContent(
    'secondForecastLow',
    weatherData.forecast.forecastday[1].day.mintemp_c + ' °C'
  );
  ui.updateTextContent(
    'thirdForecastLow',
    weatherData.forecast.forecastday[2].day.mintemp_c + ' °C'
  );
  ui.setSrc(
    'firstForecastIcon',
    weatherData.forecast.forecastday[0].day.condition.icon
  );
  ui.setSrc(
    'secondForecastIcon',
    weatherData.forecast.forecastday[1].day.condition.icon
  );
  ui.setSrc(
    'thirdForecastIcon',
    weatherData.forecast.forecastday[2].day.condition.icon
  );
}

// Function for handling the errors.
function handleErrors(error, errorHandler) {
  if (error.message === 'No data found for the provided query') {
    // Error message user receives.
    errorHandler.displayError(
      `Sorry, we couldn't find any weather data for the entered city. Please check the spelling or try another city.`
    );
    // Console error message.
    console.error(`TypeError occurred: ${error.message}`);
  }
  if (error instanceof TypeError) {
    // Error message user receives.
    errorHandler.displayError(
      `There has been an error. Our team is currently working to fix the problem.`
    );
    // Console error message.
    console.error(`TypeError occurred: ${error.message}`);
  } else if (error instanceof SyntaxError) {
    // Error message user receives.
    errorHandler.displayError(
      `There has been an error. Our team is currently working to fix the problem.`
    );
    // Console error message.
    console.error(`SyntaxError occurred: ${error.message}`);
  } else {
    // Error message user receives.
    errorHandler.displayError(
      `Sorry, we couldn't find any weather data for the entered city. Please check the spelling or try another city.`
    );
    // Console error message.
    console.error(`An error has occurred: ${error.message}`);
  }
}

init();
