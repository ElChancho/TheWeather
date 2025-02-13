export const searchPlace = async ({ search }) => {
  try {
    if (search === '') return []
    const urlSearch = `geo/1.0/direct?q=${search}&limit=5&appid=${import.meta.env.VITE_API_KEY}`
    const url = `${import.meta.env.VITE_API_URL}${urlSearch}`
    const response = await fetch(url)
    const foundPlaces = await response.json()
    return foundPlaces
  } catch (error) {
    throw new Error('Could not get coordinates of place')
  }
}
