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
  // Return value of buildUrl can be used as argument.
  async fetchData(fullApiURL) {
    try {
      const response = await fetch(fullApiURL, { mode: 'cors' });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      // Parse the response.
      return response.json();
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
      throw error;
    }
  }
}

export default API;
