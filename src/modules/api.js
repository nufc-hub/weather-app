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

  // Fetches the provided URl
  // Return value of buidlUrl can be used as argument.
  fetchData(fullApiURL) {
    return fetch(fullApiURL, { mode: 'cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        // Parse the response.
        return response.json();
      })
      .catch((error) => {
        console.error(`Error fetching weather data: ${error}`);
      });
  }
}

export default API;
