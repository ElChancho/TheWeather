import { useRef, useState } from 'react'
import { searchPlace } from '../services/getCoordinates'

export function usePlaces ({ search }) {
  const [places, setPlaces] = useState([])
  const previousSearch = useRef(search)

  const getPlaces = async ({ search }) => {
    if (search === previousSearch.current) return
    previousSearch.current = search
    const foundPlaces = await searchPlace({ search })
    setPlaces(foundPlaces)
  }

  return { places, getPlaces }
}
