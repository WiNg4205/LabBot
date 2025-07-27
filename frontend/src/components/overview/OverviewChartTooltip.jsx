const OverviewChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null
  const data = payload[0].payload

  return (
    <div className="bg-zinc-900/95 border border-zinc-800 rounded-md px-4 py-2">
      <div className="text-base font-bold text-fuchsia-400">{label}</div>
      <div className="text-slate-100 text-base mt-1">
        <span className="font-normal">Winrate: {(data.winRate * 1).toFixed(2)}%</span>
      </div>
    </div>
  )
}

export default OverviewChartTooltip