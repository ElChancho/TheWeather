import { useState, useEffect } from 'react'
import { getForecast } from '../services/getForecast'

export function useForecast ({ placeCardDetails, forecastCache }) {
  const [forecastData, setForecastData] = useState()
  const [selectedForecast, setSelectedForecast] = useState(placeCardDetails.dt)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const forecastKey = `${placeCardDetails.coord.lat}-${placeCardDetails.coord.lon}`
        if (forecastCache.current[forecastKey]) {
          setForecastData(forecastCache.current[forecastKey])
          return
        }

        const data = await getForecast({ placeCardDetails })
        forecastCache.current[forecastKey] = data
        setForecastData(data)
      } catch (error) {
        throw new Error('Could not get forecast data')
      }
    }
    fetchForecast()
  }, [])

  return { forecastData, selectedForecast, setSelectedForecast }
}
