import { Button } from './Button'
import logo from '../assets/sun.svg'

export function Header ({ search, handleSubmit, handleChange }) {
  return (
    <header className='flex justify-center items-center gap-5 w-full h-32 border-b border-prj-2'>
      <div className='flex items-center gap-1.5'>
        <img src={logo} alt='logo' className='md:w-16 w-8' />
        <h1 className='md:text-6xl text-3xl font-bold'>Weather</h1>
      </div>
      <form onSubmit={handleSubmit} className='flex gap-3 items-center mr-6 w-1/4 '>
        <input onChange={handleChange} value={search} type='text' placeholder='Tenerife' className='bg-prj-2 rounded-md  p-1.5 w-2/3 min-w-40' />
        <Button typeButton='submit'>
          <svg className='h-6 w-6 text-prj-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
          </svg>
        </Button>
      </form>
    </header>
  )
}
