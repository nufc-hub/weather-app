class WeatherManager {
  constructor(
    selectors,
    config,
    dayGetter,
    nonUnitUI,
    metricUI,
    imperialUI,
    buildWeatherURL,
    searcher,
    errorHandler,
    api,
    ui,
    validator
  ) {
    this.selectors = selectors;
    this.config = config;
    this.isMetric = true;
    this.dayGetter = dayGetter;
    this.nonUnitUI = nonUnitUI;
    this.metricUI = metricUI;
    this.imperialUI = imperialUI;
    this.buildWeatherURL = buildWeatherURL;
    this.searcher = searcher;
    this.errorHandler = errorHandler;
    this.api = api;
    this.ui = ui;
    this.validator = validator;
    this.fetchedWeatherData = null;
  }

  toggleUnits() {
    this.isMetric = !this.isMetric;
    if (this.isMetric) {
      this.metricUI(this.ui, this.fetchedWeatherData, this.errorHandler);
    } else {
      this.imperialUI(this.ui, this.fetchedWeatherData, this.errorHandler);
    }
  }

  // This is responsible for the default load page data.
  async loadDefaultWeather() {
    // Set default location.
    const searchValue = 'Newcastle, UK';

    // Get the weather data URL.
    const weatherDataURl = this.buildWeatherURL(this.config, searchValue);
    try {
      // Fetch the weather data.
      const weatherData = await this.api.fetchData(weatherDataURl);

      // Add weather data to the constructor so it can be used by other functions.
      this.fetchedWeatherData = weatherData;
      console.log(weatherData);
      console.log(
        this.dayGetter(weatherData.forecast.forecastday[0].date_epoch)
      );
      // After receiving the weather data, update the UI.
      this.nonUnitUI(this.ui, weatherData, this.dayGetter, this.errorHandler);
      // If isMetric is false, show imperial units.
      if (!this.isMetric) {
        this.imperialUI(this.ui, weatherData, this.errorHandler);
      } else {
        // If isMetric is true, show metric units.
        this.metricUI(this.ui, weatherData, this.errorHandler);
      }
    } catch (error) {
      this.errorHandler.handleErrors(error);
    }
  }

  // This is responsible for search bar functionality.
  async search() {
    const { regex } = this.config;
    // On search, fetch weather data and update UI.

    // Clear errorElement text in necessary.
    if (this.selectors.errorElement) {
      this.errorHandler.clearError();
    }
    // Get the search value.
    const searchValue = this.searcher.getSearchValue().trim();
    console.log(searchValue);
    if (
      this.validator.validateSearch(searchValue) &&
      this.validator.validateSearchRegex(regex.searchRegex, searchValue)
    ) {
      // If all validation checks pass.
      // Get the weather data URL.
      const weatherDataURl = this.buildWeatherURL(this.config, searchValue);
      try {
        // Fetch the weather data.
        const weatherData = await this.api.fetchData(weatherDataURl);

        // Add weather data to the constructor so it can be used by other functions.
        this.fetchedWeatherData = weatherData;

        console.log(weatherData);
        console.log(
          this.dayGetter(weatherData.forecast.forecastday[0].date_epoch)
        );
        // After receiving the weather data, update the UI.
        this.nonUnitUI(this.ui, weatherData, this.dayGetter, this.errorHandler);
        if (!this.isMetric) {
          this.imperialUI(this.ui, weatherData, this.errorHandler);
        } else {
          // If isMetric is true, show metric units.
          this.metricUI(this.ui, weatherData, this.errorHandler);
        }
      } catch (error) {
        this.errorHandler.handleErrors(error);
      }
    }
  }
}

export default WeatherManager;
