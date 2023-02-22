const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const locationEl = document.querySelector('#location');
const temperatureEl = document.querySelector('#temperature');
const descriptionEl = document.querySelector('#description');

searchBtn.addEventListener("click", () => {
    const city = searchInput.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=62e5a4bd5808c27f17aecbd8efb5ac75`)
    .then(response => response.json())
    .then(data => {
        locationEl.textContent = data.name;
        temperatureEl.textContent = `Temperatura: ${data.main.temp} °F`;
        descriptionEl.textContent = `Descripción: ${data.weather[0].description}`;
    });
});