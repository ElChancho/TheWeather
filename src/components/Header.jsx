import { Button } from './Button'
import logo from '../assets/sun.svg'
import { useState } from 'react'
import { MessagePop } from './MessagePop'

export function Header ({ search, handleSubmit, handleChange }) {
  const [showMessagePop, setShowMessagePop] = useState(false)
  const [messagePop, setMessagePop] = useState({})

  const handleSubmitAux = (event) => {
    event.preventDefault()

    if (search.length < 3) {
      setMessagePop({ text: 'Search with 3 or more characters!', isError: true })
      setShowMessagePop(true)
      return
    }
    handleSubmit()
  }

  return (
    <header className='flex justify-center items-center gap-5 w-full h-32 border-b border-prj-2'>
      <div className='flex items-center gap-1.5'>
        <img src={logo} alt='logo' className='md:w-16 w-8' />
        <h1 className='md:text-6xl text-3xl font-bold'>Weather</h1>
      </div>
      <form onSubmit={handleSubmitAux} className='flex gap-3 items-center md:mr-6 w-2/4 '>
        <input onChange={handleChange} value={search} type='text' placeholder='Tenerife' className='bg-prj-2 rounded-md  p-1.5 w-2/3 md:w-2/3' />
        <Button typeButton='submit'>
          <svg className='md:h-6 md:w-6 w-4 h-4 text-prj-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </Button>
      </form>
      {
          showMessagePop && (
            <MessagePop text={messagePop.text} isError={messagePop.isError} onClose={() => setShowMessagePop(false)} />
          )
        }

    </header>
  )
}
