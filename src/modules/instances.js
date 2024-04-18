import Searcher from './modules/searcher';
import API from './modules/api';
import UI from './modules/ui';
import Validator from './modules/validator';
import ErrorHandler from './modules/errorHandler';

function createInstances(selectors) {
  // Create class instances.
  // New Searcher instance. Search element added as argument.
  const searcher = new Searcher(selectors.searchElement);
  // New API instance. url and apiKey variables added as arguments
  const api = new API();
  // New UI instance. Selectors added as argument.
  const ui = new UI(selectors);
  // New ErrorHandler instance. Error element added as argument.
  const errorHandler = new ErrorHandler(selectors.errorElement);
  // New Validator instance. Error element added as argument.
  const validator = new Validator(errorHandler);

  return { searcher, api, ui, errorHandler, validator, config };
}

export default createInstances;
