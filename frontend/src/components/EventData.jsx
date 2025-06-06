import { useGames } from "../context/GamesContext"
import EventGames from "./EventGames"

const EventData = ({ selectedOuting }) => {
  if (!selectedOuting) return null
    const getGames = useGames()
    const games = selectedOuting.games
    ? selectedOuting.games.map(id => getGames.find(g => g._id === id)).filter(Boolean)
    : []

  return (
    <div className="w-96 h-72 border mt-8">
      <p><b>Time:</b> {new Date(selectedOuting.date).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' })}</p>
      <p><b>Restaurant:</b> {selectedOuting.placesWent}</p>
      <p><b>People:</b> {selectedOuting.people}</p>
      <div><b>Results:</b> { selectedOuting.games.length !== 0 ? <EventGames games={games} /> : 'N/A' }</div>
    </div>
  )
}

export default EventData
