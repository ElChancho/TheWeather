import placeCardDetailsJSON from '../mocks/results-details.json'

export function PlaceCardDetails ({ placeCardDetails }) {
  placeCardDetails = placeCardDetailsJSON // Acordarse de quitar esto
  // Aqui hacer un useEffect que se ejecute una vez para obtener los datos del forecast con el siguiente url:
  // https://api.openweathermap.org/data/2.5/forecast?lat=40.4167&lon=-3.7036&units=metric&appid=483ffd05a4c01d7ec198a95fd85c856a
  // Tener en cuenta que tambien incluye el dia actual(cada 3 h) y los próximos 4 días
  return (
    // url para el forecast. Incluye el del día actual:
    <div className='flex flex-col gap-1.5 p-4 bg-prj-2 rounded-md md:w-180 h-160 w-110'>
      <div className='flex items-center gap-2'>
        <h1 className='font-bold text-3xl'>{placeCardDetails.name}, {placeCardDetails.sys.country} </h1>
        <img src={`https://flagcdn.com/${placeCardDetails.sys.country.toLowerCase()}.svg`} alt={placeCardDetails.country} className='w-12 h-8' />
      </div>

      <p>Today, {new Date().toLocaleDateString()}</p>
      <p>{new Date().toLocaleTimeString().slice(0, 5)}</p>
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

      <div className='flex justify-evenly gap-2 pt-3'>
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

    </div>

  )
}
