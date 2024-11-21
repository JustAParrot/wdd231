const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const figCaption = document.querySelector('figcaption');

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=e86d42243822250077af1fef34cffda0";


async function apiFetch() {
    try {
        const response = await fetch(url); 
        if (response.ok) {
            const data = await response.json(); 
            console.log(data); 
            displayResults(data); 
        } else {
            throw new Error(await response.text()); 
        }
    } catch (error) {
        console.error("Error fetching the API data:", error); 
    }
}

function displayResults(data) {
    currentTemp.textContent = `${data.main.temp}°K`; 
    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconSrc); 
    weatherIcon.setAttribute('alt', data.weather[0].description); 
    figCaption.textContent = data.weather[0].description; 
}

apiFetch();
