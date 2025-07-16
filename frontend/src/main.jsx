import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import AvatarsProvider from './context/AvatarsContext.jsx'
import DataProvider from './context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AvatarsProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </AvatarsProvider>
    </BrowserRouter>
  </StrictMode>,
)
