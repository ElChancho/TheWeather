import { useEffect, useState } from 'react'
import { searchPlace } from './services/getCoordinates'
import { PlaceCard } from './components/PlaceCard'
import { Header } from './components/Header'
import { PlaceCardDetails } from './components/PlaceCardDetails'


function App () {
  const [search, setSearch] = useState('')
  const [places, setPlaces] = useState([])
  const [showPlaceCardDetails, setShowPlaceCardDetails] = useState(true) // Cambiarlo a false
  const [placeCardDetails, setPlaceCardDetails] = useState()

  // useEffect(() => {
  //   console.log('showPlaceCardDetails', showPlaceCardDetails)
  //   console.log('placeCardDetails', placeCardDetails)
  // }, [placeCardDetails])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (search.length < 3) {
      console.log('Pon mas de 2 caracteres')
      return
    }
    const foundPlaces = await searchPlace({ search })
    setPlaces(foundPlaces)
    setShowPlaceCardDetails(false)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleViewDetails = () => {
    setShowPlaceCardDetails(true)
  }

  return (
    <>
      <div className='font-poppins text-black bg-prj-3 w-full h-full min-h-screen'>
        <Header search={search} handleChange={handleChange} handleSubmit={handleSubmit} />

        <main className='flex justify-center mt-10 pb-10'>
          {
            places.length === 0 && !showPlaceCardDetails
              ? 'Nothing was found! Try something else'
              : !showPlaceCardDetails && (<div className='flex flex-col gap-5 items-center max-w-180 w-4/5'>
                {
                  places.map((place) => {
                    return <PlaceCard key={[place.lat, place.lon]} place={place} setPlaceCardDetails={setPlaceCardDetails} handleViewDetails={handleViewDetails} />
                  })
                }
              </div>
                )
          }
          {
            showPlaceCardDetails && (
              <PlaceCardDetails />

            )
          }
        </main>
      </div>
    </>
  )
}

export default App
