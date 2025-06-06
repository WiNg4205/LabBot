import Calendar from "../components/Calendar"
import EventData from "../components/EventData"
import { useOutings } from "../context/OutingsContext"
import { useState, useEffect } from "react"

const Events = () => {
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const getOutings = useOutings()
  const selectedOuting = getOutings?.find(o =>
    new Date(o.date).toDateString() === selectedDate.toDateString()
  )

  useEffect(() => {
    if (getOutings) {
      const outingDates = getOutings.map(o => new Date(o.date)).reverse()
      setDates(outingDates)
      setSelectedDate(outingDates[0] || null)
    }
  }, [getOutings])

  return <div className="flex gap-24">
    <Calendar dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    <EventData selectedOuting={selectedOuting} />
  </div>
}

export default Events 
