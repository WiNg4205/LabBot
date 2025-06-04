import { createContext, useContext, useState, useEffect } from "react"
import useSWR from "swr"
import fetcher from "../../fetcher"

const PlayersContext = createContext(undefined)
const InitPlayersContext = createContext(undefined)

const usePlayers = () => {
  return useContext(PlayersContext)
}

const useInitPlayers = () => {
  return useContext(InitPlayersContext)
}

const PlayersProvider = ({ children }) => {
  const { data: playersData } = useSWR("../api/players", fetcher)
  const [Players, setPlayers] = useState(null)

  useEffect(() => {
    if (playersData) {
      setPlayers(playersData)
    }
  }, [playersData])

  return (
    <PlayersContext.Provider value={Players}>
      <InitPlayersContext.Provider value={setPlayers}>
        {children}
      </InitPlayersContext.Provider>
    </PlayersContext.Provider>
  )
}

export default PlayersProvider
export { usePlayers, useInitPlayers }
