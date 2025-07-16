import { Link } from 'react-router-dom'

const Commands = () => {
  return (
    <div className="w-full min-h-screen flex bg-white text-gray-800 font-sans">
      {/* Left Sidebar (thinner) */}
      <aside className="w-50 bg-gray-100 p-4 sticky top-0 h-screen overflow-auto border-r hidden md:block">
        <nav className="space-y-4">
          <h2 className="text-lg font-bold mb-3">Introduction</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/docs/design-philosophy" className="text-black-100 hover:text-blue-800">Design Philosophy</Link></li>
            <li><Link to="/docs/installation" className="text-black-100 hover:text-blue-800">Installation + Setup</Link></li>
            <li><Link to="/docs/commands" className="text-indigo-600 font-semibold hover:text-blue-800">Commands</Link></li>
            <li><Link to="/docs/game-instructions" className="text-black-100 hover:text-blue-800">Game Instructions</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content (expanded) */}
      <main className="flex-1 p-8 ml-12 mr-12 mt-4">
        <h3 className="font-bold text-3xl mb-12">Commands</h3>
        <hr className="my-4 border-t-2 border-gray-200" />

        <section id="design-philosophy" className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <p>Instructions on how to get started...</p>
        </section>

        <section id="installation" className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">installation</h2>
          <h3 id="fast" className="text-xl font-medium mt-4">Fast game-instructions</h3>
          <p>Details on speed...</p>
          <h3 id="hmr" className="text-xl font-medium mt-4">Hot Module Replacement</h3>
          <p>Details on HMR...</p>
        </section>

        <section id="commands" className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">commands</h2>
          <p>commands options...</p>
        </section>

        <section id="game-instructions">
          <h2 className="text-2xl font-semibold mb-2">game-instructions</h2>
          <p>game-instructions instructions...</p>
        </section>
      </main>

      {/* Right Sidebar (thinner) */}
      <aside className="w-50 bg-gray-50 p-4 sticky top-0 h-screen overflow-auto border-l hidden xl:block">
        <nav className="space-y-4">
          <h2 className="text-md font-bold mb-2">On this page</h2>
          <ul className="text-sm space-y-1">
            <li><a href="#design-philosophy" className="text-gray-500 hover:text-gray-900">Design Philosophy</a></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Commands;
