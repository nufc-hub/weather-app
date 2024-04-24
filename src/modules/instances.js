import Searcher from './searcher';
import API from './api';
import UI from './ui';
import Validator from './validator';
import ErrorHandler from './errorHandler';
import WeatherManager from './weatherManager';
import {
  handleNonUnitUI,
  handleUIMetric,
  handleUIImperial,
  loadingScreenUI,
} from './uiUpdater';
import { buildWeatherURL, dayGetter } from './utils';
import config from './config';

function createInstances(selectors) {
  // Create class instances.
  // New Searcher instance. Search element added as argument.
  const searcher = new Searcher(selectors.searchInput, selectors.searchIcon);
  // New API instance. url and apiKey variables added as arguments
  const api = new API();
  // New UI instance. Selectors added as argument.
  const ui = new UI(selectors);
  // New ErrorHandler instance. Error element added as argument.
  const errorHandler = new ErrorHandler(selectors.errorElement);
  // New Validator instance. Error element added as argument.
  const validator = new Validator(errorHandler);
  // New WeatherManager.
  const weatherManager = new WeatherManager(
    selectors,
    config,
    dayGetter,
    handleNonUnitUI,
    handleUIMetric,
    handleUIImperial,
    buildWeatherURL,
    searcher,
    errorHandler,
    api,
    ui,
    validator,
    loadingScreenUI
  );

  return { searcher, api, ui, errorHandler, validator, weatherManager };
}

export default createInstances;
