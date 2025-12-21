import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TokenProvider from './context/TokenProvider.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <App />
    </TokenProvider>
  </StrictMode>,
)
