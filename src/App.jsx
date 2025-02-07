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
      <div className='font-poppins text-white bg-prj-1 w-full h-full min-h-screen'>
        <header className='flex flex-col text-center pt-6  justify-center items-center w-full gap-5'>
          <h1 className='text-6xl'>El Tiempo</h1>
          <form onSubmit={handleSubmit} className='flex gap-5 w-full justify-center items-center'>
            <input onChange={handleChange} value={search} type='text' placeholder='Tenerife' className='bg-prj-2 rounded-md border-white p-1.5 w-96 min-w-80' />
            <button type='submit' className='cursor-pointer bg-prj-3 p-2 rounded-md hover:scale-105 transition'>Buscar</button>
          </form>

        </header>

        <main className='flex justify-center mt-10'>
          {
            places.length === 0
              ? 'Inserta algún lugar a buscar'
              : (<div className='flex flex-col gap-5 items-center max-w-180 w-4/5 bg-amber-50'>
                {
                    places.map((place, index) => {
                      return (
                        <div key={index} className='flex bg-prj-3 rounded-md w-full h-20'>
                          <p>{place.name} ,</p>
                          <p>{place.country}</p>

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
