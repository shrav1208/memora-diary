import { Login } from './pages/Onboarding/Login'
import { Routes, Route, Navigate } from 'react-router';
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
import { useRouteBodyClass } from './utils/useRouteBodyClass';
import { All } from './components/All/All';

function App() {
  const [fromLanding, setFromLanding] = useState(false);

  useRouteBodyClass();

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
            <Landing setFromLanding={setFromLanding} />
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
                fromLanding={fromLanding}
                setFromLanding={setFromLanding}
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={`/dashboard/${dayjs().year()}/${dayjs().month()}/${dayjs().date()}`} />} />

          <Route path="all" element={<All />} />

          <Route path=":year" element={<Year />} />

          <Route path=":year/:month" element={<Month />} />

          <Route path=":year/:month/:day" element={<Day />} />

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