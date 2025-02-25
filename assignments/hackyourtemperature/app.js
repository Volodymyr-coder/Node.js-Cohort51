import express from 'express';
import keys from './sources/keys.js';
import fetch from 'node-fetch';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', async (req, res) => {
  const { cityName } = req.body;

  try {
    if (!cityName)
      return res.status(400).json({ message: 'City name is required' });

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );
    const data = await response.json();
    const fetchTemp = data.main?.temp;
    console.log(data);

    if (!response.ok) {
      return res.status(404).json({ weatherText: 'City is not found!' });
    }

    return res
      .status(200)
      .json({ weatherText: `In ${cityName} now ${fetchTemp} °C` });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ error: 'Something went wrong!' });
  }

  res.json({ message: `Now weather in your city ${cityName}` });
});

export default app;
