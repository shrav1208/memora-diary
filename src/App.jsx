import { Login } from './pages/Onboarding/Login'
import { Routes, Route } from 'react-router';
import './App.css'
import { Signup } from './pages/Onboarding/Signup';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </>
  )
}

export default App
