// Function for search validation.
function validateSearch(searchValue, errorElement) {
  const element = document.getElementById(errorElement);

  // If the search value is missing show error message and return false.
  if (!searchValue) {
    element.textContent = 'Please enter a valid city.';
    return false;
  } else {
    // If a search value is present return true.
    element.textContent = '';
    return true;
  }
}

export default validateSearch;