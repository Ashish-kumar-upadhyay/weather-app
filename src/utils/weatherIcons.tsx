import React from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning, Cloudy } from 'lucide-react';

export const getWeatherIcon = (condition: string) => {
  const normalizedCondition = condition.toLowerCase();
  
  switch (normalizedCondition) {
    case 'clear':
    case 'sunny':
      return Sun;
    case 'partly cloudy':
    case 'few clouds':
      return CloudSun;
    case 'clouds':
    case 'cloudy':
    case 'scattered clouds':
    case 'broken clouds':
      return Cloud;
    case 'rain':
    case 'light rain':
    case 'moderate rain':
    case 'heavy rain':
    case 'shower rain':
      return CloudRain;
    case 'thunderstorm':
      return CloudLightning;
    case 'snow':
    case 'light snow':
    case 'heavy snow':
      return CloudSnow;
    case 'mist':
    case 'fog':
    case 'haze':
      return CloudFog;
    default:
      return Cloudy;
  }
};