import fs from 'node:fs/promises';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      const data = await fs.readFile('db/searchHistory.json', 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
   
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    await fs.writeFile('db/searchHistory.json', JSON.stringify(cities));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const cities = await this.read();
    return cities.map((city: any) => new City(city.name, city.id));
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    try {
      const cities = await this.getCities();
      const newCity = new City(city, (cities.length + 1).toString());
      await this.write([...cities, newCity]);
    } catch (error) {
      console.error('Error adding city:', error);
    }
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    try {
      const cities = await this.getCities();
      const newCities = cities.filter((city: City) => city.id !== id);
      await this.write(newCities);
    } catch (error) {
      console.error('Error removing city:', error);
    }
  }
}

export default new HistoryService();
