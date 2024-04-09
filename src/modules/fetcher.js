class Fetcher {
  // Returns the parsed weather data object from the API
  async fetchAPI(searchValue) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=573237ec7c1e4149932133700241903&q=${searchValue}`,
        { mode: 'cors' }
      );
      const weatherData = await response.json();

      return weatherData;
    } catch (error) {
      console.error(`Error fetching weather data: ${error}`);
    }
  }
}

export default Fetcher;
