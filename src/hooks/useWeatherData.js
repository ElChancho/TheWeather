import { useState, useEffect } from 'react'
import { detailsPlace } from '../services/getDetailsPlace'

export function useWeatherData ({ place }) {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await detailsPlace({ place })
        data.dt_txt = new Date().toLocaleDateString('en') + ' ' + new Date().toLocaleTimeString('en')
        setWeatherData(data)
      } catch (error) {
        throw new Error('Error fetching details')
      }
    }
    fetchDetails()
  }, [])

  return { weatherData }
}
