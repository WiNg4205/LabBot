import { useState } from "react"
import { useData } from "../context/DataContext"
import OverviewChart from "../components/overview/OverviewChart"
import ProgressionChart from "../components/overview/ProgressionChart"
import Features from "../components/overview/Features"

const Overview = () => {
  const data = useData()
  const winrates = data.resultHistory
  const [toggle, setToggle] = useState("total")
  return <div className="mt-40 flex flex-col items-center">
    <h1 className="font-semibold text-8xl text-zinc-100">LabBot</h1>
    <p className="mt-8 text-4xl text-zinc-400">A private server discord bot built using&nbsp;
      <a href="https://discord.js.org" target="_blank" rel="noopener" className="font-bold">discord.js</a>
    </p>
    {!winrates ? (
      <div className="border-8 border-t-transparent border-white rounded-full size-12 animate-spin mt-20" />
    ) : (
      <div>
        <div className="mt-20 flex gap-20 items-center mb-20">
          <div>
            <div className="flex gap-2">
              {["total", "pool", "bowling", "cards"].map(key => (
                <button
                  key={key}
                  onClick={() => setToggle(key)}
                  className={toggle === key ? 'text-fuchsia-400 font-semibold' : ''}
                >
                  <span className="cursor-pointer hover:text-fuchsia-400">{key[0].toUpperCase() + key.slice(1)}</span>
                </button>
              ))}
            </div>
            <OverviewChart winrate={winrates[toggle].at(-1)} />
          </div>
          <ProgressionChart winrate={winrates[toggle]} />
        </div>
        <Features />
      </div>
    )}
  </div>
}

export default Overview
