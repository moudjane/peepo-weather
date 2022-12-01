import './App.css';
import { useState } from "react";

function App() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('https://media.tenor.com/ZmZ7UKIc0soAAAAM/anonymous-anonymous-bites-back.gif')
  //https://media.tenor.com/ffN-es3aN5cAAAAC/peepokc-kcpeepo.gif

  function weatherz() {
    fetch('  https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=93f353be3ea3bf5d4140db74968c1fa8&units=metric')
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        setWeather(data)
        if (data.weather[0].main === "Clouds") {
          setBackgroundImage('https://p4.wallpaperbetter.com/wallpaper/981/359/800/blue-clouds-cloudy-hd-wallpaper-preview.jpg')
        }
        else if (data.weather[0].main === "Rain") {
          setBackgroundImage('https://risibank.fr/cache/medias/0/5/578/57856/full.gif')
        }
        else if (data.weather[0].main === "Clear") {
          setBackgroundImage('https://wompampsupport.azureedge.net/fetchimage?siteId=7575&v=2&jpgQuality=100&width=700&url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FPB_AoajxbAw%2Fhqdefault.jpg')
        }
        else if (data.weather[0].main === "Drizzle") {
          setBackgroundImage('https://media.tenor.com/1f0XJ3jKROkAAAAM/pepe-apu-rain-raincoat-for-profile-picture.gif')
        }
        else if (data.weather[0].main === "Snow") {
          setBackgroundImage('https://media.tenor.com/mCJAwcc1ZbMAAAAC/pepe-christmas.gif')
        }
        else if (data.weather[0].main === "ThunderStorm") {
          setBackgroundImage('https://media.tenor.com/1f0XJ3jKROkAAAAM/pepe-apu-rain-raincoat-for-profile-picture.gif')
        }
        else if (data.weather[0].main === "Mist") {
          setBackgroundImage('https://media.tenor.com/1f0XJ3jKROkAAAAM/pepe-apu-rain-raincoat-for-profile-picture.gif')
        }
        else if (data.weather[0].main === "Haze") {
          setBackgroundImage('https://media.tenor.com/1f0XJ3jKROkAAAAM/pepe-apu-rain-raincoat-for-profile-picture.gif')
        }
        else if (data.weather[0].main === "Fog") {
          setBackgroundImage('https://media.tenor.com/1f0XJ3jKROkAAAAM/pepe-apu-rain-raincoat-for-profile-picture.gif')
        }
        else if (data.weather[0].main === "") {
          setBackgroundImage('https://media.tenor.com/ffN-es3aN5cAAAAC/peepokc-kcpeepo.gif')
        }
        console.log(data.weather[0].main)
        console.log(data)
      })
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      weatherz(city);
    }
  };
  return (

    <div className='App'>
      <h1>WEATHEEEEEEEEER</h1>
      <div className="bg" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div>
        <input type="text" placeholder="Type a city" value={city} onChange={e => setCity(e.target.value)} onKeyDown={handleKeyDown}></input>
        <button onClick={weatherz}>LETSSSGO</button>
      </div>
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
          <img src={'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '@4x.png'} />
        </div>
        : null}
      {weather.main ?
        <div className='weather-global'>
          <div className='bloc1'>Humidity:
            <div className='weather-stat'>{weather.main.humidity} %</div>
          </div>
          <div className='bloc2'>Wind wpeed:
            <div className='weather-stat'>{weather.wind.speed} m/s</div>
          </div>
          <div className='bloc3'>Wind wpeed:
            <div className='weather-stat'>{weather.wind.speed} m/s</div>
          </div>
        </div>
        : null}
    </div >
  )
}
export default App;
