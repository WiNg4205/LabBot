import { useEffect, useState, useRef } from "react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"
import { startOfMonth } from "date-fns"
import "../events/Calendar.css"

const CalendarAnimation = () => {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  const defaultClassNames = getDefaultClassNames()
  const [month, setMonth] = useState(() => {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - 3)
    return d
  })

  useEffect(() => {
    if (visible) {
      let count = 0
      const interval = setInterval(() => {
        setMonth((prev) => {
          const next = new Date(prev)
          next.setMonth(next.getMonth() + 1)
          return next
        })
        count++
        if (count >= 3) clearInterval(interval)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [visible])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true)
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`scale-35 ${visible ? "visible" : ""}`}>
      <DayPicker
        mode="single"
        month={startOfMonth(month)}
        selected={month}
        onSelect={(d) => d && setMonth(d)}
        animate
        classNames={{
          selected: "bg-fuchsia-500 text-zinc-200 rounded-full",
          month_caption: "flex justify-center items-center h-12 font-extrabold text-3xl mb-6 text-fuchsia-400",
          root: `${defaultClassNames.root} p-5 text-3xl user-select-none self-start text-zinc-300 h-48`,
          chevron: `${defaultClassNames.chevron} fill-slate-400`,
          day_button: `${defaultClassNames.day_button} h-10 w-10 sm:h-13 sm:w-13 rounded-full border-2 border-transparent md:w-16 md:h-16`,
        }}
      />
    </div>
  )
}

export default CalendarAnimation
