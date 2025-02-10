import { useEffect, useState } from 'react'
import { searchPlace } from './services/getCoordinates'

function App () {
  const [search, setSearch] = useState('')
  const [places, setPlaces] = useState([])

  useEffect(() => {
    console.log(places)
  }, [places])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const foundPlaces = await searchPlace({ search })
    setPlaces(foundPlaces)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <div className='font-poppins text-black bg-prj-3 w-full h-full min-h-screen'>
        <header className='flex justify-center items-center w-full h-32 border-b border-prj-2'>
          <h1 className='md:text-6xl text-4xl font-bold'>Weather</h1>
          <form onSubmit={handleSubmit} className='flex gap-5 items-center w-1/4 '>
            <input onChange={handleChange} value={search} type='text' placeholder='Tenerife' className='bg-prj-2 rounded-md  p-1.5 w-2/3 min-w-40' />
            <button type='submit' className='cursor-pointer p-1.5 rounded-md bg-prj-1 text-white hover:scale-110 transition'>
              <svg className='h-6 w-6 text-prj-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>

            </button>
          </form>

        </header>

        <main className='flex justify-center mt-10 pb-10'>
          {
            places.length === 0
              ? 'Search for a place'
              : (<div className='flex flex-col gap-5 items-center max-w-180 w-4/5'>
                {
                    places.map((place) => {
                      return (
                        <div key={[place.lat, place.lon]} className='flex flex-col pl-3 pt-2 bg-prj-2 rounded-md w-full h-25 cursor-pointer hover:scale-101 transition'>
                          <p className='font-bold'>{place.name} , {place.country}</p>
                          <p>Geocoordinates ({place.lat.toFixed(3)}, {place.lon.toFixed(3)})</p>

                        </div>

                      )
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
