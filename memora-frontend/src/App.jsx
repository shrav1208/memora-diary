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
import dayjs from 'dayjs';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  const [fromLanding, setFromLanding] = useState(false);
  // useState for month selection
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());

  // useState for day selection
  const [selectedDay, setSelectedDay] = useState(dayjs().date());
  console.log(dayjs().date(selectedDay).format());
  console.log(dayjs().month(selectedMonth).date(selectedDay).format("YYYY-MM-DD"));

  return (
    <>
    {/* <Day selectedDay={selectedDate}/> */}
    <Routes>
        <Route path='/' element={
          <PublicRoute> 
            <Login /> 
          </PublicRoute>}
        />

        <Route path='/login' element={
          <PublicRoute> 
            <Login /> 
          </PublicRoute>}
        />

        <Route path='/signup' element={
          <PublicRoute> 
            <Signup /> 
          </PublicRoute>} 
        />

        <Route path='/landing' element={
          <ProtectedRoute>
            <Landing setFromLanding={setFromLanding} setSelectedMonth={setSelectedMonth} setSelectedDay={setSelectedDay} />
          </ProtectedRoute>} 
        />

        <Route path='/fullscreen-editor' element={
          <ProtectedRoute>
            <FullscreenEditor />
          </ProtectedRoute>} 
        />

        <Route path='/year' element={
          <ProtectedRoute>
            <Year setSelectedMonth={setSelectedMonth} setSelectedDay={setSelectedDay}/>
          </ProtectedRoute>} 
        />
        
        <Route path='/month' element={
          <ProtectedRoute> 
            <Month selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} setSelectedDay={setSelectedDay}/>
          </ProtectedRoute>}
        />

        <Route path='/day' element={
          <ProtectedRoute> 
            <Day selectedMonth={selectedMonth} selectedDay={selectedDay} fromLanding={fromLanding} setFromLanding={setFromLanding} setSelectedMonth={setSelectedMonth} setSelectedDay={setSelectedDay}/>
          </ProtectedRoute>}
        />

        <Route path='/about' element={<About />}/>

        <Route path='/profile' element={
          <ProtectedRoute> 
            <Profile /> 
          </ProtectedRoute>}
        />

      </Routes>
    </>
  )
}

export default App