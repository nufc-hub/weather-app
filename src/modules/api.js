class API {
  constructor(url, apiKey) {
    // URL without api key and search value added.
    this.url = url;
    this.apiKey = apiKey;
  }
  // Creates the whole URL needed for the fetchData function.
  buildUrl(searchValue) {
    return `${this.url}?key=${this.apiKey}&q=${searchValue}`;
  }

  fetchData(fullURL) {
    return fetch(fullURL, { mode: 'cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        return response.json();
      })
      .catch((error) => {
        console.error(`Error fetching weather data: ${error}`);
      });
  }
}
