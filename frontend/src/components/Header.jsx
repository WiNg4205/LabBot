import { Link } from "react-router-dom"

const Header = () => {
  return <>
    <div className="">
      <Link to="/">Overview</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/results">Results</Link>
    </div>
  </>
}

export default Header 