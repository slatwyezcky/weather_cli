#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './service/api.service.js';
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from './service/log.service.js';
import { saveKeyValue, KEYS, getKeyValue } from './service/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('No token provided');
    return;
  }
  try {
    await saveKeyValue(KEYS.token, token);
    printSuccess('Token saved');
  } catch (error) {
    printError(error.message);
  }
};

const icons = {
  '01': '🌞',
  '02': '⛅',
  '03': '☁',
  '04': '☁',
  '09': '🌧',
  10: '🌦',
  11: '🌩',
  13: '❄',
  50: '🌫',
};

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(KEYS.city));
    if (!city)
      throw new Error(
        'City is not defined, please add it with command -s [city]'
      );
    const weather = await getWeather(city);
    printWeather(weather, icons[weather.weather[0].icon.slice(0, -1)]);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('City is not found');
    } else if (e?.response?.status === 401) {
      printError('Token is not valid');
    } else {
      printError(e.message);
    }
  }
};

const setCity = async (city) => {
  try {
    const weather = await getWeather(city);
    await saveKeyValue(KEYS.city, weather.name);
    printSuccess('City is set to: ' + weather.name);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('City is not found');
    } else if (e?.response?.status === 401) {
      printError('Token is not valid');
    } else {
      printError(e.message);
    }
  }
};

function initCLI() {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return setCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return getForecast();
}

initCLI();
