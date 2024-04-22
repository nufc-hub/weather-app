// Includes functions for updating UI.

const updateNonUnitUI = {
  // Update location UI.
  updateLocationUI: function (ui, weatherData) {
    ui.updateTextContent('city', weatherData.location.name);
    ui.updateTextContent('country', weatherData.location.country);
  },

  // Function for updating the forecast days UI.
  updateForecastDayUI: function (ui, weatherData, dayGetter) {
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
    ui.setSrc('weather', weatherData.current.condition.icon);
    ui.updateTextContent('feelsLike', weatherData.current.feelslike_c + ' °C');
    ui.updateTextContent('humidity', weatherData.current.humidity + ' %');
    ui.updateTextContent('UV', weatherData.current.uv);
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
    ui.updateTextContent('UV', weatherData.current.uv);
  },

  // Function for updating the forecast temperature UI in imperial.
  updateForecastTempImperialUI: function (ui, weatherData) {
    ui.updateTextContent(
      'firstForecastHigh',
      weatherData.forecast.forecastday[0].day.maxtemp_f + ' °F'
    );
    ui.updateTextContent(
      'secondForecastHigh',
      weatherData.forecast.forecastday[1].day.maxtemp_f + ' °F'
    );
    ui.updateTextContent(
      'thirdForecastHigh',
      weatherData.forecast.forecastday[2].day.maxtemp_f + ' °F'
    );
    ui.updateTextContent(
      'firstForecastLow',
      weatherData.forecast.forecastday[0].day.mintemp_f + ' °F'
    );
    ui.updateTextContent(
      'secondForecastLow',
      weatherData.forecast.forecastday[1].day.mintemp_f + ' °F'
    );
    ui.updateTextContent(
      'thirdForecastLow',
      weatherData.forecast.forecastday[2].day.mintemp_f + ' °C'
    );
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

function setUVLevel(ui, weatherData) {
  const uv = weatherData.current.uv;

  if (weatherData.current.uv < 3) {
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
