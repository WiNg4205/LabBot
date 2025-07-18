import { Link, NavLink } from "react-router-dom"
import LabBotIcon from '../assets/flask-solid.svg'
import SignIn from "./SignIn"


const Header = () => {
  return <div className="sticky top-0 z-50 bg-zinc-900 flex min-w-full justify-center border-b border-zinc-600">
    <div className="flex justify-between w-[90rem]">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={LabBotIcon} alt="LabBot SVG" className="size-6 mx-1"/>
          <h1 className="text-xl font-semibold">LabBot</h1>
        </Link>
        <form className="max-w-md mx-auto pl-4">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-zinc-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input autoComplete="off" type="search" id="default-search" className="outline-transparent hover:outline-indigo-300 hover:outline-1 block w-32 py-2 ps-10 text-sm text-slate-300 rounded-lg bg-zinc-800 focus:outline-none transition duration-300" placeholder="Search" required />
            </div>  
        </form>
      </div>
      <div className="flex items-center h-14 font-semibold">
        <div>
          <NavLink 
            to="/events" 
            className={({ isActive }) =>
              "px-3 font-normal text-[16px] transition duration-250 " +
              (isActive ? "text-indigo-300 font-bold" : "hover:text-indigo-200")
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/results" 
            className={({ isActive }) =>
              "px-3 font-normal text-[16px] transition duration-250 " +
              (isActive ? "text-indigo-300 font-bold" : "hover:text-indigo-200")
            }
          >
            Results
          </NavLink>
          <NavLink
            to="/docs/design-philosophy"
            className={({ isActive }) =>
              "px-3 font-normal text-[16px] transition duration-250 " +
              (isActive ? "text-indigo-300 font-bold" : "hover:text-indigo-200")
            }
          >
            Docs
          </NavLink>      
        </div>
        <div className="w-px h-8 bg-zinc-500 mx-2"></div>
        <a href="https://github.com/WiNg4205/LabBot/tree/main" target="_blank" rel="noopener noreferrer">
          <svg id="Github-Logo" className="size-6 mx-2 text-zinc-300 hover:text-white transition duration-300" viewBox="0 0 98 96" width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/></svg>
        </a>
        <a href="https://discord.com/oauth2/authorize?client_id=1111800916589432906&permissions=8&integration_type=0&scope=bot" target="_blank" rel="noopener noreferrer">
          <svg id="Discord-Logo" className="size-6 mx-2 text-zinc-300 hover:text-white transition duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 126.644 96"><path id="Discord-Symbol-Blurple" className="cls-1" d="M81.15,0c-1.2376,2.1973-2.3489,4.4704-3.3591,6.794-9.5975-1.4396-19.3718-1.4396-28.9945,0-.985-2.3236-2.1216-4.5967-3.3591-6.794-9.0166,1.5407-17.8059,4.2431-26.1405,8.0568C2.779,32.5304-1.6914,56.3725.5312,79.8863c9.6732,7.1476,20.5083,12.603,32.0505,16.0884,2.6014-3.4854,4.8998-7.1981,6.8698-11.0623-3.738-1.3891-7.3497-3.1318-10.8098-5.1523.9092-.6567,1.7932-1.3386,2.6519-1.9953,20.281,9.547,43.7696,9.547,64.0758,0,.8587.7072,1.7427,1.3891,2.6519,1.9953-3.4601,2.0457-7.0718,3.7632-10.835,5.1776,1.97,3.8642,4.2683,7.5769,6.8698,11.0623,11.5419-3.4854,22.3769-8.9156,32.0509-16.0631,2.626-27.2771-4.496-50.9172-18.817-71.8548C98.9811,4.2684,90.1918,1.5659,81.1752.0505l-.0252-.0505ZM42.2802,65.4144c-6.2383,0-11.4159-5.6575-11.4159-12.6535s4.9755-12.6788,11.3907-12.6788,11.5169,5.708,11.4159,12.6788c-.101,6.9708-5.026,12.6535-11.3907,12.6535ZM84.3576,65.4144c-6.2637,0-11.3907-5.6575-11.3907-12.6535s4.9755-12.6788,11.3907-12.6788,11.4917,5.708,11.3906,12.6788c-.101,6.9708-5.026,12.6535-11.3906,12.6535Z" fill="currentColor"/></svg>
        </a>
        <SignIn />
      </div>
    </div>
  </div>
}

export default Header 