const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const locationEl = document.querySelector("#location");
const temperatureEl = document.querySelector("#temperature");
const feelsLikeEl = document.querySelector("#feels-like");
const tempMin = document.querySelector("#temp-min");
const tempMax = document.querySelector("#temp-max");
const humidityEl = document.querySelector("#humidity");
const descriptionEl = document.querySelector("#description");
const API_KEY = process.env.API_KEY;

searchBtn.addEventListener("click", function() {
  const city = searchInput.value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      locationEl.textContent = data.name;
      temperatureEl.textContent = `Temperature: ${data.main.temp}ºF`;
      feelsLikeEl.textContent = `Feels like: ${data.main.feels_like}ºF`;
      tempMin.textContent = `Min temperature: ${data.main.temp_min}°F`;
      tempMax.textContent = `Max temperature: ${data.main.temp_max}ºF`;
      humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
      descriptionEl.textContent = `Description: ${data.weather[0].description}`;
    });
});