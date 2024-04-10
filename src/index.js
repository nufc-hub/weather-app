import './css/style.css';
import 'normalize.css';
import Searcher from './modules/searcher';
import API from './modules/api';
import UI from './modules/ui';

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

  const url = 'https://api.weatherapi.com/v1/current.json';
  const apiKey = '573237ec7c1e4149932133700241903';

  const searcher = new Searcher(searchElement);
  const api = new API(url, apiKey); // Add correct arguments in.
  const ui = new UI(selectors);

  searcher.onSearch(async () => {
    const searchValue = searcher.getSearchValue();
    const fullApiURL = api.buildUrl(searchValue);
    console.log(fullApiURL);
  });
}

init();
