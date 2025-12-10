import { useAvatars } from "../../context/AvatarsContext"
import ResultsDropdown from "./ResultsDropdown"
import ResultsStats from "./ResultsStats"
import { useState } from "react"
import BottomArrow from "../../assets/bottom-arrow.svg"

const ResultsData = ({ games, numGames, setNumGames, hide, setHide }) => {
  const getAvatars = useAvatars() || []
  const [selectedGame, setSelectedGame] = useState(null)

  const handleShowMore = () => {
    if (numGames + 20 >= games.length) {
      setHide(true)
    } 
  
    setNumGames(prev => prev + 20)    
  }

  return (
    <div className="flex flex-col w-full md:w-[55%] box-border">
      <h2 className="text-xl font-extrabold my-4">RECENT GAMES</h2>
      {getAvatars.length <= 0 ? (
        Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex justify-between animate-pulse mb-1 rounded-md min-h-24 max-h-24 bg-zinc-800">
            <div className="flex justify-start">
              <div className="border-l-6 border-l-zinc-500 min-h-24 max-h-24"></div>
              <div className="flex flex-col justify-center space-y-2 p-4">
                <div className="h-3.5 w-10 rounded-md bg-zinc-700"></div>
                <div className="h-3.5 w-20 rounded-md bg-zinc-700"></div>
              </div>
            </div>
      
            <div className="flex pl-2">
              <div className="grid grid-flow-col grid-rows-3 gap-6 items-center py-4 justify-end">
                {Array.from({ length: 6 }).map((_, j) => (
                  <div key={j} className="flex gap-x-2 min-w-28 max-w-28">
                    <div className="rounded-full size-6 bg-zinc-700"></div>
                    <div className="h-3.5 mt-1.5 w-12 rounded-md bg-zinc-700"></div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-end bg-[#42424a] px-2 sm:px-3 py-2 rounded-tr-md rounded-br-md cursor-pointer">
                <img className="size-3" src={BottomArrow} alt="arrow"></img>
              </div>
            </div>
          </div>
        ))
      ) : (
        games.map((game, index) => 
          index < numGames && (
            <div key={index} className="flex flex-col">
              <div className="flex bg-zinc-800 rounded-md border-l-6 border-l-zinc-500 min-h-24 max-h-24 mb-1">
                <div className="flex flex-1 justify-between pl-4 py-4">
                  <div className="flex flex-col justify-center">
                    <p className="text-sm font-bold text-slate-100">{game.game.charAt(0).toUpperCase() + game.game.slice(1)}</p>
                    <p className="text-sm text-slate-400">{new Date(game.date).toLocaleDateString()}</p>
                  </div>
                  <div className="grid grid-flow-col grid-rows-3 gap-6 items-center">
                    {Object.entries(game.results).map((result, index) => (
                      <a key={index} className="flex gap-x-2 w-20 sm:w-28" href={`/players/${result[0]}`} aria-disabled="true">
                        <img src={getAvatars.find(avatar => avatar.username === result[0])["avatar"]} alt="avatar" className="rounded-full size-6" />
                        <span className="text-sm truncate py-0.5">{result[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <ResultsDropdown id={index} selectedGame={selectedGame} setSelectedGame={setSelectedGame}/>
              </div>
              <ResultsStats id={index} selectedGame={selectedGame} game={game} />
            </div>
          )
        )
      )}
      <div className={`flex justify-center items-center bg-zinc-800 rounded-md py-3 border-[0.5px] border-[#424254] cursor-pointer mb-1 hover:bg-[#2f2f33] ${hide ? "hidden" : "block"}`} onClick={handleShowMore}>
        <span className="text-sm text-slate-100" >Show more</span>
      </div>
    </div>
  )
}

export default ResultsData  