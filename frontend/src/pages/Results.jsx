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
  const [numGames, setNumGames] = useState(20) 
  const [hide, setHide] = useState(false)

  const data = useData()
  const getGames = data.games
  getGames.sort((a, b) => new Date(b.date) - new Date(a.date)) 

  useEffect(() => {
    setSearchParams(`game=${searchParams.get("game") || "all"}`)
    // Search params is not set on first render so this useEffect runs twice (i.e. need to check for null)
    if (searchParams.get("game") === "all" || !searchParams.get("game")) {
      setFilteredGames(getGames)
      return
    }

    const filteredGames = getGames.filter(g => g.game === searchParams.get("game")) 
    setFilteredGames(filteredGames)
  }, [getGames, searchParams, setSearchParams])

  return <>
    <div className="flex flex-col items-center w-full px-4 xl:w-6xl xl:px-0">
      <ResultsHeader selected={searchParams.get("game") || "all"} setSelected={setSearchParams} setNumGames={setNumGames} setHide={setHide}/>
      <div className="flex flex-col md:flex-row w-full">
        <div className="flex flex-col w-full md:w-[45%] md:mr-8">
          <ResultsLeaderboard gameType={searchParams.get("game") || "all"}/>
          <ResultsStreak selected={searchParams.get("game") || "all"} />
        </div>
        <ResultsData games={filteredGames} numGames={numGames} setNumGames={setNumGames} hide={hide} setHide={setHide}/>
      </div>
    </div>
  </>
}

export default Results
