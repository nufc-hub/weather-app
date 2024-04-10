class Searcher {
  constructor(searchElement) {
    this.searchElement = searchElement;

    // Makes sure that the 'this' inside the onSearch function always refers to the instance of the Search class.
    this.onSearch = this.onSearch.bind(this);
  }

  // Gets value of search bar input.
  getSearchValue() {
    return this.searchElement.value;
  }

  // Clears the search bar.
  clearSearchValue() {
    this.searchElement.value = '';
  }

  // Function to trigger search functionality.
  onSearch(callback) {
    this.searchElement.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const searchValue = this.getSearchValue();
        if (searchValue !== '') {
          callback(searchValue);
        }
        this.clearSearchValue();
      }
    });
  }
}

export default Searcher;
