export const getForecast = async ({ placeCardDetails }) => {
  try {
    const urlSearch = `data/2.5/forecast?lat=${placeCardDetails.coord.lat}&lon=${placeCardDetails.coord.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    const url = `${import.meta.env.VITE_API_URL}${urlSearch}`
    const response = await fetch(url)
    const resultsForecastData = await response.json()
    resultsForecastData.list.unshift(placeCardDetails)
    return resultsForecastData
  } catch (error) {
    throw new Error('Could not get forecast data')
  }
}
