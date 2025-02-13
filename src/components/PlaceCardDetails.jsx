import { useState, useEffect } from 'react'
// import placeCardDetailsJSON from '../mocks/results-details.json'
// import resultsForecastData from '../mocks/results-details-forecast.json'
import { Forecast } from './Forecast'

export function PlaceCardDetails ({ placeCardDetails, selectCardDetails, dataCountry }) {
  // placeCardDetails = placeCardDetailsJSON // Acordarse de quitar esto
  // Aqui hacer un useEffect que se ejecute una vez para obtener los datos del forecast con el siguiente url:
  // https://api.openweathermap.org/data/2.5/forecast?lat=40.4167&lon=-3.7036&units=metric&appid=483ffd05a4c01d7ec198a95fd85c856a
  // Tener en cuenta que tambien incluye el dia actual(cada 3 h) y los próximos 4 días
  const [forecastData, setForecastData] = useState()

  useEffect(() => {
  // hacer la peticion a la api
    const fetchForecast = async () => {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=40.4167&lon=-3.7036&units=metric&appid=483ffd05a4c01d7ec198a95fd85c856a')
        // console.log(new Date().toLocaleDateString('en') + ' ' + new Date().toLocaleTimeString('en'))
        const resultsForecastData = await response.json()
        // console.log('PLACECARDDETAILS ', ...placeCardDetails)
        // const allData = resultsForecastData.list.unshift([...placeCardDetails])
        // console.log('Alldata: ', allData)
        setForecastData(resultsForecastData)
      } catch (error) {
        throw new Error('Could not fetch forecast data')
      }
    }
    fetchForecast()
    console.log('DATACOUNTRY: ', dataCountry)
  }, [])

  return (
    // url para el forecast. Incluye el del día actual:
    <div className='flex flex-col gap-1.5 p-4 bg-prj-2 rounded-md md:w-180 h-180 w-110'>
      <div className='flex items-center gap-2'>
        <h1 className='font-bold text-3xl'>{dataCountry.name}, {dataCountry.country} </h1>
        <img src={`https://flagcdn.com/${dataCountry.country.toLowerCase()}.svg`} alt={dataCountry.country} className='w-12 h-8' />
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
        forecastData !== undefined && (
          <div className='h-full w-full flex gap-3 overflow-x-auto'>
            {
            forecastData.list.map((data) => {
              return (
                <Forecast key={data.dt} forecastData={data} selectCardDetails={() => { selectCardDetails(data) }} />
              )
            })
          }
          </div>
        )
      }

    </div>

  )
}
