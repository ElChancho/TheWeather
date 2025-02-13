import { useState, useEffect } from 'react'
import { detailsPlace } from '../services/getDetailsPlace'

export function useWeatherData ({ place, weatherCache }) {
  const [weatherData, setWeatherData] = useState(undefined)

  useEffect(() => {
    if (!place) return

    const placeKey = `${place.lat}-${place.lon}`

    if (weatherCache.current[placeKey]) {
      setWeatherData(weatherCache.current[placeKey])
      return
    }

    const fetchDetails = async () => {
      try {
        const data = await detailsPlace({ place })
        data.dt_txt = new Date().toLocaleDateString('en') + ' ' + new Date().toLocaleTimeString('en')
        weatherCache.current[placeKey] = data
        setWeatherData(data)
      } catch (error) {
        throw new Error('Error fetching details')
      }
    }
    fetchDetails()
  }, [place])

  return { weatherData }
}
