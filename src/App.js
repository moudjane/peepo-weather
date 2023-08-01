import "./App.css";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import config from './config';

function App() {
	const [city, setCity] = useState("");
	const [weather, setWeather] = useState(null);
	const [backgroundImage, setBackgroundImage] = useState(
		"https://media.tenor.com/ZmZ7UKIc0soAAAAM/anonymous-anonymous-bites-back.gif"
	);
	const [error, setError] = useState(null);
	const [pageTitle, setPageTitle] = useState("");
	const [previousCity, setPreviousCity] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);
	const [favorites, setFavorites] = useState(() => {
		const storedFavorites = localStorage.getItem("favorites");
		return storedFavorites ? JSON.parse(storedFavorites) : [];
	});
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

	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	useEffect(() => {
		const storedFavorites = localStorage.getItem("favorites");
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites));
		}
	}, []);

	const handleAddToFavorites = () => {
		if (weather && weather.name && !favorites.includes(weather.name)) {
			setFavorites([...favorites, weather.name]);
		}
	};

	const handleRemoveFromFavorites = (cityToRemove, handleFavoriteCityClick) => {
		const updatedFavorites = favorites.filter((city) => city !== cityToRemove);
		setFavorites(updatedFavorites);
	};

	const handleSidebarToggle = () => {
		setShowSidebar(!showSidebar);
	};

	const handleFavoriteCityClick = (cityName) => {
		setCity(cityName);
		setShowSidebar(false);
		fetchWeather(cityName);
	};

	// const handleKeyDown = (event) => {
	// 	if (event.key === 'Enter') {
	// 		if (city.trim() !== '') {
	// 			fetchWeather();
	// 		}
	// 	}
	// };

	// const handleClick = () => {
	// 	if (city.trim() !== '') {
	// 		fetchWeather();
	// 	}
	// };

	const fetchWeather = (cityName) => {
		if (cityName === previousCity) {
			return;
		}

		const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${config.apiKey}&units=metric`;
		const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${config.apiKey}&units=metric`;

		Promise.all([
			fetchWeatherData(weatherUrl),
			fetchWeatherData(forecastUrl),
		])
			.then(([currentWeatherData, forecastData]) => {
				const dailyForecasts = forecastData.list.filter(
					(item, index) => index % 8 === 0
				);

				const formattedForecasts = dailyForecasts.map((forecast) => {
					const date = new Date(forecast.dt_txt);
					const options = {
						weekday: "long",
						day: "numeric",
						month: "numeric",
					};
					forecast.dt_txt = date.toLocaleDateString("en-EN", options);
					return forecast;
				});

				setWeather({
					...currentWeatherData,
					dailyForecasts: formattedForecasts,
					hourlyForecasts: forecastData.list,
				});
				setBackgroundImage(getBackgroundImage(currentWeatherData.weather[0].main));
				setPageTitle(`${currentWeatherData.name} ${currentWeatherData.main.temp}°C`);
			})
			.catch((error) => {
				setError(`City "${cityName}" not found`);
				setBackgroundImage(
					"https://media.tenor.com/ffN-es3aN5cAAAAC/peepokc-kcpeepo.gif"
				);
				setWeather(null);
			});

		setPreviousCity(cityName);
	};

	const getBackgroundImage = (weather) => {
		switch (weather) {
			case "Clouds":
				return "https://p4.wallpaperbetter.com/wallpaper/981/359/800/blue-clouds-cloudy-hd-wallpaper-preview.jpg";
			case "Clear":
				return "https://pbs.twimg.com/media/FvXGPzoWcA84iNL.jpg";
			case "Drizzle":
				return "https://media.tenor.com/1f0XJ3jKROkAAAAM/pepe-apu-rain-raincoat-for-profile-picture.gif";
			case "Snow":
				return "https://media.tenor.com/mCJAwcc1ZbMAAAAC/pepe-christmas.gif";
			case "ThunderStorm":
			case "Mist":
			case "Haze":
			case "Rain":
			case "Fog":
				return "https://risibank.fr/cache/medias/0/5/578/57856/full.gif";
			default:
				return "https://media.tenor.com/ZmZ7UKIc0soAAAAM/anonymous-anonymous-bites-back.gif";
		}
	};

	useEffect(() => {
		document.title = pageTitle;
	}, [pageTitle]);

	useEffect(() => {
		setPageTitle("PEPE WEATHER");
	}, []);

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			if (city.trim() !== "") {
				fetchWeather(city);
			}
		}
	};

	return (
		<div className="App">
			<header>
				<h1>PEEPO WEATHEEER</h1>
				<button
					className={`burger-menu ${showSidebar ? "open" : ""}`}
					onClick={handleSidebarToggle}
				>
					<img src={require("./menuburger.png")} alt="peepomenuburger" />{" "}
				</button>
			</header>

			<div className={`sidebar ${showSidebar ? "show" : ""}`}>
				<h2>Favorites</h2>
				<ul>
					{favorites.map((city) => (
						<li key={city}>
							<span>{city}</span>
							<button onClick={() => handleRemoveFromFavorites(city)}>
								Remove
							</button>
						</li>
					))}
				</ul>
			</div>

			<div>{/*<button onClick={fetchWeather}>Get Weather</button>*/}</div>

			<div
				className="bg"
				style={{ backgroundImage: `url(${backgroundImage})` }}
			/>
			<div>
				<br />
				<input
					type="text"
					placeholder="Type a city"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				{/*<button onClick={handleClick}>Get Weather</button>*/}

			</div>
			{weather && !favorites.includes(weather.name) && (
				<button onClick={handleAddToFavorites}>Add to Favorites</button>
			)}
			{error && (
				<div className="error">
					<span>{error}</span>
				</div>
			)}
			{isLoading && (
				<div className="loading">
					<span>Loading...</span>
				</div>
			)}

			{weather && weather.main && (
				<div className="weather-main">
					<div className="weather-main2">
						<img
							className="weather-icon"
							src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
							alt={weather.weather[0].description}
						/>
						<div className="weather-info">
              <span className="city">
                {weather.name} ({weather.sys.country})
              </span>
							<span className="temp">{weather.main.temp}°C</span>
							<span className="max_min">
                {weather.main.temp_min}°C / {weather.main.temp_max}°C
              </span>
						</div>
					</div>
				</div>
			)}

			{/*{weather && weather.hourlyForecasts && (*/}
			{/*	<div className="hourly-forecast">*/}
			{/*		<h2>Hourly Forecast</h2>*/}
			{/*		<div className="hourly-forecast-list">*/}
			{/*			{weather.hourlyForecasts.slice(1).map((hourlyForecast, index) => (*/}
			{/*				<div key={index} className="hourly-forecast-item">*/}
			{/*					<span>{hourlyForecast.dt_txt.split(" ")[1]}</span>*/}
			{/*					<img*/}
			{/*						src={`https://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}.png`}*/}
			{/*						alt={hourlyForecast.weather[0].description}*/}
			{/*					/>*/}
			{/*					<span>{hourlyForecast.main.temp}°C</span>*/}
			{/*				</div>*/}
			{/*			))}*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*)}*/}

			{weather && weather.dailyForecasts && (
				<div className="weather-banner">
					<div className="weekly-forecast">
						{weather.dailyForecasts.slice(1).map((forecast, index) => (
							<div key={index} className="weather-forecast">
								<span>{forecast.dt_txt}</span>
								<span>{forecast.main.temp_max}°C</span>
								<img
									src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
									alt={forecast.weather[0].description}
								/>
								<span>{forecast.weather[0].main}</span>
							</div>
						))}
					</div>
				</div>
			)}
			<Sidebar
				favorites={favorites}
				showSidebar={showSidebar}
				handleSidebarToggle={handleSidebarToggle}
				handleRemoveFavorite={handleRemoveFromFavorites}
				handleFavoriteCityClick={handleFavoriteCityClick}
			/>
		</div>
	);
}

export default App;