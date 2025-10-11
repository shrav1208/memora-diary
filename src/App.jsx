import { Login } from './pages/Onboarding/Login'
import { Routes, Route } from 'react-router';
import './App.module.css'
import { Signup } from './pages/Onboarding/Signup';
import { Landing } from './pages/Landing/Landing';
import { FullscreenEditor } from './pages/FullscreenEditor';
import { Year } from './pages/Year/Year';
import { Month } from './pages/Month/Month';
import { Day } from './pages/Day/Day';
import { useState } from 'react';
import { About } from './pages/About/About';
import { Profile } from './pages/Profile/Profile';

function App() {
  // useState for month selection

  // useState for day selection
  // const [selectedDate, setSelectedDate] = useState("2025-10-08");

  return (
    <>
      {/* <Day selectedDay={selectedDate}/> */}
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/fullscreen-editor' element={<FullscreenEditor />} />
        <Route path='/year' element={<Year />} />
        <Route path='/month' element={<Month />} />
        <Route path='/day' element={<Day />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
