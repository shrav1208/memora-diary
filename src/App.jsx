import { Login } from './pages/Onboarding/Login'
import { Routes, Route } from 'react-router';
import './App.css'
import { Signup } from './pages/Onboarding/Signup';
import { Landing } from './pages/Landing/Landing';

function App() {


  return (
    <>
      <Landing />
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
