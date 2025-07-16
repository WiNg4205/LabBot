import { Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview'
import Events from './pages/Events'
import Results from './pages/Results'
import DesignPhilosophy from './pages/Docs/design-philosophy'
import Installation from './pages/Docs/Installation'
import Commands from './pages/Docs/Commands'
import GameInstructions from './pages/Docs/GameInstructions'
import Layout from './Layout'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Overview />} />
          <Route path='/events' element={<Events />} />
          <Route path='/results' element={<Results />} />
          <Route path='/docs/design-philosophy' element={<DesignPhilosophy />} />
          <Route path='/docs/installation' element={<Installation />} />
          <Route path='/docs/commands' element={<Commands />} />
          <Route path='/docs/game-instructions' element={<GameInstructions />} />
        </Route>
      </Routes>
    </>
  )
}

export default App