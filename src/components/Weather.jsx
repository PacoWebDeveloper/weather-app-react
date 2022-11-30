import { useEffect, useState } from "react"

const Weather = ({weatherData}) => {
  const city = weatherData.name
  const country = weatherData.sys.country
  const [temperature, setTemperature] = useState(weatherData.main.temp)
  const [gradesName, setGradesName] = useState('K')
  const [mintem, setMintem] = useState(weatherData.main.temp_min)
  const [maxtem, setMaxtem] = useState(weatherData.main.temp_max)
  const main = weatherData.weather[0].main
  const description = weatherData.weather[0].description
  let icon = weatherData.weather[0].icon
  const windSpeed = weatherData.wind.speed
  const cloudsPercentage = weatherData.clouds.all
  const pressure = weatherData.main.pressure

  const [units, setUnits] = useState(true)
  const [firstChange, setFirstChange] = useState(true)

  const convertUnits = (temp, units) => {
    units ? setGradesName('K') : setGradesName('C')
    if (firstChange) {
      temp = units ? temp : temp - 273.15
      setFirstChange(false)
    } else temp = units ? temp + 273.15 : temp - 273.15
    return temp    
  }

  useEffect(() => { 
      setTemperature(convertUnits(temperature, units))
      setMintem(convertUnits(mintem, units))
      setMaxtem(convertUnits(maxtem, units))
  }, [units])

  const imageSelection = {
    Clouds: 'src/assets/weather-icons/png/002-cloudy.png',
    Rain: 'src/assets/weather-icons/png/003-rain.png',
    Snow: 'src/assets/weather-icons/png/006-snowing.png',
    Clear: 'src/assets/weather-icons/png/001-sun.png',
    Thunderstorm: 'src/assets/weather-icons/png/005-storm.png'
  }

  icon = imageSelection[main]

  return (
    <div className="card">
        <h1 className="cityName">{`${city}, ${country}`}</h1>
      <div className="card-section1">
        <img src={`${icon}`} alt={`${main}`} />
        <h2 className="temperature">{`${temperature.toFixed(2)} °${gradesName}`}</h2>
        <div className="min-max">
          <p>
            {`${mintem.toFixed(2)} °${gradesName} - ${maxtem.toFixed(2)} °${gradesName}`}
          </p>
        </div>
      </div>
      <div className="card-section2">
        <ul>
          <li>{description}</li>
          <li>{`Wind speed: ${windSpeed}m/s`}</li>
          <li>{`Clouds: ${cloudsPercentage}%`}</li>
          <li>{`Pressure: ${pressure}hPa`}</li>
        </ul>
        <button onClick={() => setUnits(!units)}> Kelvin / Celsius</button>
      </div>
    </div>
  )

}
export default Weather