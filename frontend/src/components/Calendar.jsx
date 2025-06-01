import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { addMonths, subMonths } from "date-fns";
import "./Calendar.css";

const Calendar = () => {
  const [month, setMonth] = useState(new Date());
  const defaultClassNames = getDefaultClassNames();

  return (
    <div className="flex items-start gap-4">
      <button onClick={() => setMonth(subMonths(month, 1))}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 mt-48 hover:text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      <DayPicker
        month={month}
        onMonthChange={setMonth}
        animate
        mode="single"
        disableNavigation
        classNames={{
          today: "border-purple-400",
          selected: "bg-slate-700 text-white rounded",
          root: `${defaultClassNames.root} shadow-lg p-5 user-select-none`,
          chevron: `${defaultClassNames.chevron} fill-slate-400`
        }}
      />

      <button onClick={() => setMonth(addMonths(month, 1))}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 mt-48 hover:text-purple-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default Calendar;
