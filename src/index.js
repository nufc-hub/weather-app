import './css/style.css';
import './css/normalize.css';
import { getSelectors } from './modules/utils';
import createInstances from './modules/instances';

function init() {
  const selectors = getSelectors();
  const toggleButton = document.getElementById(selectors.toggleUnits);

  // Create class instances.
  const { searcher, weatherManager } = createInstances(selectors);

  // Add load page event listener.
  window.addEventListener('load', () => {
    weatherManager.loadDefaultWeather();
  });

  // Add search enter event listener.
  searcher.onSearchEnter(() => {
    weatherManager.search();
  });

  // Add search icon click event listener.
  searcher.onSearchClick(() => {
    weatherManager.search();
  });

  // Add toggle units event listener.
  toggleButton.addEventListener('click', () => {
    weatherManager.toggleUnits();
  });
}

init();
