import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  temperature: number;
  description: string;
  icon: string;

  constructor(city: string, temperature: number, description: string, icon: string) {
    this.city = city;
    this.temperature = temperature;
    this.description = description;
    this.icon = icon;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;

  constructor() {
    this.baseURL = `${process.env.API_BASE_URL}`;
    this.apiKey = `${process.env.API_KEY}`;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(`${this.baseURL}/data/2.5/${query}&appid=${this.apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    try {
      return {
        lat: locationData.lat,
        lon: locationData.lon
      };
    } catch (error) {
      console.error('Error destructuring location data:', error);
      return { lat: 0, lon: 0 };
    }
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `geo/1.0/direct?q=${city}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `weather?lat=${coordinates.lat}&lon=${coordinates.lon}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string) {
    const locationData = await this.fetchLocationData(`${this.buildGeocodeQuery(city)}`);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(`${this.baseURL}/data/2.5/${this.buildWeatherQuery(coordinates)}&appid=${this.apiKey}`);
      const data = await response.json();
      return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    return new Weather(
      response.name,
      response.main.temp,
      response.weather[0].description,
      response.weather[0].icon
    );
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return weatherData.map((data: any) => {
      return new Weather(
        currentWeather.city,
        data.temp.day,
        data.weather[0].description,
        data.weather[0].icon
      );
    });
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
      const coordinates = await this.fetchAndDestructureLocationData(city);
      const currentWeather = this.parseCurrentWeather(await this.fetchWeatherData(coordinates));
      const forecastData = await this.fetchWeatherData(coordinates);
      const forecast = this.buildForecastArray(currentWeather, forecastData.daily);
      return { currentWeather, forecast };
    } catch (error) {
      console.error('Error getting weather for city:', error);
      return { currentWeather: new Weather('', 0, '', ''), forecast
      : [] };
    }
  }

}

export default new WeatherService();
