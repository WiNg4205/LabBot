import { DayPicker, getDefaultClassNames } from "react-day-picker"
import { startOfMonth } from "date-fns"
import "./Calendar.css"


const Calendar = ({ dates, selectedDate, setSelectedDate }) => {
  const defaultClassNames = getDefaultClassNames()

  const prevDate = () => setSelectedDate(d => dates[Math.min(dates.indexOf(d) + 1, dates.length - 1)]);
  const nextDate = () => setSelectedDate(d => dates[Math.max(dates.indexOf(d) - 1, 0)]);

  return (
    <div className="flex justify-center items-center gap-0 md:gap-4 md:h-120">
      <button onClick={prevDate}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 md:size-12 hover:text-fuchsia-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <DayPicker
        animate
        mode="single"
        month={startOfMonth(selectedDate)}
        selected={selectedDate}
        className="custom-animate"
        classNames={{
          selected: "bg-fuchsia-500 text-zinc-200 rounded-full",
          month_caption: "flex justify-center items-center h-12 font-extrabold text-xl md:text-3xl md:mb-6 text-fuchsia-400",
          root: `${defaultClassNames.root} px-3 md:p-5 text-[18px] md:text-3xl user-select-none self-start text-zinc-300`,
          chevron: `${defaultClassNames.chevron} fill-slate-400`,
          day: `${defaultClassNames.day} text-[18px] md:text-[20px]`,
          day_button: `${defaultClassNames.day_button} h-10 w-10 sm:h-13 sm:w-13 rounded-full border-2 border-transparent md:w-16 md:h-16`,
        }}
      />

      <button onClick={nextDate}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 md:size-12 hover:text-fuchsia-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default Calendar
