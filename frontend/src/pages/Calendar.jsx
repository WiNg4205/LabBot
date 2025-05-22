import { useEffect, useRef } from "react"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

const Calendar = () => {
  const inputRef = useRef(null)
  const fpInstance = useRef(null)

  useEffect(() => {
    fpInstance.current = flatpickr(inputRef.current, {
      inline: true,
      onReady: (selectedDates, dateStr, instance) => {
        instance.input.style.display = "none"
      },
      dateFormat: "Y-m-d"
    })
    return () => {
      fpInstance.current.destroy()
    }
  }, [])

  return <>
    <h1>Calendar</h1>
    <input ref={inputRef} />
  </>
}

export default Calendar

