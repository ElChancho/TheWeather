export const getForecast = async ({ placeCardDetails }) => {
  try {
    const urlSearch = `data/2.5/forecast?lat=${placeCardDetails.coord.lat}&lon=${placeCardDetails.coord.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    const url = `${import.meta.env.VITE_API_URL}${urlSearch}`
    // https://api.openweathermap.org/data/2.5/forecast?lat=40.4167&lon=-3.7036&units=metric&appid=483ffd05a4c01d7ec198a95fd85c856a
    const response = await fetch(url)
    const resultsForecastData = await response.json()
    resultsForecastData.list.unshift(placeCardDetails)
    return resultsForecastData
  } catch (error) {
    throw new Error('Could not get forecast data')
  }
}
