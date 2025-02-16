import { useRef } from 'react'
import { Forecast } from './Forecast'
import { useForecast } from '../hooks/useForecast'

export function PlaceCardDetails ({ placeCardDetails, selectCardDetails, dataCountry, handleReturnPlaces, forecastCache }) {
  const forecastState = useForecast({ placeCardDetails, forecastCache })
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' })
    }
  }

  return (
    <div className='flex flex-col gap-1.5 p-4 bg-prj-2 rounded-md md:w-180 h-auto w-70'>
      <div className='relative flex items-center gap-2 '>
        <h1 className='font-bold text-3xl'>{dataCountry.name}, {dataCountry.country} </h1>
        <img src={`https://flagcdn.com/${dataCountry.country.toLowerCase()}.svg`} alt={dataCountry.country} className='w-12 h-8' />
        <svg onClick={handleReturnPlaces} className='absolute right-0 max-sm:-top-3 md:bottom-0 h-8 w-8 cursor-pointer hover:scale-110 transition' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6' />
        </svg>
      </div>

      <p>
        {new Date().getDate() === new Date(placeCardDetails.dt_txt).getDate() ? 'Today, ' : ''}
        {new Date(placeCardDetails.dt_txt).toDateString()}
      </p>
      <p>{new Date(placeCardDetails.dt_txt).getHours()}:00</p>
      <div className='flex justify-center items-center border-b border-prj-1'>
        <div className='flex flex-col items-center h-70'>
          <p className='text-3xl font-bold'>{placeCardDetails.weather[0].main}</p>
          <p>{placeCardDetails.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${placeCardDetails.weather[0].icon}@4x.png`} alt={placeCardDetails.weather[0].main} className='h-40 w-40' />
        </div>

        <div className='flex flex-col items-center'>
          <p className='font-bold md:text-5xl text-4xl'>{Math.round(placeCardDetails.main.temp)} ºC</p>
          <p>Min temp {Math.round(placeCardDetails.main.temp_min)} ºC</p>
          <p>Max temp {Math.round(placeCardDetails.main.temp_max)} ºC</p>
        </div>

      </div>

      <div className='flex flex-wrap justify-evenly gap-2 pt-3 mb-3'>
        <div className='flex flex-col text-center items-center'>
          <p className='font-bold'>Pressure</p>
          <p>{placeCardDetails.main.pressure} hPa</p>
        </div>

        <div className='flex flex-col text-center items-center'>
          <p className='font-bold'>Humidity</p>
          <p>{placeCardDetails.main.humidity}%</p>
        </div>

        <div className='flex flex-col text-center items-center'>
          <p className='font-bold'>Sea level</p>
          <p>{placeCardDetails.main.sea_level} hPa</p>
        </div>

        <div className='flex flex-col text-center items-center'>
          <p className='font-bold'>Ground level</p>
          <p>{placeCardDetails.main.grnd_level} hPa</p>
        </div>

        <div className='flex flex-col text-center items-center'>
          <p className='font-bold'>Wind speed</p>
          <p>{placeCardDetails.wind.speed} m/s</p>
        </div>

      </div>

      <div className='relative'>
        <button
          onClick={scrollLeft}
          className='absolute z-10 left-0 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-800 text-white px-2 py-1 rounded-full hover:bg-gray-700'
        >
          ◀
        </button>

        <div
          ref={scrollRef}
          className='flex gap-3 overflow-hidden scroll-smooth'
        >
          {forecastState.forecastData &&
            forecastState.forecastData.list.map((data) => (
              <Forecast
                key={data.dt}
                forecastData={data}
                selectCardDetails={() => {
                  selectCardDetails(data)
                  forecastState.setSelectedForecast(data.dt)
                }}
                isActive={forecastState.selectedForecast === data.dt}
              />
            ))}
        </div>

        <button
          onClick={scrollRight}
          className='absolute z-10 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer bg-gray-800 text-white px-2 py-1 rounded-full hover:bg-gray-700'
        >
          ▶
        </button>
      </div>

    </div>

  )
}
