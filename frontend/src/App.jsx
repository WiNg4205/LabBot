import { Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview'
import Events from './pages/Events'
import Results from './pages/Results'
import Docs from './pages/Docs'
import Layout from './Layout'


function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Overview />} />
          <Route path='/events' element={<Events />} />
          <Route path='/results' element={<Results />} />
          <Route path='/docs' element={<Docs />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
