exports.handler = async (event) => {
  const city = event.queryStringParameters?.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "City is required." })
    };
  }

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Missing OPENWEATHER_API_KEY environment variable." })
    };
  }

  const query = new URLSearchParams({
    q: city,
    units: "imperial",
    appid: apiKey
  });

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?${query.toString()}`);
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message || "OpenWeather request failed." })
    };
  }
};
