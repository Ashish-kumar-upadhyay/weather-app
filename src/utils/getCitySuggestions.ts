import { debounce } from './debounce';

// Mock city database for demonstration
const cities = [
  'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 
  'Barcelona', 'Rome', 'Cairo', 'Mumbai', 'Beijing', 'Dubai',
  'Los Angeles', 'Amsterdam', 'Moscow', 'Toronto', 'Seoul', 'Singapore',
  'Madrid', 'Chicago', 'Mexico City', 'Buenos Aires', 'Istanbul', 'Bangkok',
  'Vienna', 'Prague', 'Budapest', 'Copenhagen', 'Stockholm', 'Dublin',
  'Athens', 'Lisbon', 'Warsaw', 'Brussels', 'Helsinki', 'Oslo'
];

// For real implementation, you would use a city API like:
// - GeoDB Cities API
// - Google Places API
// - Mapbox Geocoding API

export const getCitySuggestions = debounce(async (query: string): Promise<string[]> => {
  if (!query || query.length < 2) return [];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filter cities based on query
  const normalizedQuery = query.toLowerCase();
  return cities.filter(city => 
    city.toLowerCase().includes(normalizedQuery)
  ).slice(0, 5); // Limit to 5 suggestions
}, 300);