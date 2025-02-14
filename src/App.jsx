import { useRef, useState } from 'react'
import { PlaceCard } from './components/PlaceCard'
import { Header } from './components/Header'
import { PlaceCardDetails } from './components/PlaceCardDetails'
import { usePlaces } from './hooks/usePlaces'

function App () {
  const [search, setSearch] = useState('')
  const [showPlaceCardDetails, setShowPlaceCardDetails] = useState(false)
  const [placeCardDetails, setPlaceCardDetails] = useState()
  const [dataCountry, setDataCountry] = useState()

  const placeState = usePlaces({ search })
  const weatherCache = useRef({})
  const forecastCache = useRef({})

  const handleSubmit = () => {
    placeState.getPlaces({ search })
    setShowPlaceCardDetails(false)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleViewDetails = () => {
    setShowPlaceCardDetails(true)
  }

  const handleReturnPlaces = () => {
    setShowPlaceCardDetails(false)
  }

  const selectCardDetails = (data) => {
    setPlaceCardDetails(data)
  }

  return (
    <>
      <div className='font-poppins text-black bg-prj-3 w-full h-full min-h-screen'>
        <Header search={search} handleChange={handleChange} handleSubmit={handleSubmit} />

        <main className='flex justify-center mt-10 pb-10'>
          {
            placeState.places.length === 0 && !showPlaceCardDetails
              ? 'Nothing found!'
              : !showPlaceCardDetails && (<div className='flex flex-col gap-5 items-center max-w-180 w-4/5'>
                {
                  placeState.places.map((place) => {
                    return (
                      <PlaceCard
                        key={[place.lat, place.lon]}
                        place={place}
                        setDataCountry={setDataCountry}
                        setPlaceCardDetails={setPlaceCardDetails}
                        handleViewDetails={handleViewDetails}
                        weatherCache={weatherCache}
                      />
                    )
                  })
                }
              </div>
                )
          }
          {
            showPlaceCardDetails && (
              <PlaceCardDetails
                placeCardDetails={placeCardDetails}
                selectCardDetails={selectCardDetails}
                dataCountry={dataCountry}
                handleReturnPlaces={handleReturnPlaces}
                forecastCache={forecastCache}
              />

            )
          }
        </main>
      </div>
    </>
  )
}

export default App
