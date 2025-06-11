import { createContext, useContext, useState, useEffect } from "react"
import useSWR from "swr"
import fetcher from "../../fetcher"

const GamesContext = createContext(undefined)
const InitGamesContext = createContext(undefined)

const useGames = () => {
  return useContext(GamesContext)
}

const useInitGames = () => {
  return useContext(InitGamesContext)
}

const GamesProvider = ({children}) => {
  const { data: gamesData } = useSWR("../api/games", fetcher);
  const [Games, setGames] = useState([])
  useEffect(() => {
    if (gamesData) {
      setGames(gamesData)
    }
  }, [gamesData])

  return (
    <GamesContext.Provider value={Games}>
      <InitGamesContext.Provider value={setGames}>
        {children}
      </InitGamesContext.Provider>
    </GamesContext.Provider>
  )
}

export default GamesProvider
export { useGames, useInitGames }
