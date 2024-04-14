import './css/style.css';
import 'normalize.css';
import Searcher from './modules/searcher';
import API from './modules/api';
import UI from './modules/ui';
import validateSearch from './modules/validation';
import ErrorHandler from './modules/errorHandler';
import dayGetter from './modules/utils';

function init() {
  // Get selectors.
  const selectors = getSelectors();

  // Create class instances.
  const { searcher, errorHandler, api, ui, config } =
    createInstances(selectors);

  search(selectors, searcher, errorHandler, api, ui, config);
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
  // Define the forecast weather url
  const config = {
    weatherURL: {
      weatherForecastURL: 'https://api.weatherapi.com/v1/forecast.json',
      // Define the api key.
      apiKey: '573237ec7c1e4149932133700241903',
      //Define number of forecast days
      days: '3',
    },
    regex: {
      // Define search regex
      searchRegex: /^[a-zA-Z\s'-]+$/,
    },
  };

  // Create class instances.
  // New Searcher instance. Search element added as argument.
  const searcher = new Searcher(selectors.searchElement);
  // New API instance. url and apiKey variables added as arguments
  const api = new API();
  // New UI instance. Selectors added as argument.
  const ui = new UI(selectors);
  // New ErrorHandler instance. Error element added as argument.
  const errorHandler = new ErrorHandler(selectors.errorElement);

  return { searcher, api, ui, errorHandler, config };
}

function search(selectors, searcher, errorHandler, api, ui, config) {
  const { weatherURL, regex } = config;
  // On search, fetch weather data and update UI.
  searcher.onSearch(async () => {
    // Clear errorElement text in necessary.
    if (selectors.errorElement) {
      errorHandler.clearError();
    }
    // Get the search value.
    const searchValue = searcher.getSearchValue().trim();
    console.log(searchValue);
    // If user enters an empty search value.
    if (!searchValue) {
      errorHandler.displayError(
        'Please enter a city name.',
        selectors.errorElement
      );
    } else if (!regex.searchRegex.test(searchValue)) {
      // If user enters a search value that doesn't follow the set regex.
      errorHandler.displayError(
        `Invalid location format. Please enter as 'City', 'City, State', 'City, Country' or 'Post/Zip code.`,
        selectors.errorElement
      );
    } else if (validateSearch(searchValue, selectors.errorElement)) {
      // Validate the search.
      //  Build the URL
      const weatherDataURl = `${weatherURL.weatherForecastURL}?key=${weatherURL.apiKey}&q=${searchValue}&days=${weatherURL.days}`;
      console.log(weatherDataURl);
      try {
        // Fetch the weather data.
        const weatherData = await api.fetchData(weatherDataURl);
        console.log(weatherData);
        console.log(dayGetter(weatherData.forecast.forecastday[0].date_epoch));

        updateUI(ui, weatherData);
      } catch (error) {
        handleErrors(error, errorHandler);
      }
    }
  });
}

function updateUI(ui, weatherData) {
  updateCurrentWeather(ui, weatherData);
  updateForecastWeather(ui, weatherData);
}

function updateCurrentWeather(ui, weatherData) {
  // Update the UI.
  ui.updateTextContent('city', weatherData.location.name);
  ui.updateTextContent('country', weatherData.location.country);
  ui.updateTextContent('temperature', weatherData.current.temp_c + '°');
  ui.updateTextContent('weather', weatherData.current.condition.text);
  ui.updateTextContent('feelsLike', weatherData.current.feelslike_c + ' °C');
  ui.updateTextContent('wind', weatherData.current.wind_kph + ' kph');
  ui.updateTextContent('barometer', weatherData.current.pressure_mb + ' mb');
  ui.updateTextContent('visibility', weatherData.current.vis_km + ' km');
  ui.updateTextContent('humidity', weatherData.current.humidity + ' %');
  ui.updateTextContent('precipitation', weatherData.current.precip_mm + ' mm');
}

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
