const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(express.static(path.join(__dirname, "..", "public")));

const buildOpenWeatherUrl = (endpoint, city) => {
  const query = new URLSearchParams({
    q: city,
    units: "imperial",
    appid: OPENWEATHER_API_KEY,
  });
  return `https://api.openweathermap.org/data/2.5/${endpoint}?${query.toString()}`;
};

const fetchOpenWeather = async (endpoint, city) => {
  if (!OPENWEATHER_API_KEY) {
    throw new Error("Missing OPENWEATHER_API_KEY environment variable.");
  }

  const response = await fetch(buildOpenWeatherUrl(endpoint, city));
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "OpenWeather request failed.");
  }

  return data;
};

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ message: "City is required." });
  }

  try {
    const data = await fetchOpenWeather("weather", city);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/api/forecast", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ message: "City is required." });
  }

  try {
    const data = await fetchOpenWeather("forecast", city);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`WeatherHive server listening on port http://localhost:${PORT}`);
});
