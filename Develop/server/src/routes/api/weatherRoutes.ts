import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    // console.log('api hit');
    console.log(req.body);
    // GET weather data from city name
    const weatherData = await weatherService.getWeatherForCity(req.body.cityName);
    // console.log(weatherData);
    // Save city to search history
    await historyService.addCity(req.body.cityName);
    
    // Respond with weather data
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const cities = await historyService.getCities();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    await historyService.removeCity(req.params.id);
    res.status(200).json({ message: 'City removed from search history' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove city from search history' });
  }
});

export default router;
