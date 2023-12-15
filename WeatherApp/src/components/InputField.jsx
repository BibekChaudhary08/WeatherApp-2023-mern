import React, { useState } from 'react';
import { BsFillSearchHeartFill } from "react-icons/bs";
import axios from 'axios';
import temperature from '/img/temperature.png';
import pressure from '/img/pressure.png';
import humidity from '/img/humidity.png';
import mist from '/img/mist.png';
import rain from '/img/rain.png';
import snow from '/img/snow.png';
import wind from '/img/wind.png';
import fog from '/img/fog.png';
import overcast_clouds from '/img/overcast_clouds.png';
import scattered_clouds from '/img/scattered_clouds.png';
import clear_sky from '/img/clear_sky.png';
import wind_speed from '/img/wind-speed.png';

const InputField = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = "cc0d542efc81171bc3c6bf602f37833b";

  const getWeather = async () => {
    try { 
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
     // console.log(response);
      setWeatherData(response.data);
      setError(null);
    } catch(error) {
      setWeatherData(null);
      setError('City Not Found');
    }
  };

  const getCurrentDayAndTime = () => {
    const currentDateTime = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    return currentDateTime.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <div className="input-group">
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)} 
          value={city} 
          className="form-control"
          placeholder="Enter City Name"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        <span className="input-group-text" onClick={getWeather} id="basic-addon1">
          <BsFillSearchHeartFill size='20' color='black' />
        </span>
      </div>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h3>{weatherData.name}, {weatherData.sys.country}</h3>
          <p>{getCurrentDayAndTime()}</p>
          <hr />
          <h2>Temperature: {weatherData.main.temp}°C <img src={temperature} alt="Temperature" /></h2>
          <h2>Weather: {weatherData.weather[0].description}
            <img src={(() => {
                switch (weatherData.weather[0].description) {
                  case 'drizzle':
                    return drizzle;
                  case 'humidity':
                    return humidity;
                  case 'mist':
                    return mist;
                  case 'moderate rain':
                  case 'heavy rain':  
                    return rain;
                  case 'heavy snow':
                  case 'moderate snow': 
                    return snow;
                  case 'wind':
                    return wind;
                  case 'fog':
                  case 'smoke':  
                  case 'haze':
                    return fog;  
                  case 'clear sky':
                    return clear_sky;  
                  case 'scattered clouds':
                  case 'broken clouds': 
                  case 'few clouds': 
                    return scattered_clouds;  
                  case 'overcast clouds':
                    return overcast_clouds;  
                  default:
                    return clear_sky;
                }
              })
              ()  
            }/>
          </h2>
          <h2>Wind Speed: {weatherData.wind.speed}m/s<img src={wind_speed}></img></h2>
          <h2>Humidity: {weatherData.main.humidity}% <img src={humidity}></img></h2>
          <h2>Pressure: {weatherData.main.pressure}hPa<img src={pressure}></img></h2>
        </div>
      )}
    </>
  );
};

export default InputField;
