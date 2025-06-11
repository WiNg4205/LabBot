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
    <div className="w-96 border mt-8">
      <p><b>Time:</b> {new Date(selectedOuting.date).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })}</p>
      <p><b>Restaurant:</b> {selectedOuting.placesWent}</p>
      <p><b>People:</b> {selectedOuting.people}</p>
      <div><b>Results:</b> { selectedOuting.games.length === 0 ? 'N/A' : <EventGames games={games} /> }</div>
    </div>
  )
}

export default EventData
