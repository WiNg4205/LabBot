const OverviewChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  const data = payload[0].payload

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-md py-2">
      <div className="text-base font-bold text-fuchsia-400 px-4">{label}</div>
      <div className="h-[0.5px] bg-zinc-700 w-[90%] mx-auto mt-2 mb-1"></div>
      <div className="text-slate-100 text-base mt-1 px-4">
        <span className="font-normal">Winrate: {(data.winRate * 1).toFixed(2)}%</span>
      </div>
    </div>
  )
}

export default OverviewChartTooltip