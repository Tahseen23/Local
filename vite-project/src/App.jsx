import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import { Outlet, useLocation } from 'react-router-dom'

function App() {
  const location=useLocation()

  return (
    <main className='pb-14 lg:pb-0' >
      {(location.pathname !== '/login' && location.pathname !== '/signup=client' && location.pathname!=='/options' && location.pathname!=='/signup=worker') && <Header />}
      <div className='min-h-[90vh]'>
        <Outlet />
        </div>
    </main>
  )
}

export default App
