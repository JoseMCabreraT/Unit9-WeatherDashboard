import dotenv from 'dotenv';
//import fs from 'node:fs/promises';
dotenv.config();

// TODO: Define an interface for the Coordinates object

interface Coordinates {
  id: string;
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object

class Weather {
  temperature: number;
  description: string;

  constructor(temperature: number, description: string) {
    this.temperature = temperature;
    this.description = description;
  }//constructor
}//class Weather

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties

  private baseURL?: string;
  private apiKey?: string;
  private cityName?: string;

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}

  private async fetchLocationData(query: string) {
    const response = await fetch(query);
    const data = await response.json();
    return data;
  }//fetchLocationData


  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { id, lat, lon } = locationData;
    return { id, lat, lon };
  }//destructureLocationData


  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}

  private buildGeocodeQuery(): string {
    return `${this.baseURL}geocode/v1/json?q=${this.cityName}&key=${this.apiKey}`;
  }//buildGeocodeQuery


  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}

  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }//buildWeatherQuery

  
  
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}

  /*private async fetchAndDestructureLocationData() {
    
    
    
  }//fetchAndDestructureLocationData*/


  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}

  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const data = await response.json();
    return data;
  }//fetchWeatherData*


  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}

  /*private parseCurrentWeather(response: any) {
   

  }//parseCurrentWeather*/

  
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}

  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    
    console.log(currentWeather);
    
    return weatherData.map(data => ({
      ...data,
      currentWeather
    }));
  }//buildForecastArray

  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}

  async getWeatherForCity(city: string) {
    this.cityName = city;
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    const coordinates = this.destructureLocationData(locationData);
    const weatherData = await this.fetchWeatherData(coordinates);
    
    const currentWeather = new Weather(weatherData.main.temp, weatherData.weather[0].description);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData);
    return forecastArray;
  }//getWeatherForCity

}//class WeatherService

export default new WeatherService();
