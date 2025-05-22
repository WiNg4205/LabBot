import { Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview'
import Calendar from './pages/Calendar'
import Results from './pages/Results'
import Layout from './Layout'

function App() {

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Overview />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/results' element={<Results />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
