import { useState, useEffect } from 'react'
import { getForecast } from '../services/getForecast'

export function useForecast ({ placeCardDetails }) {
  const [forecastData, setForecastData] = useState()
  const [selectedForecast, setSelectedForecast] = useState(placeCardDetails.dt)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await getForecast({ placeCardDetails })
        setForecastData(data)
      } catch (error) {
        throw new Error('Could not get forecast data')
      }
    }
    fetchForecast()
  }, [])

  return { forecastData, selectedForecast, setSelectedForecast }
}
