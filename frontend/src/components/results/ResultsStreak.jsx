import { useData } from "../../context/DataContext"
import { useAvatars } from "../../context/AvatarsContext"
import { useState, useEffect } from "react"

const ResultsStreak = ({ selected }) => {
  const data = useData()
  const getStreaks = data?.streaks
  const streaks = getStreaks ? getStreaks[selected] : null
  const [arrayStreaks, setArrayStreaks] = useState([])
  const getAvatars = useAvatars() || []
 
  useEffect(() => {
    if (!streaks) {
      setArrayStreaks([])
      return
    }

    setArrayStreaks(Object.entries(streaks)
      .map(([name, streak]) => ({ name, streak }))
      .sort((a, b) => b.streak - a.streak))
  }, [streaks])

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-extrabold my-4">STREAKS</h2>
      {getAvatars.length <= 0 ? (
        <div className="flex">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex p-4 items-center bg-zinc-800 rounded-md w-full">
              <div className="flex flex-col p-6 justify-center items-center animate-pulse border border-[#3f3f46] rounded-2xl relative overflow-hidden min-w-32 text-center">
                <div className="size-14 mx-auto mb-5 rounded-full bg-zinc-700"></div>
                <div className="w-16 h-4 bg-zinc-700 mb-4 rounded-md"></div>
                <div className="w-5 h-[26px] bg-zinc-700 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        arrayStreaks.length >= 3 && (
          <div className="grid [@media(min-width:300px)_and_(max-width:500px)]:grid-cols-2 grid-cols-3 md:grid-cols-2 lg:grid-cols-3 w-full bg-zinc-800 rounded-md justify-items-center">
            <div className="flex p-6 items-center">
              <div className="rank-1-bg rank-1-bg:hover border rounded-2xl p-6 relative overflow-hidden transition-all duration-400 ease-out min-w-30 text-center scale-110">
                <div className="absolute inset-0 w-full h-full rounded-full glow-gold opacity-60 pointer-events-none transition-opacity duration-300"></div>
                  <img className="size-14 mx-auto mb-3 rounded-full" src={getAvatars.find(player => player.username === arrayStreaks[0].name).avatar}/>
                  <div className="text-sm font-semibold text-white mb-2 tracking-tight">{arrayStreaks[0].name}</div>
                  <div className="text-2xl font-black leading-none rank-1-text">{arrayStreaks[0].streak}</div>
              </div>
            </div>
            <div className="flex p-6 items-center">
              <div className="rank-2-bg rank-2-bg:hover border rounded-2xl p-6 relative overflow-hidden transition-all duration-400 ease-out min-w-30 text-center scale-110">
                <div className="absolute inset-0 w-full h-full rounded-full glow-silver opacity-60 pointer-events-none transition-opacity duration-300"></div>
                  <img className="size-14 mx-auto mb-3 rounded-full" src={getAvatars.find(player => player.username === arrayStreaks[1].name).avatar}/>
                  <div className="text-sm font-semibold text-white mb-2 tracking-tight">{arrayStreaks[1].name}</div>
                  <div className="text-2xl font-black leading-none rank-2-text">{arrayStreaks[1].streak}</div>
              </div>
            </div>
            <div className="flex p-6 items-center">
              <div className="rank-3-bg rank-3-bg:hover border rounded-2xl p-6 relative overflow-hidden transition-all duration-400 ease-out min-w-30 text-center scale-110">
                <div className="absolute inset-0 w-full h-full rounded-full glow-bronze opacity-60 pointer-events-none transition-opacity duration-300"></div>
                  <img className="size-14 mx-auto mb-3 rounded-full" src={getAvatars.find(player => player.username === arrayStreaks[2].name).avatar}/>
                  <div className="text-sm font-semibold text-white mb-2 tracking-tight">{arrayStreaks[2].name}</div>
                  <div className="text-2xl font-black leading-none rank-3-text">{arrayStreaks[2].streak}</div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default ResultsStreak