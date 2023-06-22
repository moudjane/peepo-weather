import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('https://media.tenor.com/ZmZ7UKIc0soAAAAM/anonymous-anonymous-bites-back.gif');
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState('');

  function weathers() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=93f353be3ea3bf5d4140db74968c1fa8&units=metric')
        .then(function (response) {
          setError(null);
          return response.json();
        }).then(function (data) {
      if (data.cod === '404') {
        setError(`City "${city}" not found`);
        setCity('');
        setWeather('');
        setBackgroundImage('https://media.tenor.com/ffN-es3aN5cAAAAC/peepokc-kcpeepo.gif');
        setPageTitle('PEPE WEATHER');
        return;
      }
      function getBackgroundImage(weather) {
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
          case 'Fog':
            return 'https://risibank.fr/cache/medias/0/5/578/57856/full.gif';
          default:
            return 'https://risibank.fr/cache/medias/0/5/578/57856/full.gif';
        }
      }
      setWeather(data);
      setBackgroundImage(getBackgroundImage(data.weather[0].main));
      setPageTitle(`${data.name} ${data.main.temp}°C`);
    });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      weathers(city);
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
        <div className="bg" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        <div>
          <input type="text" placeholder="Type a city" value={city} onChange={e => setCity(e.target.value)} onKeyDown={handleKeyDown}></input>
          <button onClick={weathers}>LETSSSGO</button>
        </div>
        {error ?
            <div className='error'>
              <p>{error}</p>
            </div>
            : null}
        {weather.main ?
            <div className='weather-main'>
              <div className='weather-main2'>
                <p className='city'>{weather.name}</p>
                <p className='temp'>{weather.main.temp}°C</p>
              </div>
            </div>
            : null}
        {weather.main ?
            <div className='weather-icon'>
              <img src={'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@4x.png'} alt="Weather Icon" />
            </div>
            : null}
        {weather.main ?
            <div className='weather-global'>
              <div className='bloc1'>Humidity:
                <div className='weather-stat'>{weather.main.humidity} %</div>
              </div>
              <div className='bloc2'>Wind speed:
                <div className='weather-stat'>{weather.wind.speed} m/s</div>
              </div>
              <div className='bloc3'>Wind speed:
                <div className='weather-stat'>{weather.wind.speed} m/s</div>
              </div>
            </div>
            : null}
      </div >
  );
}

export default App;
