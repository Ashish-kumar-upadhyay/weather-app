# Weather App

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information for any city or your current location.

## Features

- 🔍 Search for weather by city name with autocomplete suggestions
- 📍 Get weather for your current location
- 🕒 Recent searches history
- 🌡️ Detailed weather information including:
  - Temperature and "feels like" temperature
  - Weather conditions with icons
  - Humidity
  - Wind speed
  - Atmospheric pressure
- 🎨 Dynamic background colors based on temperature
- 📱 Fully responsive design

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── WeatherApp.tsx     # Main component
│   ├── SearchBar.tsx      # Search with autocomplete
│   ├── WeatherInfo.tsx    # Weather display
│   ├── Loading.tsx        # Loading state
│   └── Error.tsx         # Error handling
├── hooks/
│   ├── useFetchWeather.ts    # Weather data fetching
│   └── useCurrentLocation.ts # Geolocation
├── utils/
│   ├── getCitySuggestions.ts # City search autocomplete
│   ├── weatherIcons.tsx      # Weather condition icons
│   └── debounce.ts          # Search optimization
└── types/
    └── weather.ts           # TypeScript interfaces
```

## Features in Detail

### City Search
- Autocomplete suggestions as you type
- Recent searches history
- Debounced input to prevent excessive API calls

### Current Location
- Uses browser's Geolocation API
- Automatic weather fetch for current coordinates
- Error handling for location access denial

### Weather Display
- Clean, intuitive interface
- Dynamic weather icons based on conditions
- Temperature-based background colors
- Detailed meteorological data

## Building for Production

```bash
npm run build
```

This will create a `dist` folder with optimized production build.

## Preview Production Build

```bash
npm run preview
```

## Development

- Built with TypeScript for type safety
- ESLint configuration for code quality
- Tailwind CSS for styling
- Vite for fast development and building

## License

MIT
