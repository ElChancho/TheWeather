function App () {
  return (
    <>
      <body className='font-poppins text-white bg-prj-1'>
        <header className='flex flex-col text-center justify-center items-center w-full'>
          <h1>El Tiempo</h1>
          <input type='text' placeholder='Tenerife' className='bg-prj-2 rounded-md border-white w-1/6' />
        </header>

        <main className='flex justify-center'>
          <p>Aqui va los datos del tiempo de hoy</p>
        </main>
      </body>
    </>
  )
}

export default App
