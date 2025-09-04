import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import menu from '../../assets/menu.svg'

const Commands = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="w-full flex justify-center h-screen bg-zinc-900 text-zinc-300">
       <div className="fixed top-[57px] left-0 z-3 xl:hidden bg-zinc-900">
        <img src={menu} className="size-8 m-2 p-1 rounded-sm hover:bg-zinc-800" alt="Menu icon" onClick={ toggleMenu }/>
          {isOpen && (
            <div className="flex flex-col gap-1 z-100">
              <Link to="/docs/installation" className="flex items-center pl-4 p-3 rounded-md hover:bg-zinc-700 mx-1">
                <h1 className="text-xl font-semibold">Installation</h1>
              </Link>
              <Link to="/docs/commands" className="flex items-center pl-4 p-3 rounded-md hover:bg-zinc-700 mx-1">
                <h1 className="text-xl font-semibold">Commands</h1>
              </Link>
              <Link to="/docs/design-philosophy" className="flex items-center pl-4 p-3 rounded-md hover:bg-zinc-700 mx-1" >
                <h1 className="text-xl font-semibold">Design Philosophy</h1>
              </Link>
            </div> 
          )}
      </div>

      {/* Left Sidebar */}
      <aside className="w-52 p-4 fixed inset-y-12 left-0 h-screen border-r border-zinc-600 hidden xl:block">
        <nav className="space-y-4">
          <h2 className="text-lg font-bold mb-3">Documentation</h2>
          <div className="flex flex-col space-y-2 text-sm">
             <NavLink
              to="/docs/installation" 
              className={({ isActive }) =>
                "px-3 font-normal text-sm transition duration-250 " +
                (isActive ? "text-indigo-300 font-bold" : "hover:text-indigo-200")
              }
            >
              Installation
            </NavLink>
            <NavLink
              to="/docs/commands"
              className={({ isActive }) =>
                "px-3 font-normal text-sm transition duration-250 " +
                (isActive ? "text-indigo-300 font-bold" : "hover:text-indigo-200")
              }
            >
              Commands
            </NavLink> 
            <NavLink 
              to="/docs/design-philosophy" 
              className={({ isActive }) =>
                "px-3 font-normal text-sm transition duration-250 " +
                (isActive ? "text-indigo-300 font-bold" : "hover:text-indigo-200")
              }
            >
              Design Philosophy
            </NavLink> 
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-col p-8 mt-4 w-full lg:w-[54rem] [@media(min-width:1500px)]:w-[70rem] [@media(min-width:1900px)]:w-[90rem] ${isOpen ? "opacity-60 pointer-events-none" : ""}`}>
        <h3 className="font-bold text-3xl mb-12">Commands</h3>
        <hr className="my-4 border-t-2 border-gray-200" />

        <section id="commands" className="mb-12">
          <div className="font-bold text-2xl my-4">Basic</div>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-bold">/ping</span> - Pong</li>
            <li><span className="font-bold">/hello</span> - Replies with a personalised greeting</li>
            <li><span className="font-bold">/user</span> - Provides user information</li>
            <li><span className="font-bold">/server</span> - Provides server information</li>
            <li><span className="font-bold">/poll</span> - Polls users about their availability for the upcoming week</li>
          </ul>
          <div className="font-bold text-2xl my-4">API</div>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-bold">/inspire</span> - Fetches an inspirational quote from an API</li>
            <li><span className="font-bold">/joke</span> -  Fetches a joke from an API</li>
            <li><span className="font-bold">/weather</span> - Fetches the current weather for Sydney from an API</li>
          </ul>
          <div className="font-bold text-2xl my-4">Minigames</div>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-bold">/guess</span> - Guess a random number from 1-10</li>
            <li><span className="font-bold">/coinflip</span> - Guess a random coin flip</li>
            <li><span className="font-bold">/hangman</span> - Hangman with a single-player option too</li>
            <li><span className="font-bold">/rps</span> - Rock paper scissors</li>
          </ul>
          <div className="font-bold text-2xl my-4">Database</div>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-bold">/outing</span> - Stores details about an outing</li>
            <li><span className="font-bold">/game</span> - Stores game results, including players and their scores</li>
            <li><span className="font-bold">/winrate</span> - Displays users' overall win rates or filtered by a specific game</li>
          </ul>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside className="w-40 p-4 fixed inset-y-12 right-0 h-screen border-l border-zinc-600 hidden xl:block">
        <nav className="space-y-4">
          <h2 className="text-lg font-bold mb-2">On this page</h2>
          <ul className="text-sm space-y-1">
            <li><a href="#commands" className="hover:text-indigo-300">Commands</a></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Commands;
