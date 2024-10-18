import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

interface LocationData {
  name: string;
  local_names: {};
  lat: number;
  lon: number;
  country: string;
  state: string;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;


  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  city?: string;

  constructor() {
    this.city = '';
    this.baseURL = `${process.env.API_BASE_URL}`;
    this.apiKey = `${process.env.API_KEY}`;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(`${this.baseURL}/geo/1.0/direct?${query}&limit=1&appid=${this.apiKey}`);
      const data = await response.json();
      return data[0]; // Assuming the first result is the most relevant
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: LocationData): Coordinates {
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
    return `q=${city}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    // console.log('coordinates:', coordinates);
    return `lat=${coordinates.lat}&lon=${coordinates.lon}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string) {
    const locationData = await this.fetchLocationData(`${this.buildGeocodeQuery(city)}`);
    // console.log(locationData);

    const coordinates = this.destructureLocationData(locationData);
    // console.log(coordinates);
    return coordinates;
  }
  //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(`${this.baseURL}/data/2.5/weather?${this.buildWeatherQuery(coordinates)}&appid=${this.apiKey}`);
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    return new Weather(
      response.name,
      response.dt,
      response.weather[0].icon,
      response.weather[0].description,
      response.main.temp,
      response.wind.speed,
      response.main.humidity
    );
  }

  // TODO: Complete buildForecastArray method
  private async buildForecastArray(coordinates: Coordinates) {
    try {
      const response = await fetch(`${this.baseURL}/data/2.5/forecast?${this.buildWeatherQuery(coordinates)}&appid=${this.apiKey}&units=imperial`);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return [];
    }
    // weatherData.push(currentWeather);
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(cityName: string) {
    try {
      // console.log('city:', cityName);  
      const coordinates = await this.fetchAndDestructureLocationData(cityName);
      // console.log(coordinates);
      const forecastData = await this.fetchWeatherData(coordinates);
      // console.log(forecastData);
      const currentWeather = this.parseCurrentWeather(forecastData);
      console.log(forecastData);
      console.log(currentWeather);
      const data = await this.buildForecastArray(coordinates);
      let forecastList = []
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.split(" ")[1] === "00:00:00") {
          let forecast = new Weather(
            data.city.name,
            data.list[i].dt_txt,
            data.list[i].weather[0].icon,
            data.list[i].weather[0].description,
            data.list[i].main.temp,
            data.list[i].wind.speed,
            data.list[i].main.humidity
          );
          forecastList.push(forecast);
        }
      }
      console.log("FORECAST LIST", forecastList)

      return { currentWeather, forecast: forecastList };
    } catch (error) {
      console.error('Error getting weather for city:', error);
      return { currentWeather: {}, forecast: [] };
    }
  }

}

export default new WeatherService();
