import { Link, NavLink } from "react-router-dom"
import LabBotIcon from '../assets/flask-solid.svg'
import dots from '../assets/three-dots.svg'
import SignIn from "./SignIn"
import { useState } from "react"
import { useAvatars } from "../context/AvatarsContext"
import { useNavigate } from "react-router-dom"

const Header = () => {

  const getAvatars = useAvatars() || []
  const [filteredAvatars, setFilteredAvatars] = useState(getAvatars)
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase()
    setFilteredAvatars(getAvatars.filter(avatar =>
      avatar.username.toLowerCase().includes(searchValue)
    ))
  }

  const handleProfileClick = (e) => {
    let username
    if (e.target.tagName === 'IMG') {
      username = e.target.name
    } else if (e.target.tagName === 'SPAN') {
      username = e.target.textContent
    } else if (e.target.tagName === 'DIV') {
      username = e.target.id
    }
    navigate(`/players/${username}`)
  }

  return <div className="sticky top-0 z-50 bg-zinc-900 flex md:justify-center min-w-full border-b border-zinc-600">
    <div className="flex justify-between w-full md:w-[48rem] lg:w-[60rem] xl:w-[74rem] 2xl:w-[90rem]">
      <div className="flex items-center pl-2">
        <Link to="/" className="flex items-center">
          <img src={LabBotIcon} alt="LabBot SVG" className="size-6"/>
          <h1 className="text-xl font-semibold">LabBot</h1>
        </Link>
        <form className="max-w-md mx-auto pl-4" onSubmit={(e) => e.preventDefault()}>   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-zinc-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input autoComplete="off" type="search" id="default-search" className="outline-transparent hover:outline-indigo-300 hover:outline-1 block w-28 md:w-40 py-2 ps-10 text-sm text-slate-300 rounded-md bg-zinc-800 focus:outline-none transition duration-300" placeholder="Search" required 
              onFocus={() => {setFocused(true)}} 
              onBlur={() => setTimeout(() => setFocused(false), 100)}
              onChange={handleSearch}
            />
            {focused && (
              <div className="absolute z-10 w-28 md:w-40 mt-0.5">
                {filteredAvatars.map((avatar, id) => (
                  <div key={id} id={avatar.username} className={`flex w-full items-center py-2 pl-2 bg-zinc-800 hover:bg-zinc-900 cursor-pointer
                    ${id === 0 ? "rounded-t-md" : ""} 
                    ${id === filteredAvatars.length - 1 ? "rounded-b-md" : ""}`}
                    onClick={handleProfileClick}
                  >
                    <img src={avatar.avatar} alt={avatar.username} className="w-6 h-6 rounded-full mr-2" name={avatar.username} />
                    <span className="text-sm text-slate-300">{avatar.username}</span>
                  </div>
                ))}
              </div>
            )}
          </div>  
        </form>
      </div>
      <div className="flex items-center h-14 font-semibold">
        <div className="hidden md:flex">
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
            to="/docs/installation"
            className={({ isActive }) =>
              "px-3 font-normal text-[16px] transition duration-250 " +
              (isActive ? "text-indigo-300 font-bold" : "hover:text-indigo-200")
            }
          >
            Docs
          </NavLink>      
        </div>
        <div className="hidden md:flex w-px h-8 bg-zinc-500 mx-2"></div>
        <a className="hidden md:flex" href="https://github.com/WiNg4205/LabBot/tree/main" target="_blank" rel="noopener noreferrer">
          <svg id="Github-Logo" className="size-6 mx-2 text-zinc-300 hover:text-white transition duration-300" viewBox="0 0 98 96" width="98" height="96" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/></svg>
        </a>
        <SignIn />
        <img src={dots} alt="Dots" className="flex md:hidden size-6 mr-2 cursor-pointer rounded-sm hover:bg-zinc-700"/>
      </div>
    </div>
  </div>
}

export default Header 