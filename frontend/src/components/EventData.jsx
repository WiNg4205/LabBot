import { useEffect, useState } from "react"
import { useGames } from "../context/GamesContext"
import EventGames from "./EventGames"

const EventData = ({ selectedOuting }) => {
  const [games, setGames] = useState([])
  const [loaded, setLoaded] = useState(false)
  const getGames = useGames()

  useEffect(() => {
    setGames(selectedOuting.games
      .map(id => getGames.find(g => g._id === id))
      .filter(Boolean)
    )
    setLoaded(true)
  }, [selectedOuting])
  
  if (!loaded) return
  return (
    <div className="w-108 border border-zinc-600 mt-8 flex flex-col bg-zinc-800 rounded-xl py-4 px-12">
      <div className="flex flex-col h-48">
        <h1 className="self-center font-bold text-2xl text-fuchsia-400 mb-4">Round 10</h1>
        <p><b>Time:</b> {new Date(selectedOuting.date).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })}</p>
        <p><b>Restaurant:</b> {selectedOuting.placesWent}</p>
        <p><b>People:</b> {selectedOuting.people}</p>
      </div>

      <h2 className="text-fuchsia-400 self-center font-bold mb-2 text-lg">RESULTS</h2>
      <div className="">{ selectedOuting.games.length === 0 ? '' : <EventGames games={games} /> }</div> 
    </div>
  )
}

export default EventData
