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
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Set your OpenWeather API key:
   ```env
   OPENWEATHER_API_KEY=your_real_key
   ```

The API key is read on the server (`src/main.js`) and never hardcoded in
`public/app.js`.

## Netlify environment variable setup
If you deploy with Netlify, set `OPENWEATHER_API_KEY` in:
- **Site configuration → Environment variables → Add a variable**
- Key: `OPENWEATHER_API_KEY`
- Value: your OpenWeather API key

Redeploy after saving so the server/runtime gets the updated value.

## Notes
- The front end calls local `/api/*` routes, and the Express server proxies
  requests to OpenWeather using your environment variable.
- No automated tests are configured yet.
