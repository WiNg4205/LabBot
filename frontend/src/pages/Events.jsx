import Calendar from "../components/Calendar"
import EventData from "../components/EventData"
import { useOutings } from "../context/OutingsContext"
import { useGames } from "../context/GamesContext"
import { useState, useEffect } from "react"

const Events = () => {
  const getOutings = useOutings()
  const getGames = useGames()
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedOuting, setSelectedOuting] = useState(null)
  

  
  useEffect(() => { // Initial data setup
    if (!getOutings?.length || !getGames.length || dates.length > 0) return

    
    const outingDates = getOutings.map(o => new Date(o.date)).reverse()
    setDates(outingDates)
    setSelectedDate(outingDates[0])
    const outing = getOutings.find(o =>
      new Date(o.date).toDateString() === outingDates[0].toDateString()
    )
    setSelectedOuting(outing)
    
    sessionStorage.setItem('selectedOuting', JSON.stringify(outing))
  }, [getOutings, getGames])


  useEffect(() => {
    const outing = getOutings.find(o =>
      new Date(o.date).toDateString() === selectedDate.toDateString()
    )
    setSelectedOuting(outing)      
  }, [selectedDate])

  if (!getOutings?.length || !getGames.length) return
  return (
    <div className="flex gap-24">
      {selectedOuting && (
        <>
          <Calendar dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <EventData selectedOuting={selectedOuting} />
        </>
      )}
    </div>
  )
}

export default Events
