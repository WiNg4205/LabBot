import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "./Calendar.css";

const Calendar = () => {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      animate
      mode="single"
      classNames={{
        today: `border-purple-400`, // Add a border to today's date
        selected: `bg-slate-700 text-white rounded`, // Highlight the selected day
        root: `${defaultClassNames.root} shadow-lg p-5 user-select-none`, // Add a shadow to the root element
        chevron: `${defaultClassNames.chevron} fill-slate-400` // Change the color of the chevron
      }}
    />
  );
}

export default Calendar
