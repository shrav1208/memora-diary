import { Login } from './pages/Onboarding/Login'
import { Routes, Route } from 'react-router-dom';
import './App.module.css'
import { Signup } from './pages/Onboarding/Signup';
import { Landing } from './pages/Landing/Landing';
import { FullscreenEditor } from './pages/Editor/FullscreenEditor';
import { Year } from './components/Year/Year';
import { Month } from './components/Month/Month';
import { Day } from './components/Day/Day';
import { useState } from 'react';
import { About } from './pages/About/About';
import { Profile } from './pages/Profile/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { useRouteBodyClass } from './utils/useRouteBodyClass';
import { All } from './components/All/All';
import { ProfileSetup } from './pages/Onboarding/ProfileSetup';

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

        <Route path='/profile-setup' element={
          <ProtectedRoute>
            <ProfileSetup />
          </ProtectedRoute>}
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

          {/* Static first */}
          <Route path="all" element={<All />} />

          {/* Dynamic next */}
          <Route path=":year/:month/:day" element={<Day />} />
          <Route path=":year/:month" element={<Month />} />
          <Route path=":year" element={<Year />} />

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