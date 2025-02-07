import foundPlaces from '../mocks/with-results.json'

export const searchPlace = async ({ search }) => {
  try {
    const urlSearch = `/geo/1.0/direct?q=${search}&limit=5&appid=${import.meta.env.VITE_API_KEY}`
    const url = `${import.meta.env.VITE_API_URL}${urlSearch}`
    console.log('URL:', url)
    console.log('SEARCH: ', search)
    return foundPlaces
  } catch (error) {
    throw new Error('Problemas obteniendo las coordenadas del lugar')
  }
}
