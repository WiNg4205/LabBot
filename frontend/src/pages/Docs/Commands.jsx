import { NavLink } from 'react-router-dom'

const Commands = () => {
  return (
    <div className="w-full min-h-screen flex bg-zinc-900 text-zinc-300">
      {/* Left Sidebar */}
      <aside className="w-50 p-4 sticky top-0 h-screen overflow-auto border-r border-zinc-600 hidden md:block">
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
      <main className="flex-1 p-8 ml-12 mr-12 mt-4">
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
      <aside className="w-50 p-4 sticky top-0 h-screen overflow-auto border-l border-zinc-600 hidden xl:block">
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
