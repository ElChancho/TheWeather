export function Forecast ({ forecastData, selectCardDetails }) {
  return (
    <div onClick={selectCardDetails} className='flex flex-col border rounded-md min-w-40 h-full p-2 bg-prj-4 text-center cursor-pointer hover:text-sm transition-all'>
      <p>{new Date(forecastData.dt_txt).toDateString()}</p>
      <p>{new Date(forecastData.dt_txt).getHours()}:00</p>
      <p className='font-bold'>{forecastData.weather[0].main}</p>
      <div className='flex items-center'>
        <img src={`https://openweathermap.org/img/wn/${forecastData.weather[0].icon}@2x.png`} alt={forecastData.weather.main} />
        <p className='font-bold'>{Math.round(forecastData.main.temp)}ºC</p>
      </div>
    </div>
  )
}
