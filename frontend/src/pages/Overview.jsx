import { useState } from "react"
import OverviewChart from "../components/OverviewChart"
import ProgressionChart from "../components/ProgressionChart"
import { useWinrates } from "../context/WinratesContext"

const Overview = () => {
  const winrates = useWinrates()
  const [toggle, setToggle] = useState("total")
  return <div className="mt-40 flex flex-col items-center">
    <h1 className="font-semibold text-8xl text-slate-100">LabBot</h1>
    <p className="mt-8 text-4xl text-slate-400">A private server discord bot built using&nbsp;
      <a href="https://discord.js.org" target="_blank" rel="noopener" className="font-bold">discord.js</a>
    </p>
    {winrates && (
    <div className="mt-20 flex gap-20 items-center">
      <div>
        <div className="flex gap-2">
          <button onClick={() => setToggle("total")} className={toggle === "total" ? 'text-fuchsia-300 font-bold' : ''}>Total</button>
          <button onClick={() => setToggle("pool")} className={toggle === "pool" ? 'text-fuchsia-300 font-bold' : ''}>Pool</button>
          <button onClick={() => setToggle("bowling")} className={toggle === "bowling" ? 'text-fuchsia-300 font-bold' : ''}>Bowling</button>
          <button onClick={() => setToggle("cards")} className={toggle === "cards" ? 'text-fuchsia-300 font-bold' : ''}>Cards</button>
        </div>      
        <OverviewChart winrate={winrates[toggle][winrates[toggle].length - 1]} />        
      </div>

      <ProgressionChart winrate={winrates[toggle]} />
    </div>
    )}
  </div>
}

export default Overview
