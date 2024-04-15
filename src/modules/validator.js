class Validator {
  constructor(errorElement) {
    this.errorElement = this.errorElement =
      document.getElementById(errorElement);
  }

  // Function for search validation.
  validateSearch(searchValue) {
    // If the search value is missing show error message and return false.
    if (!searchValue) {
      this.errorElement.textContent = 'Please enter a valid city.';
      return false;
    } else {
      // If a search value is present return true.
      this.errorElement.textContent = '';
      return true;
    }
  }
}

export default Validator;
