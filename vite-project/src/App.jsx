import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Home from './Pages/Home'
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const location=useLocation()

  return (
    <main className='pb-14 lg:pb-0' >
      {(location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname!=='/options') && <Header />}
      <div className='min-h-[90vh]'>
        <Outlet />
        </div>
    </main>
  )
}

export default App
