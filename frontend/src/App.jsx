import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import Home from "./Home"
import Players from "./Players"
import Games from "./Games"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/games" element={<Games />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
