import './css/style.css';
import 'normalize.css';
import Searcher from './modules/searcher';

class Fetcher {
  // Returns the parsed weather data object from the API
  async fetchAPI(fetchedURL) {
    try {
      const response = await fetch(fetchedURL, { mode: 'cors' });
      const weatherData = await response.json();

      return weatherData;
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
    }
  }
}

class UI {
  constructor(selectors) {
    this.elements = {};

    for (const key in selectors) {
      if (selectors.hasOwnProperty(key)) {
        this.elements[key] = document.getElementById(selectors[key]);
      }
    }
  }

  updateTextContent(elementKey, newTextContent) {
    const element = this.elements[elementKey];

    if (element) {
      element.textContent = newTextContent;
    }
  }
}

class EventHandler {
  constructor(searchElement, searcher, fetcher, urlProvider) {
    this.searchElement = searchElement;
    this.searcher = searcher;
    this.fetcher = fetcher;
    this.urlProvider = urlProvider;
  }

  // Adds event listener to the search bar.
  addSearchEvent() {
    this.searchElement.addEventListener('keypress', (event) => {
      const apiUrl = this.urlProvider.fetchedApiUrl(
        'https://api.weatherapi.com/v1/current.json?key=573237ec7c1e4149932133700241903&q='
      );
      const searchValue = this.searcher.getSearchValue();
      const fetchedURL = apiUrl + searchValue;
      if (event.key === 'Enter' && searchValue !== '') {
        console.log(fetchedURL);
        this.fetcher
          .fetchAPI(fetchedURL)
          .then((weatherData) => {
            const city = document.getElementById('city-name');
            city.textContent = weatherData.location.name;
            console.log(weatherData);
          })
          .catch((error) => {
            console.error(error);
          });
        this.searcher.clearSearchValue();
      }
    });
  }
}

class URLProvider {
  fetchedApiUrl(url) {
    return url;
  }
}

function init() {
  const selectors = {
    city: 'city-name',
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
  };

  const searchElement = document.getElementById('search');

  const searcher = new Searcher(searchElement);
  const fetcher = new Fetcher();
  const urlProvider = new URLProvider();
  const ui = new UI(selectors);
  const eventHandler = new EventHandler(
    searchElement,
    searcher,
    fetcher,
    urlProvider
  );
  eventHandler.addSearchEvent();
}

init();
