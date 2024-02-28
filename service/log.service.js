import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
  console.log(chalk.bgRed('ERROR') + ' ' + error);
};

const printSuccess = (msg) => {
  console.log(dedent`${chalk.bgGreen('SUCCESS')} ${msg}
  `);
};

const printHelp = () => {
  console.log(dedent`
		${chalk.bgCyan('HELP')}
		No arguments - show weather
		-s [CITY] - set city
		-h - show help menu
		-t [API_KEY] - save token
	`);
};

const printWeather = (weather, icon) => {
  console.log(dedent`
		  ${chalk.bgYellow('WEATHER')} Weather in city ${weather.name} 
		  ${icon} ${weather.weather[0].description}
		  Temperature: ${weather.main.temp}℃ (feels like ${weather.main.feels_like}℃)
		  Humidity: ${weather.main.humidity}
		  Wind speed: ${weather.wind.speed}
	  `);
};

export { printError, printHelp, printSuccess, printWeather };
