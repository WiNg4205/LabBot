import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { startOfMonth } from "date-fns";
import "./Calendar.css";


const Calendar = ({ dates, selectedDate, setSelectedDate }) => {
  const defaultClassNames = getDefaultClassNames();

  const prevDate = () => setSelectedDate(d => dates[Math.min(dates.indexOf(d) + 1, dates.length - 1)]);
  const nextDate = () => setSelectedDate(d => dates[Math.max(dates.indexOf(d) - 1, 0)]);

  return (
    <div className="flex items-center gap-4 h-92">
      <button onClick={prevDate}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 hover:text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <DayPicker
        key={startOfMonth(selectedDate).toISOString()}
        month={startOfMonth(selectedDate)}
        selected={selectedDate}
        mode="single"
        disableNavigation
        classNames={{
          today: "border-purple-400",
          selected: "bg-slate-700 text-white rounded",
          root: `${defaultClassNames.root} shadow-lg p-5 user-select-none self-start`,
          chevron: `${defaultClassNames.chevron} fill-slate-400`
        }}
      />

      <button onClick={nextDate}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 hover:text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default Calendar;
