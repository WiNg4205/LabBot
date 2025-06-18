import { useAvatars } from "../context/AvatarsContext"
import WinratesProvider, { useWinrates } from "../context/WinratesContext"
import { useState, useEffect } from "react" 
import names from "../utility/names"

const ResultsLeaderboard = ({ gameType }) => {

  const getAvatars = useAvatars() || []
  const getWinrates = useWinrates()
  const [winrates, setWinrates] = useState([])
  
  useEffect(() => {
    if (getWinrates?.length < 0 || !getWinrates) return

    if (gameType === 'all') {
      setWinrates(getWinrates['total'].at(-1).sort((a, b) => b.winRate - a.winRate))
    } else {
      setWinrates(getWinrates[gameType].at(-1).sort((a, b) => b.winRate - a.winRate))
    }
    console.log("winrates: ", winrates)
  }, [gameType, getWinrates, winrates])

  return (
    <div className="flex flex-col w-2/5 mr-8">
      <h2 className="text-xl tracking-wider font-extrabold my-4">LEADERBOARD</h2>
      <div className="flex flex-col bg-zinc-800 rounded-md border-[0.5px] border-gray-500">
        {winrates.map((player, index) => (
          <div className="flex justify-between items-center">
            <div className="flex items-center px-2 py-4 pl-4">
              <span className="w-6">{index+1}</span>
              <div>{ getAvatars.length > 0 && <img src={getAvatars.find(avatar => avatar.username === names[player.name]).avatar} alt="Avatar" className="rounded-full size-9 ml-4" /> }</div>
              <span className="ml-4">{ getAvatars.length > 0 && player.name }</span>
            </div>
            <span className="mr-4 text-slate-400">{player.winRate + '%'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultsLeaderboard