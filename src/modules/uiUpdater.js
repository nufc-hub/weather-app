// Includes functions for updating UI.

const updateNonUnitUI = {
  // Update location UI.
  updateLocationUI: function (ui, weatherData) {
    ui.updateTextContent('city', weatherData.location.name);
    ui.updateTextContent('country', weatherData.location.country);
  },

  // Function for updating the forecast days UI.
  updateForecastDayUI: function (ui, weatherData) {
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
  },

  // Function for updating the forecast weather icon.
  updateForecastIconUI: function (ui, weatherData) {
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
  },
};

const updateMetricUI = {
  // Update temperature UI in metric.
  updateTempMetricUI: function (ui, weatherData) {
    ui.updateTextContent('temperature', weatherData.current.temp_c + '°');
  },

  // Update weather details UI using metric.
  updateDetailsMetricUI: function (ui, weatherData) {
    ui.updateTextContent('weather', weatherData.current.condition.text);
    ui.updateTextContent('feelsLike', weatherData.current.feelslike_c + ' °C');
    ui.updateTextContent('wind', weatherData.current.wind_kph + ' kph');
    ui.updateTextContent('barometer', weatherData.current.pressure_mb + ' mb');
    ui.updateTextContent('visibility', weatherData.current.vis_km + ' km');
    ui.updateTextContent('humidity', weatherData.current.humidity + ' %');
    ui.updateTextContent(
      'precipitation',
      weatherData.current.precip_mm + ' mm'
    );
  },

  // Function for updating the forecast temperature UI in metric.
  updateForecastTempMetricUI: function (ui, weatherData) {
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
  },
};

const updateImperialUI = {
  // Update temperature UI in imperial.
  updateTempImperialUI: function (ui, weatherData) {
    ui.updateTextContent('temperature', weatherData.current.temp_f + '°');
  },

  // Update weather details UI using imperial.
  updateDetailsImperialUI: function (ui, weatherData) {
    ui.updateTextContent('weather', weatherData.current.condition.text);
    ui.updateTextContent('feelsLike', weatherData.current.feelslike_f + ' °F');
    ui.updateTextContent('wind', weatherData.current.wind_mph + ' mph');
    ui.updateTextContent('barometer', weatherData.current.pressure_in + ' in');
    ui.updateTextContent('visibility', weatherData.current.vis_miles + ' m');
    ui.updateTextContent('humidity', weatherData.current.humidity + ' %');
    ui.updateTextContent(
      'precipitation',
      weatherData.current.precip_in + ' in'
    );
  },

  // Function for updating the forecast temperature UI in imperial.
  updateForecastTempImperialUI: function (ui, weatherData) {
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
  },
};

export { updateNonUnitUI, updateMetricUI, updateImperialUI };
