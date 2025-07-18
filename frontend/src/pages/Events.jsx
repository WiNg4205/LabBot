import Calendar from "../components/events/Calendar"
import EventData from "../components/events/EventData"
import { useData } from "../context/DataContext"
import { useState, useEffect } from "react"

const Events = () => {
  const data = useData()
  const getOutings = data.outings
  const getGames = data.games
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedOuting, setSelectedOuting] = useState(null)
  const [outingNumber, setOutingNumber] = useState(0)

  useEffect(() => { // Initial data setup
    if (!getOutings?.length || !getGames.length || dates.length > 0) return

    
    const outingDates = getOutings.map(o => new Date(o.date)).reverse()
    setDates(outingDates)
    setSelectedDate(outingDates[0])
    const outing = getOutings.find(o =>
      new Date(o.date).toDateString() === outingDates[0].toDateString()
    )
    const index = getOutings.findIndex(o =>
      new Date(o.date).toDateString() === outingDates[0].toDateString()
    )
    setOutingNumber(index + 1)
    setSelectedOuting(outing)
    
    sessionStorage.setItem('selectedOuting', JSON.stringify(outing))
  }, [getOutings, getGames])


  useEffect(() => {
    const outing = getOutings.find(o =>
      new Date(o.date).toDateString() === selectedDate.toDateString()
    )
    const index = getOutings.findIndex(o =>
      new Date(o.date).toDateString() === selectedDate.toDateString()
    )
    setOutingNumber(index + 1)
    setSelectedOuting(outing)      
  }, [selectedDate])

  if (!getOutings?.length || !getGames.length) return
  return (
    <div className="flex gap-24 mt-[10vh]">
      {selectedOuting && (
        <>
          <Calendar dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <EventData selectedOuting={selectedOuting} outingNumber={outingNumber} />
        </>
      )}
    </div>
  )
}

export default Events
