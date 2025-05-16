import React from 'react';
import { MapPin, Droplets, Wind, Thermometer, Calendar } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';

interface WeatherInfoProps {
  data: WeatherData;
  isUsingCurrentLocation: boolean;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ data, isUsingCurrentLocation }) => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getBackgroundColor = () => {
    const temp = data.temperature;
    if (temp > 30) return 'bg-orange-50';
    if (temp > 20) return 'bg-yellow-50';
    if (temp > 10) return 'bg-blue-50';
    return 'bg-blue-100';
  };

  const WeatherIcon = getWeatherIcon(data.weatherCondition);

  return (
    <div className={`mt-4 rounded-xl p-5 ${getBackgroundColor()} transition-all duration-300`}>
      <div>
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-800">{data.city}</h2>
          {isUsingCurrentLocation && (
            <div className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
              <MapPin size={12} className="mr-1" />
              Current Location
            </div>
          )}
        </div>
        <p className="text-gray-600 flex items-center mt-1">
          <Calendar size={14} className="mr-1" />
          {formattedDate}
        </p>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-5xl font-bold text-gray-800">{Math.round(data.temperature)}°</div>
          <div className="ml-4">
            <div className="text-gray-600 capitalize">{data.weatherCondition}</div>
            <div className="text-gray-500 text-sm">Feels like {Math.round(data.feelsLike)}°</div>
          </div>
        </div>
        
        <div className="text-gray-700">
          <WeatherIcon size={64} className="weather-icon" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg text-center">
          <Droplets className="mx-auto text-blue-500 mb-1" size={20} />
          <div className="text-sm text-gray-500">Humidity</div>
          <div className="font-medium">{data.humidity}%</div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg text-center">
          <Wind className="mx-auto text-blue-500 mb-1" size={20} />
          <div className="text-sm text-gray-500">Wind</div>
          <div className="font-medium">{data.windSpeed} m/s</div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg text-center">
          <Thermometer className="mx-auto text-blue-500 mb-1" size={20} />
          <div className="text-sm text-gray-500">Pressure</div>
          <div className="font-medium">{data.pressure} hPa</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;