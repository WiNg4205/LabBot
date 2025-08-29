import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import copy from '../../assets/copy.svg'
import tick from '../../assets/tick.svg'
const Installation = () => {
  const [copied, setCopied] = useState(false)
  const [i, setI] = useState(0)

  const copyToClipboard = (content, i) => {
    navigator.clipboard.writeText(content)
    setI(i)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 500)
  }

  return (
    <div className="w-full flex bg-zinc-900 text-zinc-300">
      {/* Left Sidebar (thinner) */}
      <aside className="w-50 p-4 sticky top-0 h-screen border-r border-zinc-600 hidden md:block">
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

      {/* Main Content (expanded) */}
      <main className="flex-1 p-8 ml-12 mr-12 mt-4">
        <h3 className="font-bold text-3xl mb-12">Installation</h3>
        <hr className="my-4 border-t-2 border-gray-200" />
        <div className="text-md mb-4">This page outlines the steps to run the discord bot in a personal server.</div>
        <section id="installation">
          <div className="font-bold text-xl mb-4">1. Clone the repository</div>
          <div className="bg-zinc-800 p-4 rounded-md text-sm relative">
            <code>
              git clone <span className="text-fuchsia-400">https://github.com/WiNg4205/LabBot.git<br/></span>
              <span className="text-fuchsia-400">cd</span> project-root
            </code>
            {i === 1 && copied 
              ? <div className="absolute top-2 right-3 text-md">
                  <img src={tick} className="size-6 inline-block"/>
                  <span>Copied</span>
                </div>
              : <img src={copy} className="size-5 top-3 right-3 absolute cursor-pointer" onClick={() => copyToClipboard("git clone https://github.com/WiNg4205/LabBot.git\ncd project-root", 1)}/>
            }
          </div>
          <div className="font-bold text-xl my-4">2. Install the dependencies</div>
          <div className="bg-zinc-800 p-4 rounded-md text-sm relative">
            <code>
              npm install
            </code>
            {i === 2 && copied 
              ? <div className="absolute top-2 right-3 text-md">
                  <img src={tick} className="size-6 inline-block"/>
                  <span>Copied</span>
                </div>
              : <img src={copy} className="size-5 top-3 right-3 absolute cursor-pointer" onClick={() => copyToClipboard("npm install", 2)}/>
            }
          </div>
          <div className="font-bold text-xl my-4">3. Set up your bot's token</div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Go to <a className="text-indigo-300 underline" href="https://discord.com/developers/applications">Discord Developer Portal</a></li>
            <li>Create a new application and bot</li>
            <li>Copy the bot token into a .env file or set it as an environment variable.</li>
          </ul>
        </section>
        <section id="usage">
          <h3 className="font-bold text-2xl mt-12 mb-4">Usage</h3>
          <div>To run the bot, use the following command:</div>
           <div className="bg-zinc-800 p-4 rounded-md text-sm my-4 relative">
            <code>
              <span className="text-fuchsia-400">cd</span> backend<br/>
              <span>npm start</span>
            </code>
            {i === 3 && copied 
              ? <div className="absolute top-2 right-3 text-md">
                  <img src={tick} className="size-6 inline-block"/>
                  <span>Copied</span>
                </div>
              : <img src={copy} className="size-5 top-3 right-3 absolute cursor-pointer" onClick={() => copyToClipboard("cd backend\nnpm start", 3)}/>
            }
          </div>
        </section>
      </main>

      {/* Right Sidebar (thinner) */}
      <aside className="w-50 p-4 sticky top-0 border-l border-zinc-600 hidden xl:block">
        <nav className="space-y-4">
          <h2 className="text-lg font-bold mb-2">On this page</h2>
          <ul className="text-sm space-y-1">
            <li><a href="#installation" className="hover:text-indigo-300 px-3">Installation</a></li>
            <li><a href="#usage" className="hover:text-indigo-300 px-3">Usage</a></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Installation;
