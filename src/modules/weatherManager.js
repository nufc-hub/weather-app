class WeatherManager {
  constructor(
    selectors,
    config,
    searcher,
    errorHandler,
    api,
    ui,
    validator,
    isMetric
  ) {
    this.selectors = selectors;
    this.config = config;
    this.searcher = searcher;
    this.errorHandler = errorHandler;
    this.api = api;
    this.ui = ui;
    this.validator = validator;
    this.isMetric = isMetric;
  }

  // This is responsible for the default load page data.
  async loadDefaultWeather() {
    // Set default location.
    const searchValue = 'Newcastle, UK';

    // Get the weather data URL.
    const weatherDataURl = buildWeatherURL(config, searchValue);
    try {
      // Fetch the weather data.
      const weatherData = await api.fetchData(weatherDataURl);
      console.log(weatherData);
      console.log(dayGetter(weatherData.forecast.forecastday[0].date_epoch));
      // After receiving the weather data, update the UI.
      handleNonUnitUI(ui, weatherData, dayGetter, errorHandler);
      handleUIMetric(ui, weatherData, dayGetter, errorHandler);
    } catch (error) {
      errorHandler.handleErrors(error);
    }
  }

  // This is responsible for search bar functionality.
  async search() {
    const { regex } = config;
    // On search, fetch weather data and update UI.

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
        if (isMetric) {
          handleNonUnitUI(ui, weatherData, dayGetter, errorHandler);
          handleUIMetric(ui, weatherData, dayGetter, errorHandler);
        } else {
          // UpdateUIFahrenheit
        }
      } catch (error) {
        errorHandler.handleErrors(error);
      }
    }
  }
}

export default WeatherManager;
