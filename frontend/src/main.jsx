import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import GamesProvider from "./context/GamesContext.jsx"
import OutingsProvider from './context/OutingsContext.jsx'
import PlayersProvider from './context/PlayersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GamesProvider>
        <OutingsProvider>
          <PlayersProvider>
            <App />
          </PlayersProvider>
        </OutingsProvider>
      </GamesProvider>
    </BrowserRouter>
  </StrictMode>,
)
