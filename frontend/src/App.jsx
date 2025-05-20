import { Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview'
import Calendar from './pages/Calendar'
import Results from './pages/Results'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </>
  )
}

export default App
