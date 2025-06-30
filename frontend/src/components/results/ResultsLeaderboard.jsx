import { useAvatars } from "../../context/AvatarsContext"
import { useWinrates } from "../../context/WinratesContext"
import { useState, useEffect } from "react" 
import names from "../../utility/names"

const ResultsLeaderboard = ({ gameType }) => {

  const getAvatars = useAvatars() || []
  const getWinrates = useWinrates()
  const [winrates, setWinrates] = useState([])
  
  useEffect(() => {
    if (!getWinrates || getWinrates?.length < 0) return

    if (gameType === 'all') {
      setWinrates(getWinrates['total'].at(-1).sort((a, b) => b.winRate - a.winRate))
    } else {
      setWinrates(getWinrates[gameType].at(-1).sort((a, b) => b.winRate - a.winRate))
    }

  }, [gameType, getWinrates])

  return (
    <div className="flex flex-col">
      <h2 className="text-xl tracking-wider font-extrabold my-4">LEADERBOARD</h2>
        {getAvatars.length <= 0 ? (
          <div className="flex flex-col bg-zinc-900 gap-[2px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center rounded-md animate-pulse bg-zinc-800 h-[54px]">
                <div className="flex items-center py-1 pl-4">
                  <div className={`size-12 p-[3px] rounded-full bg-zinc-800 ${
                    i <= 2 ? "border-3 border-zinc-700"
                    : ""
                  }`}></div>
                  <div className="ml-4 bg-zinc-700 rounded-full size-9"></div>
                  <span className="ml-4 text-sm font-bold w-16 h-3.5 bg-zinc-700 rounded-md"></span>
                </div>
                <span className="mr-4 w-12 h-3.5 bg-zinc-700 rounded-md"></span>
              </div>
            ))}
          </div>
      ) : (
        <div className="flex flex-col bg-zinc-900 gap-[2px]">
        {winrates.map((player, index) => (
          <div key={index} className={`flex justify-between items-center rounded-md ${
              index === 0 ? "border-l-[#b48811] bg-gradient-to-r from-[#63593e] from-[0%] to-zinc-800 to-30%"
              : index === 1 ? "border-l-[#8E8D8D] bg-gradient-to-r from-[#5f5f5f] from[0%] to-zinc-800 to-30%"
              : index === 2 ? "border-l-[#895E1A] bg-gradient-to-r from-[#5f4c30] from-[0%] to-zinc-800 to-30%"
              : "bg-zinc-800"
            }`}
          >
            <div className="flex items-center py-1 pl-4">
              <div className={`rounded-full p-[3px] ${
                  index === 0 ? "bg-gradient-to-b from-[#ebd197] from-30% via-[#b48811] via-50% to-[#a2790d] to-90%"
                  : index === 1 ? "bg-gradient-to-b from-[#B3B6B5] from-30% via-[#8E8D8D] via-50% to-[#656564] to-90%"
                  : index === 2 ? "bg-gradient-to-b from-[#B08D57] from-30% via-[#895E1A] via-50% to-[#804A00] to-90%"
                  : ""
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center ${
                  index <= 2 ? "bg-zinc-800 rounded-full" : ""
                  }`}
                >
                  <span className={`rounded-full p-[3px] font-bold ${
                      index === 0 ? "text-lg bg-gradient-to-b from-[#ebd197] from-30% via-[#b48811] via-70% to-[#a2790d] to-90% inline-block text-transparent bg-clip-text"
                      : index === 1 ? "text-lg bg-gradient-to-b from-[#B3B6B5] from-30% via-[#8E8D8D] via-70% to-[#656564] to-90% inline-block text-transparent bg-clip-text"
                      : index === 2 ? "text-lg bg-gradient-to-b from-[#B08D57] from-30% via-[#895E1A] via-70% to-[#804A00] to-90% inline-block text-transparent bg-clip-text" 
                      : ""
                    }`
                  }>{index + 1}</span>
                </div>
              </div>
              <div>{ getAvatars.length > 0 && <img src={getAvatars.find(avatar => avatar.username === names[player.name]).avatar} alt="Avatar" className="rounded-full size-9 ml-4" /> }</div>
              <span className="ml-4 text-sm font-bold">{ getAvatars.length > 0 && player.name }</span>
            </div>
            <span className="pr-4 text-sm text-slate-400">{player.winRate + '%'}</span>
          </div>
        ))}
      </div>
      )}
    </div>
  )
}

export default ResultsLeaderboard