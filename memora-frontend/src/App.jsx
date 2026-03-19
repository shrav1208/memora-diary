import { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.module.css';
import { useRouteBodyClass } from './utils/useRouteBodyClass';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import ErrorBoundary from './components/ErrorBoundary'

// ─── Eagerly loaded (tiny, always needed on first paint) ───────────────────────
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { Year } from './components/Year/Year';
import { Month } from './components/Month/Month';
import { Day } from './components/Day/Day';
import { All } from './components/All/All';

// ─── Lazily loaded (not needed until user navigates there) ─────────────────────
const Login = lazy(() => import('./pages/Onboarding/Login').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('./pages/Onboarding/Signup').then(m => ({ default: m.Signup })));
const ProfileSetup = lazy(() => import('./pages/Onboarding/ProfileSetup').then(m => ({ default: m.ProfileSetup })));
const Landing = lazy(() => import('./pages/Landing/Landing').then(m => ({ default: m.Landing })));
const FullscreenEditor = lazy(() => import('./pages/Editor/FullscreenEditor').then(m => ({ default: m.FullscreenEditor })));
const About = lazy(() => import('./pages/About/About').then(m => ({ default: m.About })));
const Profile = lazy(() => import('./pages/Profile/Profile').then(m => ({ default: m.Profile })));

// Thin wrapper: Suspense per-route with null fallback.
// null = no spinner, no layout shift, body bg already visible.
function Lazy({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

function App() {
  const [fromLanding, setFromLanding] = useState(false);

  useRouteBodyClass();

  return (
    <>
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={
            <PublicRoute>
              <Lazy><Login /></Lazy>
            </PublicRoute>}
          />

          <Route path='/login' element={
            <PublicRoute>
              <Lazy><Login /></Lazy>
            </PublicRoute>}
          />

          <Route path='/signup' element={
            <PublicRoute>
              <Lazy><Signup /></Lazy>
            </PublicRoute>}
          />

          <Route path='/profile-setup' element={
            <ProtectedRoute>
              <Lazy><ProfileSetup /></Lazy>
            </ProtectedRoute>}
          />

          <Route path='/landing' element={
            <ProtectedRoute>
              <Lazy><Landing setFromLanding={setFromLanding} /></Lazy>
            </ProtectedRoute>}
          />

          <Route path='/fullscreen-editor' element={
            <ProtectedRoute>
              <Lazy><FullscreenEditor /></Lazy>
            </ProtectedRoute>}
          />

          <Route path='/fullscreen-editor/:id' element={
            <ProtectedRoute>
              <Lazy><FullscreenEditor /></Lazy>
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

          <Route path='/about' element={<Lazy><About /></Lazy>} />

          <Route path='/profile' element={
            <ProtectedRoute>
              <Lazy><Profile /></Lazy>
            </ProtectedRoute>}
          />
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;