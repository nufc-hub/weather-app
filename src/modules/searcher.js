class Searcher {
  constructor(searchInputID, searchIconID) {
    this.searchInput = document.getElementById(searchInputID);
    this.searchIcon = document.getElementById(searchIconID);

    // Makes sure that the 'this' inside the onSearch functions always refers to the instance of the Search class.
    this.onSearchEnter = this.onSearchEnter.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  // Gets value of search bar input.
  getSearchValue() {
    return this.searchInput.value;
  }

  // Clears the search bar.
  clearSearchValue() {
    this.searchInput.value = '';
  }

  // Function to trigger search functionality on 'enter' press.
  onSearchEnter(callback) {
    this.searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const searchValue = this.getSearchValue();
        callback(searchValue);
        this.clearSearchValue();
      }
    });
  }

  // Function to trigger search functionality on search icon click.
  onSearchClick(callback) {
    this.searchIcon.addEventListener('click', (event) => {
      const searchValue = this.getSearchValue();
      callback(searchValue);
      this.clearSearchValue();
    });
  }
}

export default Searcher;
