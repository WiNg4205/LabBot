import { useGames } from "../context/GamesContext"
import { useState, useEffect, useRef } from "react"
import ResultsHeader from "../components/results/ResultsHeader"
import ResultsLeaderboard from "../components/results/ResultsLeaderboard"
import ResultsData from "../components/results/ResultsData"
import { useSearchParams } from "react-router-dom"

const Results = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredGames, setFilteredGames] = useState([])
  const getGames = useGames()
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
          <ResultsLeaderboard gameType={searchParams.get("game") || "all"}/>
          <ResultsData games={filteredGames}/>
        </div>
      </div>
    </div>
  </>
}

export default Results
