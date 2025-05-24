import { Link } from "react-router-dom"
import GithubIcon from '../assets/github-logo.svg'
import DiscordIcon from '../assets/discord-logo.svg'

const Header = () => {
  return <>
    <div className="flex items-center justify-center bg-slate-900 min-w-full h-14 border-b border-b-slate-600 font-semibold px-72">
      <div>
        <Link to="/" className="px-2">Overview</Link>
        <Link to="/events" className="px-2">Events</Link>
        <Link to="/results" className="px-2">Results</Link>        
      </div>
      <div className="w-px h-8 bg-slate-500 mx-2"></div>
      <a href="https://github.com/WiNg4205/LabBot/tree/main" target="_blank" rel="noopener noreferrer">
        <img src={GithubIcon} alt="GitHub SVG" className="size-6 mx-2" />
      </a>
      <a href="https://discord.com/oauth2/authorize?client_id=1111800916589432906&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
        <img src={DiscordIcon} alt="Discord SVG" className="size-6 mx-2" />
      </a>
      <div className=" mx-2 px-2 py-1 bg-indigo-950 hover:bg-slate-900 border border-slate-500 rounded-md">LOG IN</div>
    </div>
  </>
}

export default Header 