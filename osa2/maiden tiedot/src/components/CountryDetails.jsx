import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({country, apiKey}) => {
    const [weather, setWeather] = useState(null)

    console.log({apiKey})

    const flagStyle = {
        fontSize: 180
    }

    useEffect(() => {
        console.log('effect run, weather is now', weather)
    
        if (!weather) {
          console.log('fetching weather data..')
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`
          axios
            .get(apiUrl)
            .then(response => {
              setWeather(response.data)
            })
        }
      }, [weather])

    return (<>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital} </p>
        <p>Area {country.area}</p>
        <h4>languages:</h4>
        <ul>
            {Object.values(country.languages).map((lang) => (
                <li key={lang}>{lang}</li>
            ))}
        </ul>
        <div style={flagStyle}>{country.flag}</div>
        <h3>Weather in {weather ? country.capital : "Loading..."}</h3>
        <p>temperature {weather ? (weather.main.temp - 273.15).toFixed(2) : "Loading..."} Celcius</p>
        <img src={weather ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : ""} alt="Weather icon" />
        <p>wind {weather  ? weather.wind.speed.toFixed(2) : "Loading..."} m/s</p>
    </>)
}

export default CountryDetails