const ProgressionChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  payload = payload.filter(payload => !isNaN(payload.value))
  const sorted = [...payload].sort((a, b) => b.value - a.value)

  return (
    <div className="flex flex-col whitespace-nowrap absolute 2xl:left-[650px] 2xl:top-[100px] bg-zinc-800 py-2 rounded-md border border-zinc-700">
      <span className="font-bold text-fuchsia-400 text-base px-4">{`Index`}</span>
      <div className="h-[0.5px] bg-zinc-700 px-4 w-[90%] mx-auto mt-2 mb-1"></div>
      {sorted.map(entry => (
        <p key={entry.dataKey} style={{ color: entry.color }} className="mt-1 font-normal text-base px-4">
          {entry.dataKey}: {entry.value}%
        </p>
      ))}
    </div>
  )
}

export default ProgressionChartTooltip