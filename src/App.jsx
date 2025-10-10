import { Login } from './pages/Onboarding/Login'
import { Routes, Route } from 'react-router';
import './App.css'
import { Signup } from './pages/Onboarding/Signup';
import { Landing } from './pages/Landing/Landing';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { FullscreenEditor } from './pages/FullscreenEditor';
import { Year } from './pages/Year/Year';
import { Month } from './pages/Month/Month';
import { Day } from './pages/Day/Day';
import { useState } from 'react';
import { About } from './pages/About/About';

function App() {
  // useState for month selection

  // useState for day selection
  // const [selectedDate, setSelectedDate] = useState("2025-10-08");

  return (
    <>
      <About />
      {/* <Day selectedDay={selectedDate}/> */}
      {/* <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/landing' element={<Landing />} />
      </Routes> */}
    </>
  )
}

export default App
