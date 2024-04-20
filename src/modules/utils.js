function getSelectors() {
  // Define selectors. These are the HTML elements.
  const selectors = {
    // Weather and weather details.
    city: 'city-name',
    country: 'country-name',
    temperature: 'temperature-number',
    weather: 'weather-type',
    feelsLike: 'feels-like',
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

    // Celsius unit symbol.
    celsiusSymbol: 'celsius-symbol',

    // Fahrenheit unit symbol.
    fahrenheitSymbol: 'fahrenheit-symbol',

    // Toggle units button.
    toggleUnits: 'toggle-units',

    // Loading spinner.
    loadingIndicator: 'loading-indicator',
  };

  return selectors;
}

// Returns named day of the week.
function dayGetter(timestamp) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(timestamp * 1000);
  const dayOfWeekIndex = date.getDay();
  // If dayOfWeekIndex = 0, Sunday will be returned from the daysOfWeek array.
  return daysOfWeek[dayOfWeekIndex];
}

// Function for building the weather URL.
function buildWeatherURL(config, searchValue) {
  const { weatherURL } = config;
  //  Build the URL
  const weatherDataURl = `${weatherURL.weatherForecastURL}?key=${weatherURL.apiKey}&q=${searchValue}&days=${weatherURL.days}`;
  console.log(weatherDataURl);
  return weatherDataURl;
}

export { getSelectors, dayGetter, buildWeatherURL };
