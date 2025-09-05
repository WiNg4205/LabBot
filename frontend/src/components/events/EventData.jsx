import { useEffect, useState } from "react"
import { useData } from "../../context/DataContext"
import EventGames from "./EventGames"

const EventData = ({ selectedOuting, outingNumber }) => {
  const [games, setGames] = useState([])
  const [loaded, setLoaded] = useState(false)
  const data = useData()
  const getGames = data.games

  function formatTime24to12(time24) {
    if (!time24) return '';
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert '0' to '12'
    return `${hour}:${minute} ${ampm}`;
  }

  useEffect(() => {
    setGames(selectedOuting.games
      .map(id => getGames.find(g => g._id === id))
      .filter(Boolean)
    )
    setLoaded(true)
  }, [getGames, selectedOuting])
  
  if (!loaded) return
  return (
    <div className="flex flex-col w-full bg-zinc-800 rounded-xl border border-zinc-700 mb-2 px-6 sm:w-108 md:mb-0 py-4 md:px-12">
      <div className="flex flex-col h-48">
        <h1 className="self-center font-bold text-xl md:text-2xl text-fuchsia-400 mb-4">Round {outingNumber}</h1>
        <p><b>Time:</b> {formatTime24to12(selectedOuting.time)}</p>
        <p><b>Restaurant:</b> {selectedOuting.placesWent}</p>
        <p><b>People:</b> {selectedOuting.people}</p>
      </div>

      <h2 className="text-fuchsia-400 self-center font-bold mb-2 text-lg">RESULTS</h2>
      <div>{ selectedOuting.games.length === 0 ? '' : <EventGames games={games} /> }</div> 
    </div>
  )
}

export default EventData
