import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import axios from 'axios';
import './index.css'
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="bottom-center"
          containerStyle={{
            bottom: 100,
          }}
          toastOptions={{
            style: {
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: '200',
              borderRadius: '33px',
              background: 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 2px 10.5px 0 rgba(0, 0, 0, 0.25)',
              color: '#343434',
              padding: '10px 20px',
              maxWidth: 'min(400px, 85vw)', // never wider than 85% of screen
            },
            error: {
              iconTheme: {
                primary: '#343434',
                secondary: '#fff',
              },
            },
            success: {
              iconTheme: {
                primary: '#343434',
                secondary: '#fff',
              },
            },
          }}
        />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
