// Includes functions for updating UI.

const updateNonUnitUI = {
  // Update location UI.
  updateLocationUI: function (ui, weatherData) {
    const location = weatherData.location;
    ui.updateTextContent('city', location.name);
    ui.updateTextContent('country', weatherData.location.country);
  },

  // Update UV level.
  setUVLevel: function (ui, weatherData) {
    // Current UV level.
    const uv = weatherData.current.uv;
    // Sets the UV UI text content depending on the UV level.
    if (weatherData.current.uv < 3) {
      // Set message depending on level of UV.
      return ui.updateTextContent('UV', 'Low');
    } else if (uv < 6) {
      return ui.updateTextContent('UV', 'Moderate');
    } else if (uv < 8) {
      return ui.updateTextContent('UV', 'High');
    } else if (uv < 11) {
      return ui.updateTextContent('UV', 'Very High');
    } else {
      return ui.updateTextContent('UV', 'Extreme');
    }
  },

  updateCurrentWeather: function (ui, weatherData) {
    const currentWeather = weatherData.current;
    ui.setSrc('weatherIcon', currentWeather.condition.icon);
    ui.updateTextContent('weatherType', currentWeather.condition.text);
  },

  // Function for updating the forecast days UI.
  updateForecastDayUI: function (ui, weatherData, dayGetter) {
    const forecastDay = weatherData.forecast.forecastday;
    ui.updateTextContent(
      'firstForecastDay',
      dayGetter(forecastDay[0].date_epoch)
    );
    ui.updateTextContent(
      'secondForecastDay',
      dayGetter(forecastDay[1].date_epoch)
    );
    ui.updateTextContent(
      'thirdForecastDay',
      dayGetter(forecastDay[2].date_epoch)
    );
  },

  // Function for updating the forecast weather icon.
  updateForecastIconUI: function (ui, weatherData) {
    const forecastDay = weatherData.forecast.forecastday;
    ui.setSrc('firstForecastIcon', forecastDay[0].day.condition.icon);
    ui.setSrc('secondForecastIcon', forecastDay[1].day.condition.icon);
    ui.setSrc('thirdForecastIcon', forecastDay[2].day.condition.icon);
  },
};

const updateMetricUI = {
  updateCurrentTempMetricUI: function (ui, weatherData) {
    const currentWeather = weatherData.current;
    ui.updateTextContent('temperature', currentWeather.temp_c + '°C');
  },

  // Update weather details UI using metric.
  updateDetailsMetricUI: function (ui, weatherData) {
    const currentWeather = weatherData.current;

    ui.updateTextContent('feelsLike', currentWeather.feelslike_c + ' °C');
    ui.updateTextContent('humidity', currentWeather.humidity + ' %');
  },

  // Function for updating the forecast temperature UI in metric.
  updateForecastTempMetricUI: function (ui, weatherData) {
    const forecastDay = weatherData.forecast.forecastday;
    ui.updateTextContent(
      'firstForecastHigh',
      forecastDay[0].day.maxtemp_c + ' °C'
    );
    ui.updateTextContent(
      'secondForecastHigh',
      forecastDay[1].day.maxtemp_c + ' °C'
    );
    ui.updateTextContent(
      'thirdForecastHigh',
      forecastDay[2].day.maxtemp_c + ' °C'
    );
    ui.updateTextContent(
      'firstForecastLow',
      forecastDay[0].day.mintemp_c + ' °C'
    );
    ui.updateTextContent(
      'secondForecastLow',
      forecastDay[1].day.mintemp_c + ' °C'
    );
    ui.updateTextContent(
      'thirdForecastLow',
      forecastDay[2].day.mintemp_c + ' °C'
    );
  },

  updateUnitsSelector: function (ui) {
    ui.updateTextContent('toggleUnits', 'Display in °F');
  },
};

const updateImperialUI = {
  // Update temperature UI in imperial.
  updateCurrentTempImperialUI: function (ui, weatherData) {
    const currentWeather = weatherData.current;
    ui.updateTextContent('temperature', currentWeather.temp_f + ' °F');
  },

  // Update weather details UI using imperial.
  updateDetailsImperialUI: function (ui, weatherData) {
    const currentWeather = weatherData.current;
    ui.updateTextContent('feelsLike', currentWeather.feelslike_f + ' °F');
    ui.updateTextContent('wind', currentWeather.wind_mph + ' mph');
    ui.updateTextContent('barometer', currentWeather.pressure_in + ' in');
    ui.updateTextContent('visibility', currentWeather.vis_miles + ' m');
    ui.updateTextContent('humidity', currentWeather.humidity + ' %');
  },

  // Function for updating the forecast temperature UI in imperial.
  updateForecastTempImperialUI: function (ui, weatherData) {
    const forecastDay = weatherData.forecast.forecastday;
    ui.updateTextContent(
      'firstForecastHigh',
      forecastDay[0].day.maxtemp_f + ' °F'
    );
    ui.updateTextContent(
      'secondForecastHigh',
      forecastDay[1].day.maxtemp_f + ' °F'
    );
    ui.updateTextContent(
      'thirdForecastHigh',
      forecastDay[2].day.maxtemp_f + ' °F'
    );
    ui.updateTextContent(
      'firstForecastLow',
      forecastDay[0].day.mintemp_f + ' °F'
    );
    ui.updateTextContent(
      'secondForecastLow',
      forecastDay[1].day.mintemp_f + ' °F'
    );
    ui.updateTextContent(
      'thirdForecastLow',
      forecastDay[2].day.mintemp_f + ' °C'
    );
  },

  updateUnitsSelector: function (ui) {
    ui.updateTextContent('toggleUnits', 'Display in °C');
  },
};

// Handle weather data UI not related to units of measurement.
function handleNonUnitUI(ui, weatherData, dayGetter, errorHandler) {
  // Loop through the objects and execute all functions to update the UI.
  for (const key in updateNonUnitUI) {
    // Check if the object has a property named key.
    if (Object.hasOwnProperty.call(updateNonUnitUI, key)) {
      // Create variable for updateNonUnitUI[key].
      const updateFunction = updateNonUnitUI[key];
      // If it's a function, then execute the function.
      if (typeof updateFunction === 'function') {
        try {
          updateFunction(ui, weatherData, dayGetter);
        } catch (error) {
          errorHandler.displayError(error);
        }
      } else {
        errorHandler.handleErrors(error);
      }
    }
  }
}

// Handle weather data UI related to metric units of measurement.
function handleUIMetric(ui, weatherData, errorHandler) {
  for (const key in updateMetricUI) {
    if (Object.hasOwnProperty.call(updateMetricUI, key)) {
      const updateFunction = updateMetricUI[key];
      if (typeof updateMetricUI[key] === 'function') {
        try {
          updateFunction(ui, weatherData);
        } catch (error) {
          errorHandler.displayError(error);
        }
      } else {
        errorHandler.handleErrors(error);
      }
    }
  }
}

// Handle weather data UI related to imperial units of measurement.
function handleUIImperial(ui, weatherData, errorHandler) {
  // Loop through the objects and execute all functions to update the UI.
  for (const key in updateImperialUI) {
    if (Object.hasOwnProperty.call(updateImperialUI, key)) {
      const updateFunction = updateImperialUI[key];
      if (typeof updateImperialUI[key] === 'function') {
        try {
          updateFunction(ui, weatherData);
        } catch (error) {
          errorHandler.displayError(error);
        }
      } else {
        errorHandler.handleErrors(error);
      }
    }
  }
}

const loadingScreenUI = {
  showLoadingScreen: function (selectors) {
    const { loadingIndicator } = selectors;
    document.getElementById(loadingIndicator).style.display = 'flex';
  },

  hideLoadingScreen: function (selectors) {
    const { loadingIndicator } = selectors;
    document.getElementById(loadingIndicator).style.display = 'none';
  },
};

export { handleNonUnitUI, handleUIMetric, handleUIImperial, loadingScreenUI };
