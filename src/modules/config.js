// Define the forecast weather url
const config = {
  weatherURL: {
    weatherForecastURL: 'https://api.weatherapi.com/v1/forecast.json',
    // Define the api key.
    apiKey: '573237ec7c1e4149932133700241903',
    //Define number of forecast days
    days: '3',
  },
  regex: {
    // Define search regex
    searchRegex: /^[a-zA-Z\s,'-]+$/,
  },
};

export default config;
