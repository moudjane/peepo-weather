import './App.css';
import { useState, useEffect } from 'react';

function App() {
	const [city, setCity] = useState('');
	const [weather, setWeather] = useState(null);
	const [backgroundImage, setBackgroundImage] = useState(
		'https://media.tenor.com/ZmZ7UKIc0soAAAAM/anonymous-anonymous-bites-back.gif'
	);
	const [error, setError] = useState(null);
	const [pageTitle, setPageTitle] = useState('');
	const [previousCity, setPreviousCity] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const fetchWeatherData = async (url) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(url);
			const data = await response.json();

			if (response.ok) {
				return data;
			} else {
				throw new Error(data.message);
			}
		} catch (error) {
			setError(error.message);
			setWeather(null);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			if (city.trim() !== '') {
				fetchWeather();
			}
		}
	};

	const handleClick = () => {
		if (city.trim() !== '') {
			fetchWeather();
		}
	};

	const fetchWeather = () => {
		if (city === previousCity) {
			return;
		}

		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93f353be3ea3bf5d4140db74968c1fa8&units=metric`;
		const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=93f353be3ea3bf5d4140db74968c1fa8&units=metric`;

		Promise.all([fetchWeatherData(weatherUrl), fetchWeatherData(forecastUrl)])
			.then(([weatherData, forecastData]) => {
				if (weatherData.cod === '404') {
					setError(`City "${city}" not found`);
					setCity('');
					setWeather(null);
					setBackgroundImage('https://media.tenor.com/ffN-es3aN5cAAAAC/peepokc-kcpeepo.gif');
					setPageTitle('PEPE WEATHER');
					return;
				}

				const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0);

				const formattedForecasts = dailyForecasts.map((forecast) => {
					const date = new Date(forecast.dt_txt);
					const options = { weekday: 'long', day: 'numeric', month: 'numeric' };
					forecast.dt_txt = date.toLocaleDateString('en-EN', options);
					return forecast;
				});

				setWeather({ ...weatherData, dailyForecasts: formattedForecasts });
				setBackgroundImage(getBackgroundImage(weatherData.weather[0].main));
				setPageTitle(`${weatherData.name} ${weatherData.main.temp}°C`);
			})
			.catch((error) => {
				setError(error.message);
				setWeather(null);
			});

		setPreviousCity(city);
	};

	const getBackgroundImage = (weather) => {
		switch (weather) {
			case 'Clouds':
				return 'https://p4.wallpaperbetter.com/wallpaper/981/359/800/blue-clouds-cloudy-hd-wallpaper-preview.jpg';
			case 'Clear':
				return 'https://pbs.twimg.com/media/FvXGPzoWcA84iNL.jpg';
			case 'Drizzle':
				return 'https://media.tenor.com/1f0XJ3jKROkAAAAM/pepe-apu-rain-raincoat-for-profile-picture.gif';
			case 'Snow':
				return 'https://media.tenor.com/mCJAwcc1ZbMAAAAC/pepe-christmas.gif';
			case 'ThunderStorm':
			case 'Mist':
			case 'Haze':
			case 'Rain':
			case 'Fog':
				return 'https://risibank.fr/cache/medias/0/5/578/57856/full.gif';
			default:
				return 'https://media.tenor.com/ZmZ7UKIc0soAAAAM/anonymous-anonymous-bites-back.gif';
		}
	};

	useEffect(() => {
		document.title = pageTitle;
	}, [pageTitle]);

	useEffect(() => {
		setPageTitle('PEPE WEATHER');
	}, []);

	return (
		<div className='App'>
			<h1>PEEPO WEATHEEER</h1>
			<div className='bg' style={{ backgroundImage: `url(${backgroundImage})` }} />
			<div>
				<input
					type='text'
					placeholder='Type a city'
					value={city}
					onChange={(e) => setCity(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				{/*<button onClick={handleClick}>Get Weather</button>*/}
			</div>
			{error && (
				<div className='error'>
					<p>{error}</p>
				</div>
			)}
			{isLoading && (
				<div className='loading'>
					<span>Loading...</span>
				</div>
			)}

			{weather && weather.main && (
				<div className='weather-main'>
					<div className='weather-main2'>
						<img
							className='weather-icon'
							src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
							alt={weather.weather[0].description}
						/>
						<div className='weather-info'>
              <span className='city'>
                {weather.name} ({weather.sys.country})
              </span>
							<span className='temp'>{weather.main.temp}°C</span>
							<span className='max_min'>
                {weather.main.temp_min}°C / {weather.main.temp_max}°C
              </span>
						</div>
					</div>
				</div>
			)}

			{weather && weather.dailyForecasts && (
				<div className='weather-banner'>
					<div className='weekly-forecast'>
						{weather.dailyForecasts.slice(1).map((forecast, index) => (
							<div key={index} className='weather-forecast'>
								<span>{forecast.dt_txt}</span>
								<span>{/*{forecast.main.temp_min}°C / {forecast.main.temp_max}°C*/}{forecast.main.temp_min}°C</span>
								<img
									src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
									alt={forecast.weather[0].description}
								/>
								<span>{forecast.weather[0].main}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
