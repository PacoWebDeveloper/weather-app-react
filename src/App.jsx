import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'
import './App.css'

function App() {

  const [coords, setCoords] = useState()
  const [weatherData, setWeaterData] = useState()
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(position.coords)
    })
  }, [])

  useEffect(() => {
    if (coords) {
      const lat = coords.latitude
      const lon = coords.longitude
      const APIkey = 'b981bc48ba4fa3086e42bbd91490e114'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
  
      axios.get(URL)
      .then(res => setWeaterData(res.data))
      .catch(err => console.error(err))
    }
  }, [coords])

  return (
    <div className="App">
      {weatherData && <Weather weatherData={weatherData}/>}
    </div>
  )
}

export default App
