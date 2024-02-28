import axios from 'axios';
import { KEYS, getKeyValue } from './storage.service.js';

const getWeather = async (city) => {
  const token = process.env.TOKEN ?? (await getKeyValue(KEYS.token));
  if (!token) {
    throw new Error('No API key, please add it with command -t [API_KEY]');
  }
  const coordinates = await axios.get(
    'http://api.openweathermap.org/geo/1.0/direct',
    {
      params: {
        q: city,
        appid: token,
      },
    }
  );
  const { lat, lon } = coordinates.data[0];
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        lat: lat,
        lon: lon,
        appid: token,
        units: 'metric',
      },
    }
  );
  return data;
};

export { getWeather };
