class Validator {
  constructor(errorHandler) {
    this.errorHandler = errorHandler;
  }

  // Function for search validation.
  validateSearch(searchValue) {
    // If the user enters an empty value return false.
    if (!searchValue) {
      this.errorHandler.displayError('Please enter a city name.');
      return false;
    } else {
      // If a search value is present return true.
      return true;
    }
  }

  validateSearchRegex(searchRegex, searchValue) {
    // If user enters a search value that doesn't follow the set regex.
    if (!searchRegex.test(searchValue)) {
      this.errorHandler.displayError(
        `Invalid location format. Please enter as 'City', 'City, State', 'City, Country' or 'Post/Zip code.`
      );
      return false;
    } else {
      // If search regex is valid return true.
      return true;
    }
  }
}

export default Validator;
