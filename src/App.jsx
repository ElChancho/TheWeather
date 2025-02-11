import { useState } from 'react'
import { searchPlace } from './services/getCoordinates'
import { PlaceCard } from './components/PlaceCard'
import { Header } from './components/Header'

function App () {
  const [search, setSearch] = useState('')
  const [places, setPlaces] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (search.length < 3) {
      console.log('Pon mas de 2 caracteres')
      return
    }
    const foundPlaces = await searchPlace({ search })
    setPlaces(foundPlaces)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <div className='font-poppins text-black bg-prj-3 w-full h-full min-h-screen'>
        <Header search={search} handleChange={handleChange} handleSubmit={handleSubmit}></Header>

        <main className='flex justify-center mt-10 pb-10'>
          {
            places.length === 0
              ? ''
              : (<div className='flex flex-col gap-5 items-center max-w-180 w-4/5'>
                {
                    places.map((place) => {
                      return <PlaceCard key={[place.lat, place.lon]} place={place}></PlaceCard>
                    })
                  }
              </div>
                )
          }
        </main>
      </div>
    </>
  )
}

export default App
