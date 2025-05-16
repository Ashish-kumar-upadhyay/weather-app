import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import WeatherInfo from './WeatherInfo';
import Loading from './Loading';
import Error from './Error';
import { useFetchWeather } from '../hooks/useFetchWeather';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { Sun, CloudRain } from 'lucide-react';

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  
  const { coords, locationError, isLoadingLocation } = useCurrentLocation();
  const { data, isLoading, error } = useFetchWeather(city, coords);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleSearch = (searchCity: string) => {
    if (!searchCity.trim()) return;
    
    setCity(searchCity);
    setIsUsingCurrentLocation(false);
    
    if (!recentSearches.includes(searchCity)) {
      setRecentSearches(prev => [searchCity, ...prev.slice(0, 4)]);
    } else {
      setRecentSearches(prev => [
        searchCity,
        ...prev.filter(item => item !== searchCity)
      ].slice(0, 5));
    }
  };

  const handleUseCurrentLocation = () => {
    setIsUsingCurrentLocation(true);
    setCity('');
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Sun className="mr-2 text-yellow-300" size={24} />
          Weather App
          <CloudRain className="ml-2 text-white opacity-70" size={20} />
        </h1>
      </div>
      
      <div className="p-5">
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          onUseCurrentLocation={handleUseCurrentLocation}
          recentSearches={recentSearches}
          isLoadingLocation={isLoadingLocation}
        />
        
        {isLoading && <Loading />}
        
        {error && <Error message={error} />}
        
        {locationError && isUsingCurrentLocation && (
          <Error message={`Location error: ${locationError}`} />
        )}
        
        {data && !isLoading && !error && (
          <WeatherInfo 
            data={data}
            isUsingCurrentLocation={isUsingCurrentLocation} 
          />
        )}
      </div>
    </div>
  );
};

export default WeatherApp;