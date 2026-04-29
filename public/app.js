const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const locationEl = document.querySelector("#location");
const temperatureEl = document.querySelector("#temperature");
const feelsLikeEl = document.querySelector("#feels-like");
const humidityEl = document.querySelector("#humidity");
const descriptionEl = document.querySelector("#description");
const statusEl = document.querySelector("#status");
const iconEl = document.querySelector("#weather-icon");
const tempRangeEl = document.querySelector("#temp-range");
const windEl = document.querySelector("#wind");
const sunTimesEl = document.querySelector("#sun-times");
const updatedAtEl = document.querySelector("#updated-at");
const forecastGrid = document.querySelector("#forecast-grid");

const formatTemperature = (fahrenheit) => {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return `${Math.round(fahrenheit)}°F / ${Math.round(celsius)}°C`;
};

const formatTime = (unixSeconds) => {
  const date = new Date(unixSeconds * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const setStatus = (message) => {
  statusEl.textContent = message;
};

const applyTheme = (condition) => {
  const theme = condition ? condition.toLowerCase() : "clear";
  document.body.className = "";
  document.body.classList.add(`theme-${theme}`);
};

const renderForecast = (forecastList) => {
  forecastGrid.innerHTML = "";
  forecastList.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString(undefined, { weekday: "short" });

    const icon = document.createElement("img");
    icon.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    icon.alt = item.weather[0].description;

    const title = document.createElement("p");
    title.textContent = day;

    const temp = document.createElement("p");
    temp.classList.add("forecast-temp");
    temp.textContent = formatTemperature(item.main.temp);

    const desc = document.createElement("p");
    desc.classList.add("description");
    desc.textContent = item.weather[0].description;

    card.append(title, icon, temp, desc);
    forecastGrid.appendChild(card);
  });
};

const getForecast = async (city) => {
  const response = await fetch(
    `/api/forecast?city=${encodeURIComponent(city)}`
  );
  const data = await response.json();
  if (!response.ok || data.cod !== "200") {
    throw new Error(data.message || "Unable to load forecast.");
  }

  const middayForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );
  return middayForecast.slice(0, 5);
};

const getWeather = async (city) => {
  const response = await fetch(
    `/api/weather?city=${encodeURIComponent(city)}`
  );
  const data = await response.json();
  if (!response.ok || data.cod !== 200) {
    throw new Error(data.message || "Unable to load weather.");
  }
  return data;
};

const handleSearch = async () => {
  const city = searchInput.value.trim();
  if (!city) {
    setStatus("Please enter a city name.");
    return;
  }

  setStatus("Loading forecast...");

  try {
    const [weather, forecast] = await Promise.all([
      getWeather(city),
      getForecast(city)
    ]);

    locationEl.textContent = `${weather.name}, ${weather.sys.country}`;
    descriptionEl.textContent = weather.weather[0].description;
    temperatureEl.textContent = formatTemperature(weather.main.temp);
    feelsLikeEl.textContent = `Feels like ${formatTemperature(
      weather.main.feels_like
    )}`;
    tempRangeEl.textContent = `${formatTemperature(
      weather.main.temp_min
    )} / ${formatTemperature(weather.main.temp_max)}`;
    humidityEl.textContent = `${weather.main.humidity}%`;
    windEl.textContent = `${Math.round(weather.wind.speed)} mph`;
    sunTimesEl.textContent = `${formatTime(
      weather.sys.sunrise
    )} / ${formatTime(weather.sys.sunset)}`;
    updatedAtEl.textContent = `Updated at ${new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })}`;

    iconEl.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    iconEl.alt = weather.weather[0].description;

    applyTheme(weather.weather[0].main);
    renderForecast(forecast);
    setStatus("");
  } catch (error) {
    setStatus(error.message || "Something went wrong. Please try again.");
  }
};

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
