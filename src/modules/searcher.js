class Searcher {
  constructor(elementID) {
    this.searchInput = document.getElementById(elementID);
    this.searchIcon = document.getElementById(elementID);

    // Makes sure that the 'this' inside the onSearch function always refers to the instance of the Search class.
    this.onSearch = this.onSearch.bind(this);
  }

  // Gets value of search bar input.
  getSearchValue() {
    return this.searchInput.value;
  }

  // Clears the search bar.
  clearSearchValue() {
    this.searchInput.value = '';
  }

  // Function to trigger search functionality.
  onSearch(callback) {
    this.searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const searchValue = this.getSearchValue();
        callback(searchValue);
        this.clearSearchValue();
      }
    });
  }
}

export default Searcher;
