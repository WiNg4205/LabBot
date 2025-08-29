import { NavLink } from 'react-router-dom'

const DesignPhilosophy = () => {
  return (
    <div className="w-full flex justify-center h-screen bg-zinc-900 text-zinc-300">
      {/* Left Sidebar (thinner) */}
      <aside className="w-52 p-4 fixed inset-y-12 left-0 h-screen border-r border-zinc-600 hidden md:block">
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
      <main className="flex-col w-[90rem] p-8 mt-4">
        <h3 className="font-bold text-3xl mb-12">Design Philosophy</h3>
        <hr className="my-4 border-t-2 border-gray-200 border-0.5" />

        <section id="design-philosophy" className="space-y-3">
          <div>This website draws a lot of inspiration from other platforms including Vite, Tailwind and op.gg.</div>
          <div>We aimed to create an interactive and responsive website with a dark mode aesthetic.</div>
        </section>
      </main>

      {/* Right Sidebar (thinner) */}
      <aside className="w-52 p-4 fixed inset-y-12 right-0 h-screen border-l border-zinc-600 hidden xl:block">
        <nav className="space-y-4">
          <h2 className="text-lg font-bold mb-2">On this page</h2>
          <ul className="text-sm space-y-1">
            <li><a href="#design-philosophy" className="hover:text-indigo-300">Design Philosophy</a></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default DesignPhilosophy;
