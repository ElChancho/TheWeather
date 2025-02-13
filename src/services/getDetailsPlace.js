export const detailsPlace = async ({ place }) => {
  // const auxurl = `https://api.openweathermap.org/data/2.5/weather?lat=40.4167047&lon=-3.7035825&units=metric&appid=483ffd05a4c01d7ec198a95fd85c856a`
  try {
    const urlSearch = `data/2.5/weather?lat=${place.lat}&lon=${place.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    const url = `${import.meta.env.VITE_API_URL}${urlSearch}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Bad search')
    const json = await response.json()
    return json
  } catch (error) {
    throw new Error('Could not get details of place')
  }
}
