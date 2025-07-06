import { useData } from "../context/DataContext"
import { useState, useEffect } from "react"
import ResultsHeader from "../components/results/ResultsHeader"
import ResultsLeaderboard from "../components/results/ResultsLeaderboard"
import ResultsData from "../components/results/ResultsData"
import ResultsStreak from "../components/results/ResultsStreak"
import { useSearchParams } from "react-router-dom"


const Results = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredGames, setFilteredGames] = useState([])
  const data = useData()
  const getGames = data.games
  getGames.sort((a, b) => new Date(b.date) - new Date(a.date)) 

  useEffect(() => {
    setSearchParams(`game=${searchParams.get("game") || "all"}`)
  }, [searchParams, setSearchParams])

  useEffect(() => {
    if (searchParams.get("game") === "all") {
      setFilteredGames(getGames)
      return
    }

    const filteredGames = getGames.filter(g => g.game === searchParams.get("game")) 
    // console.log("Filtered Games: ", filteredGames)
    setFilteredGames(filteredGames)
  }, [getGames, searchParams, setSearchParams])

  return <>
    <div className="flex">
      <div className="flex flex-col w-5xl">
        <ResultsHeader selected={searchParams.get("game")} setSelected={setSearchParams}/>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-2/5 mr-8">
            <ResultsLeaderboard gameType={searchParams.get("game") || "all"}/>
            <ResultsStreak/>
          </div>
          <ResultsData games={filteredGames}/>
        </div>
      </div>
    </div>
  </>
}

export default Results
