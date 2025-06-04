import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { useGames } from "./context/GamesContext"
import { usePlayers } from "./context/PlayersContext"
import { useOutings } from "./context/OutingsContext"

const Layout = () => {
  const getPlayers = usePlayers()
  const getOutings = useOutings()
  const getGames = useGames()

  console.log(getPlayers)
  console.log(getOutings)
  console.log(getGames)

  return <div className="flex flex-col items-center bg-slate-900 text-slate-300 min-h-screen">
    <Header />
    <Outlet />
  </div>
}

export default Layout