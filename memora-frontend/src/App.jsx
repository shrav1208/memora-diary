import { Login } from './pages/Onboarding/Login'
import { Routes, Route } from 'react-router';
import './App.module.css'
import { Signup } from './pages/Onboarding/Signup';
import { Landing } from './pages/Landing/Landing';
import { FullscreenEditor } from './pages/FullscreenEditor';
import { Year } from './components/Year/Year';
import { Month } from './components/Month/Month';
import { Day } from './components/Day/Day';
import { useState } from 'react';
import { About } from './pages/About/About';
import { Profile } from './pages/Profile/Profile';
import dayjs from 'dayjs';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import { DashboardPage } from './pages/Dashboard/DashboardPage';

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

        <Route path='/fullscreen-editor/:id' element={
          <ProtectedRoute>
            <FullscreenEditor />
          </ProtectedRoute>}
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                fromLanding={fromLanding}
                setFromLanding={setFromLanding}
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Year setSelectedMonth={setSelectedMonth} />} />
          <Route path="year" element={<Year setSelectedMonth={setSelectedMonth} />} />
          <Route path="month" element={<Month selectedMonth={selectedMonth} setSelectedDay={setSelectedDay} />} />
          <Route path="day" element={<Day selectedMonth={selectedMonth} selectedDay={selectedDay} />} />
        </Route>

        <Route path='/about' element={<About />} />

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