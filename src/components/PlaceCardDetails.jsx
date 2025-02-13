import { Forecast } from './Forecast'
import { useForecast } from '../hooks/useForecast'

export function PlaceCardDetails ({ placeCardDetails, selectCardDetails, dataCountry, handleReturnPlaces, forecastCache }) {
  const forecastState = useForecast({ placeCardDetails, forecastCache })

  return (
    <div className='flex flex-col gap-1.5 p-4 bg-prj-2 rounded-md md:w-180 h-180 w-110'>
      <div className='relative flex items-center gap-2'>
        <h1 className='font-bold text-3xl'>{dataCountry.name}, {dataCountry.country} </h1>
        <img src={`https://flagcdn.com/${dataCountry.country.toLowerCase()}.svg`} alt={dataCountry.country} className='w-12 h-8' />
        <svg onClick={handleReturnPlaces} className='absolute right-0 h-8 w-8 cursor-pointer hover:scale-110 transition' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
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
          <p className='font-bold text-5xl'>{Math.round(placeCardDetails.main.temp)} ºC</p>
          <p>Min temp {Math.round(placeCardDetails.main.temp_min)} ºC</p>
          <p>Max temp {Math.round(placeCardDetails.main.temp_max)} ºC</p>
        </div>

      </div>

      <div className='flex justify-evenly gap-2 pt-3 mb-3'>
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

      {
        forecastState.forecastData !== undefined && (
          <div className='h-full w-full flex gap-3 overflow-x-auto'>
            {
            forecastState.forecastData.list.map((data) => {
              return (
                <Forecast
                  key={data.dt} forecastData={data} selectCardDetails={() => {
                    selectCardDetails(data)
                    forecastState.setSelectedForecast(data.dt)
                  }}
                  isActive={forecastState.selectedForecast === data.dt}
                />
              )
            })
          }
          </div>
        )
      }

    </div>

  )
}
