# WeatherHive

WeatherHive is a lightweight weather dashboard built with Express and vanilla
JavaScript. It serves a static front end that calls the OpenWeather API to show
current conditions and a 5-day forecast.

## Tech stack
- Node.js + Express (static asset server)
- HTML/CSS/JavaScript (vanilla front end)
- OpenWeather API for weather data

## Project structure
```
.
├── public
│   ├── app.js        # front-end logic and API calls
│   ├── index.html    # UI markup
│   ├── styles.css    # styling
│   └── media         # images
└── src
    └── main.js       # Express server
```

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open the app:
   - Visit `http://localhost:3000` in your browser.

## API key configuration
The OpenWeather API key is currently hardcoded in `public/app.js`. If your key
expires or you want to rotate it, replace the `API_KEY` value in that file.

## Notes
- The app runs entirely on the client; Express only serves static assets.
- No automated tests are configured yet.
