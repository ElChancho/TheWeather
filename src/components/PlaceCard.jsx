import { Button } from './Button'
import { useWeatherData } from '../hooks/useWeatherData'

export function PlaceCard ({ place, weatherCache, setDataCountry, setPlaceCardDetails, handleViewDetails }) {
  const weatherState = useWeatherData({ place, weatherCache })

  return (
    <div className='relative flex flex-col pl-3 p-2 bg-prj-2 rounded-md w-full h-35 text-sm md:text-lg'>
      <div className='flex gap-2 items-center'>
        <p className='font-bold'>{place.name} , {place.country}</p>
        <img src={`https://flagcdn.com/${place.country.toLowerCase()}.svg`} alt={place.country} className='w-6 h-4' />

      </div>
      <p>Geocoordinates ({place.lat.toFixed(3)}, {place.lon.toFixed(3)})</p>
      {weatherState.weatherData && (
        <div className='flex h-20 items-center'>
          <img src={`https://openweathermap.org/img/wn/${weatherState.weatherData.weather[0].icon}@2x.png`} alt={weatherState.weatherData.weather[0].main} />
          <p className='font-bold md:text-2xl text-base'>{Math.round(weatherState.weatherData.main.temp)} ºC</p>
        </div>
      )}

      <Button
        className='absolute right-4 bottom-4 w-16 md:w-30 text-xs md:text-base'
        onClick={() => {
          handleViewDetails()
          setPlaceCardDetails(weatherState.weatherData)
          setDataCountry(place)
        }}
      >
        View details
      </Button>
    </div>

  )
}
