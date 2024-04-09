class Searcher {
  constructor(searchElement) {
    this.searchElement = searchElement;
  }

  // Gets value of search bar input.
  getSearchValue() {
    const searchValue = this.searchElement.value;
    return searchValue;
  }

  // Clears the search bar.
  clearSearchValue() {
    this.searchElement.value = '';
  }
}

export default Searcher;
