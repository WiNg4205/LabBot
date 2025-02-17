import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="flex">
      <Link to="/">Home</Link>
      <Link to="/players">Players</Link>
      <Link to="/games">Games</Link>
    </div>
  )
}

export default Sidebar

