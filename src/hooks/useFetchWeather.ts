import { useState, useEffect } from 'react';
import { WeatherData } from '../types/weather';

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Replace with your API key
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

export const useFetchWeather = (city: string, coords?: Coordinates | null) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city && !coords) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        let url = '';
        
        if (city) {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        } else if (coords) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;
        }
        
        // Simulate API delay for demo purposes
        // Replace with actual API call in production
        const mockResponse = await mockWeatherAPI(city, coords);
        
        // For actual API implementation, uncomment below and remove the mock
        // const response = await fetch(url);
        // if (!response.ok) {
        //   throw new Error('City not found or network error');
        // }
        // const result = await response.json();
        
        setData({
          city: mockResponse.name,
          temperature: mockResponse.main.temp,
          feelsLike: mockResponse.main.feels_like,
          weatherCondition: mockResponse.weather[0].main,
          weatherDescription: mockResponse.weather[0].description,
          humidity: mockResponse.main.humidity,
          windSpeed: mockResponse.wind.speed,
          pressure: mockResponse.main.pressure,
          icon: mockResponse.weather[0].icon,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city, coords]);

  return { data, isLoading, error };
};

// Mock function for demo purposes - replace with actual API call in production
const mockWeatherAPI = async (city?: string, coords?: Coordinates | null): Promise<any> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // If no city is provided and no coordinates, return error
  if (!city && !coords) {
    throw new Error('Please provide a city name or coordinates');
  }
  
  // Default response for any city/location
  const defaultResponse = {
    name: city || 'Current Location',
    main: {
      temp: 22.5,
      feels_like: 23.1,
      humidity: 65,
      pressure: 1012
    },
    weather: [{
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: {
      speed: 4.2
    }
  };
  
  // Simulate different weather for different cities
  const cityWeather: Record<string, any> = {
    'london': {
      name: 'London',
      main: {
        temp: 15.2,
        feels_like: 14.5,
        humidity: 78,
        pressure: 1009
      },
      weather: [{
        main: 'Rain',
        description: 'light rain',
        icon: '10d'
      }],
      wind: {
        speed: 6.7
      }
    },
    'tokyo': {
      name: 'Tokyo',
      main: {
        temp: 28.9,
        feels_like: 30.2,
        humidity: 70,
        pressure: 1015
      },
      weather: [{
        main: 'Clouds',
        description: 'scattered clouds',
        icon: '03d'
      }],
      wind: {
        speed: 3.5
      }
    },
    'new york': {
      name: 'New York',
      main: {
        temp: 18.6,
        feels_like: 17.9,
        humidity: 62,
        pressure: 1021
      },
      weather: [{
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }],
      wind: {
        speed: 5.2
      }
    },
    'sydney': {
      name: 'Sydney',
      main: {
        temp: 26.4,
        feels_like: 27.1,
        humidity: 55,
        pressure: 1018
      },
      weather: [{
        main: 'Sunny',
        description: 'sunny',
        icon: '01d'
      }],
      wind: {
        speed: 7.8
      }
    }
  };
  
  if (city && city.toLowerCase() in cityWeather) {
    return cityWeather[city.toLowerCase()];
  }
  
  // For coordinates or unknown cities, return a random weather pattern
  const weatherTypes = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm', 'Drizzle', 'Mist'];
  const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
  const randomTemp = Math.floor(Math.random() * 35);
  
  return {
    name: city || 'Current Location',
    main: {
      temp: randomTemp,
      feels_like: randomTemp + (Math.random() * 2 - 1),
      humidity: Math.floor(Math.random() * 100),
      pressure: 1000 + Math.floor(Math.random() * 30)
    },
    weather: [{
      main: randomWeather,
      description: `${randomWeather.toLowerCase()}`,
      icon: randomWeather === 'Clear' ? '01d' : 
            randomWeather === 'Clouds' ? '03d' : 
            randomWeather === 'Rain' ? '10d' : 
            randomWeather === 'Snow' ? '13d' : 
            randomWeather === 'Thunderstorm' ? '11d' : 
            randomWeather === 'Drizzle' ? '09d' : '50d'
    }],
    wind: {
      speed: Math.floor(Math.random() * 10) + 1
    }
  };
};