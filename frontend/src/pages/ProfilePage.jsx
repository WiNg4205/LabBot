import { useParams } from 'react-router-dom';
import { useAvatars } from "../context/AvatarsContext"
import { useData } from "../context/DataContext"

const ProfilePage = () => {
  const { name } = useParams()
  const getAvatars = useAvatars() || []

  const data = useData()
  const getWinrates = data.resultHistory
  getWinrates['total'].at(-1).sort((a, b) => b.winRate - a.winRate)
  const overallRank = getWinrates['total'].at(-1).findIndex(player => player.name === name)
  const overallPlayerData = getWinrates['total'].at(-1).find(player => player.name === name)
    
  const playerDataByGame = {}
  const games = ['pool', 'bowling', 'cards']
  games.forEach(game => {
    const player = getWinrates[game].at(-1).find(player => player.name === name)
    getWinrates[game].at(-1).sort((a, b) => b.winRate - a.winRate)
    const rank = getWinrates[game].at(-1).findIndex(player => player.name === name)
    playerDataByGame[game] = { ...player, rank }
  })
  
  let numOutings = 0
  let numWins = 0
  let currDate = Date.now()
  data.games.forEach(game => {
    if (Object.keys(game.results).includes(name) && currDate !== game.date) {
      numOutings += 1
    }
    if (Object.keys(game.results).includes(name) && game.results[name] === 1) {
      numWins += 1
    }
    currDate = game.date
  })

  return (
    <>
      {getAvatars.length > 0 && (
        <div className="flex flex-col w-6xl mt-2">
          <div className="flex flex-col bg-zinc-800 items-center justify-center w-6xl rounded-md p-4 border border-zinc-700">
            <img src={getAvatars.find(avatar => avatar.username === name)?.avatar} alt="avatar" className="rounded-full size-24 border-[#efefef] border-3 mb-4" />
            <span className="text-2xl text-slate-100 font-bold tracking-wide">{name}</span>
            <span className="text-sm text-[#c89b3c] font-semibold">Rank #{overallRank + 1}</span>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-extrabold my-4">OVERALL PERFORMANCE</h2>
            <div className="flex bg-zinc-800 rounded-md border border-zinc-700 p-6">
              <div className="flex gap-6 w-full">
                <div className="flex rounded-md p-8 text-center border border-[#c89b3c] shadow-md shadow-[#c89b3c]/20 bg-[#c89b3c26] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-md"></div>
                  <span className="absolute flex size-3 -top-1 -right-1">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c89b3c] opacity-75"></span>
                    <span className="inline-flex size-3 rounded-full bg-[#c89b3c]"></span>
                  </span>
                  <div className="flex flex-col justify-center h-full">
                    <span className="font-extrabold text-3xl text-slate-100 pb-2">{numWins}</span>
                    <span className="text-sm text-slate-400 font-bold tracking-wider px-8">🏆 ALL-TIME WINS</span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-6">
                  <div className="flex flex-1 flex-col items-center bg-[#424248] rounded-md p-6 text-center border border-zinc-600 hover:border-fuchsia-400 shadow-md shadow-[#424248]/50">
                    <span className="font-extrabold text-2xl text-slate-100 pb-1">{overallPlayerData.winRate}%<br/></span>
                    <span className="text-sm text-slate-400 font-semibold tracking-wider">WIN RATE</span>
                  </div>
                  <div className="flex flex-1 flex-col items-center bg-[#424248] rounded-md p-6 text-center border border-zinc-600 hover:border-fuchsia-400 shadow-md shadow-[#424248]/50">
                    <span className="font-extrabold text-2xl text-slate-100 pb-1">{overallPlayerData.numGames}<br /></span>
                    <span className="text-sm text-slate-400 font-semibold tracking-wider">TOTAL GAMES</span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-6">
                  <div className="flex flex-1 flex-col items-center bg-[#424248] rounded-md p-6 text-center border border-zinc-600 hover:border-fuchsia-400 shadow-md shadow-[#424248]/50">
                    <span className="font-extrabold text-2xl text-slate-100 pb-1">{overallPlayerData.points.toFixed(2)}<br/></span>
                    <span className="text-sm text-slate-400 font-semibold tracking-wider">TOTAL POINTS</span>
                  </div>
                  <div className="flex flex-1 flex-col items-center bg-[#424248] rounded-md p-6 text-center border border-zinc-600 hover:border-fuchsia-400 shadow-md shadow-[#424248]/50">
                    <span className="font-extrabold text-2xl text-slate-100 pb-1">{numOutings}<br /></span>
                    <span className="text-sm text-slate-400 font-semibold tracking-wider">OUTINGS</span>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-extrabold my-4">GAME PERFORMANCE</h2>
            <div className="flex flex-col bg-zinc-800 rounded-md border border-zinc-700 p-6 gap-6">
              {Object.entries(playerDataByGame).map(([game, player], index) => (
                <div key={index} className="flex justify-between items-center bg-[#424248] rounded-md py-3 pl-3 border border-zinc-600 hover:border-fuchsia-400 shadow-md shadow-[#424248]/50">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center bg-fuchsia-400 rounded-md p-2 mr-2">
                      <span>
                        {game === 'pool' && '🎱'}
                        {game === 'bowling' && '🎳'}
                        {game === 'cards' && '🃏'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-100 font-semibold">{game.charAt(0).toUpperCase() + game.slice(1)}</span>
                      <span className="text-sm text-slate-400 font-normal">{player.numGames} games played</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <span className="text-lg font-bold text-slate-100">{player.winRate}%</span>
                    <div className="flex item-center justify-center bg-[#c89b3c26] border border-[#c89b3c] rounded-md p-1 mr-2">
                      <span className="text-sm text-[#c89b3c]">#{player.rank + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfilePage