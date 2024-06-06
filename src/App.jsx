import { useState } from 'react'
import Footer from './Components/Footer/Footer'
import { Header } from './Components'
import { Outlet } from 'react-router-dom'

function App() { 
  return (
   <div className='flex flex-col min-h-screen'>
    <Header />
    
    {/* For this I am using css flex box */}
    <main className='bg-white h-full flex-grow overflow-hidden'>
      <Outlet />
    </main>
      
    <Footer />
   </div>
  )
}

export default App
