import { useAvatars } from "../context/AvatarsContext"
import { useGames } from "../context/GamesContext"
import { useState, useEffect } from "react"
import GamesHeader from "../components/ResultsHeader"
import ResultsLeaderboard from "../components/ResultsLeaderboard"
import ResultsData from "../components/ResultsData"

const Results = () => {
  const getAvatars = useAvatars() || []
  function handleClick(e) {
    const gameType = e.target.id
    setGames(gameType)
  }  

  const [game, setGames] = useState("all")
  const [filteredGames, setFilteredGames] = useState([])
  const getGames = useGames()
  getGames.sort((a, b) => new Date(b.date) - new Date(a.date)) 

  useEffect(() => {
    if (game === "all") {
      setFilteredGames(getGames)
      return
    }

    const filteredGames = getGames.filter(g => g.game === game) 
    setFilteredGames(filteredGames)
  }, [game, getGames])

  return <>
    <div className="flex">
      <div className="flex flex-col w-5xl">
        <GamesHeader handleClick={handleClick}/>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-2/5 mr-2">
            <h2 className="text-2xl tracking-wider font-extrabold my-2">LEADERBOARD</h2>


            <div className="flex items-center">
              <span className="w-8">1st</span>
              <div>{ getAvatars.length > 0 && <img src={getAvatars[4]["avatar"]} alt="Avatar" className="rounded-full size-9 ml-4" /> }</div>
              <span className="ml-4 font-semibold">{ getAvatars.length > 0 && getAvatars[4]["username"] }</span>
            </div>
            <div className="my-2"></div>
            <div className="flex items-center">
              <span className="w-8">2nd</span>
              <div>{ getAvatars.length > 0 && <img src={getAvatars[1]["avatar"]} alt="Avatar" className="rounded-full size-9 ml-4" /> }</div>
              <span className="ml-4 font-semibold">{ getAvatars.length > 0 && getAvatars[1]["username"] }</span>
            </div>


            <div className="flex bg-zinc-800 rounded-md">
              
            </div>
          </div>
          <div className="flex flex-col w-3/5">
            <h2 className="text-2xl tracking-wider font-extrabold my-2">RESULTS</h2>
            <div className="flex bg-zinc-800 rounded-md">
              Test
            </div>
          </div>
          <ResultsLeaderboard game={game}/>
          <ResultsData games={filteredGames}/>
        </div>
      </div>
    </div>
  </>
}

export default Results
