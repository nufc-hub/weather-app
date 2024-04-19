import './css/style.css';
import './css/normalize.css';
import { getSelectors } from './modules/utils';
import createInstances from './modules/instances';

function init() {
  const selectors = getSelectors();
  const toggleButton = document.getElementById(selectors.toggleUnits);
  console.log(toggleButton);
  // Create class instances.
  const { searcher, weatherManager } = createInstances(selectors);

  // Add load page event listener.
  window.addEventListener('load', async () => {
    await weatherManager.loadDefaultWeather();
  });

  // Add search event listener.
  searcher.onSearch(async () => {
    await weatherManager.search();
  });

  // Add toggle units event listener.
  toggleButton.addEventListener('click', () => {
    weatherManager.toggleUnits();
  });
}

init();
