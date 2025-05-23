import { Link } from "react-router-dom"
import GithubIcon from '../assets/github-mark.svg'

const Header = () => {
  return <>
    <div className="flex justify-between">
      <div className="text-lg">
        <Link to="/">Overview</Link>
        <Link to="/events">Events</Link>
        <Link to="/results">Results</Link>        
      </div>
      <a href="https://github.com/WiNg4205/LabBot/tree/main" target="_blank" rel="noopener noreferrer">
        <img src={GithubIcon} alt="GitHub SVG" className="size-8" />
      </a>
    </div>
  </>
}

export default Header 