import { useGames } from "../context/GamesContext"
import { useState, useEffect } from "react"
import GamesHeader from "../components/results/ResultsHeader"
import ResultsLeaderboard from "../components/results/ResultsLeaderboard"
import ResultsData from "../components/results/ResultsData"

const Results = () => {

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
    console.log("Filtered Games: ", filteredGames)
    setFilteredGames(filteredGames)
  }, [game, getGames])

  return <>
    <div className="flex">
      <div className="flex flex-col w-5xl">
        <GamesHeader handleClick={handleClick}/>
        <div className="flex flex-row w-full">
          <ResultsLeaderboard gameType={game}/>
          <ResultsData games={filteredGames}/>
        </div>
      </div>
    </div>
  </>
}

export default Results
