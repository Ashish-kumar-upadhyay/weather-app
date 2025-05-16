export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  weatherCondition: string;
  weatherDescription: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  icon?: string;
}