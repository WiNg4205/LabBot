import { Link } from "react-router-dom"
import GithubIcon from '../assets/github-logo.svg'
import DiscordIcon from '../assets/discord-logo.svg'
import LabBotIcon from '../assets/flask-solid.svg'


const Header = () => {
  return <>
    <div className="flex min-w-full justify-center border-b border-slate-600">
      <div className="flex justify-between w-[90rem]">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={LabBotIcon} alt="LabBot SVG" className="size-6 mx-1"/>
            <h1 className="text-xl font-semibold">LabBot</h1>
          </Link>
          <form className="max-w-md mx-auto pl-4">   
              <label for="default-search" className="mb-2 text-sm font-medium sr-only dark:text-black">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-slate-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input autoComplete="off" type="search" id="default-search" className="block w-32 py-2 ps-10 text-sm text-slate-300 rounded-lg bg-slate-800 focus:outline-none hover:border-blue-500" placeholder="Search" required />
              </div>  
          </form>
        </div>
        <div className="flex items-center bg-slate-900 h-14 font-semibold">
          <div>
            <Link to="/" className="px-3 font-normal text-[16px]">Overview</Link>
            <Link to="/events" className="px-3 font-normal text-[16px]">Events</Link>
            <Link to="/results" className="px-3 font-normal text-[16px]">Results</Link>
            <Link to="/docs" className="px-3 font-normal text-[16px]">Docs</Link>      
          </div>
          <div className="w-px h-8 bg-slate-500 mx-2"></div>
          <a href="https://github.com/WiNg4205/LabBot/tree/main" target="_blank" rel="noopener noreferrer">
            <img src={GithubIcon} alt="GitHub SVG" className="size-6 mx-2" />
          </a>
          <a href="https://discord.com/oauth2/authorize?client_id=1111800916589432906&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
            <img src={DiscordIcon} alt="Discord SVG" className="size-6 mx-2" />
          </a>
          <div className="text-sm font-normal ml-8 px-2 py-2 bg-indigo-950 hover:bg-slate-900 border border-slate-500 rounded-md">Sign in</div>
        </div>
      </div>
    </div>
  </>
}

export default Header 