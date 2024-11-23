// JavaScript to populate current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = 'Last modified: ' + new Date(document.lastModified).toLocaleString();

// Menu Toggle Functionality
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show'); 
});


// OpenWeatherMap 
const API_KEY = 'e86d42243822250077af1fef34cffda0';
const LAT = -0.22435883669900852;
const LON = -78.51020567518616;
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;

async function fetchWeatherData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch weather data');

    const data = await response.json();
    const temp = Math.round(data.list[0].main.temp) + '°F';
    const description = data.list[0].weather[0].description;
    const high = Math.round(data.list[0].main.temp_max) + '°F';
    const low = Math.round(data.list[0].main.temp_min) + '°F';
    const humidity = data.list[0].main.humidity + '%';
    const iconCode = data.list[0].weather[0].icon;

    // Check if iconCode exists before setting the src
    const iconUrl = iconCode ? `http://openweathermap.org/img/wn/${iconCode}.png` : 'path/to/default-icon.png';
    document.getElementById('weather-icon').src = iconUrl;

    // Adjusted thing for timezone (Check for way to correct it)
    const timezoneOffset = data.city.timezone;
    const sunriseUTC = new Date((data.city.sunrise + timezoneOffset) * 1000);
    const sunsetUTC = new Date((data.city.sunset + timezoneOffset) * 1000);

    const sunrise = sunriseUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const sunset = sunsetUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const forecast = get3DayForecast(data.list);

    // Update current weather
    document.getElementById('temp').textContent = temp;
    document.getElementById('description').textContent = capitalizeFirstLetter(description);
    document.getElementById('high').textContent = high;
    document.getElementById('low').textContent = low;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
    displayForecast(forecast);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// 3 day weather forecast
function displayForecast(forecast) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = ''; 

  forecast.forEach((forecastData) => {
    const forecastElement = document.createElement('div');
    forecastElement.classList.add('forecast-day');
    forecastElement.innerHTML = `
      <h3>${forecastData.day}</h3>
      <img src="${forecastData.iconUrl}" alt="Weather Icon" style="width: 30px; height: 30px;">
      <p>${forecastData.temp}</p>
      <p>${capitalizeFirstLetter(forecastData.description)}</p>
    `;
    forecastContainer.appendChild(forecastElement);
  });
}

// Forecast per day
function get3DayForecast(forecastList) {
  const days = [];
  const seenDates = new Set(); 

  for (let entry of forecastList) {
    const date = new Date(entry.dt * 1000).toLocaleDateString();
    if (!seenDates.has(date)) {
      seenDates.add(date);
      const day = new Date(entry.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
      const temp = Math.round(entry.main.temp) + '°F';
      const description = entry.weather[0].description;
      const iconCode = entry.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
      
      days.push({ day, temp, description, iconUrl });
    }

    if (days.length === 3) break; 
  }

  return days;
}

// Fetch weather data on page load
document.addEventListener('DOMContentLoaded', fetchWeatherData);


// Business cards
async function fetchSpotlightBusinessCards() {
    try {
      const response = await fetch('data/members.json');
      if (!response.ok) throw new Error('Failed to fetch business data');
  
      const members = await response.json();
      const spotlightMembers = getRandomMembers(members, 3);
  
      displayBusinessCards(spotlightMembers);
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
  }
  
  // Randomly select members from the list
  function getRandomMembers(members, n) {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  function displayBusinessCards(members) {
    const cardsContainer = document.querySelector('.business-cards');
    cardsContainer.innerHTML = '';
  
    members.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="card-image">
          <img src="${member.image_icon}" alt="${member.name} Logo" style="width: 100px; height: 100px; object-fit: cover;">
        </div>
        <div class="card-info">
          <h3>${member.name}</h3>
          <p><strong>Representative:</strong> ${member.representative}</p>
          <p><strong>Phone:</strong> ${member.phone_number}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Website:</strong> <a href="${member.website_url}" target="_blank">${member.website_url}</a></p>
          <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membership_level)}</p>
        </div>
      `;
      cardsContainer.appendChild(card);
    });
  }

  function getMembershipLevel(level) {
    switch(level) {
      case 1: return 'Bronze';
      case 2: return 'Silver';
      case 3: return 'Gold';
      default: return 'Unknown';
    }
  }
  
  // Fetch business data when the page is loaded
  document.addEventListener('DOMContentLoaded', () => {
    fetchSpotlightBusinessCards();
  });