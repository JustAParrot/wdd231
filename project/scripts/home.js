document.addEventListener("DOMContentLoaded", () => {
  const weatherMessage = document.getElementById("weather-message");
  const weatherDetails = document.getElementById("weather-details");

  // OpenWeatherMap API settings
  const API_KEY = "e86d42243822250077af1fef34cffda0";
  const CITY = "Quito,EC"; 
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`;

  // Weather data
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        const temperature = data.main.temp;
        const condition = data.weather[0].description;

        // Determine the message based on temperature
        let recommendation = "";
        if (temperature >= 30) {
          recommendation = "Too hot – it will hurt my paws.";
        } else if (temperature <= 5) {
          recommendation = "Too cold – it will freeze my paws.";
        } else {
          recommendation = "Perfect time!";
        }

        weatherMessage.textContent = recommendation;
        weatherDetails.textContent = `Current temperature: ${temperature}°C, Condition: ${condition}`;
      } else {
        weatherMessage.textContent =
          "Unable to fetch weather data. Please try again later.";
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherMessage.textContent =
        "Error fetching weather data. Please try again later.";
    });
});
