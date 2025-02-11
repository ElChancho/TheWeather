import { useEffect, useState } from 'react'
import { Button } from './Button'
import { detailsPlace } from '../services/getDetailsPlace'

export function PlaceCard ({ place }) {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await detailsPlace({ place })
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching details: ', error)
      }
    }
    fetchDetails()
  }, [])

  return (
    <div className='relative flex flex-col pl-3 p-2 bg-prj-2 rounded-md w-full h-35'>
      <div className='flex gap-2 items-center'>
        <p className='font-bold'>{place.name} , {place.country}</p>
        <img src={`https://flagcdn.com/${place.country.toLowerCase()}.svg`} alt={place.country} className='w-6 h-4' />
      </div>
      <p>Geocoordinates ({place.lat.toFixed(3)}, {place.lon.toFixed(3)})</p>
      {weatherData && (
        <div className='flex h-20 items-center'>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].main} />
          <p className='font-bold text-2xl'>{Math.round(weatherData.main.temp)} ºC</p>
        </div>
      )}

      <Button className='absolute right-4 bottom-4 w-30'>View details</Button>
    </div>

  )
}
