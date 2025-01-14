import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './providers/AuthContextProvider/AuthContextProvider.tsx';
import { UserContextProvider } from './providers/UserContextProvider/UserContextProvider.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </AuthContextProvider>
    </StrictMode>
  </BrowserRouter>,
)
