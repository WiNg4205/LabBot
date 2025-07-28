import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import CustomTooltip from './ProgressionChartTooltip'

const ProgressionChart = ({ winrate }) => {
  const data = []
  winrate.forEach(round => {
    let roundData = {}
    round.forEach(player => {
      roundData[player.name] = parseFloat(player.winRate)
    })
    data.push(roundData)
  })

  const playerNames = winrate[0].map(p => p.name)
  const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"]

  return (
    <LineChart width={600} height={428} data={data}>
      <XAxis dataKey={(_, index) => index} />
      <YAxis />
      <Tooltip
        content= {<CustomTooltip />}
      />
      <Legend verticalAlign='top' height={40} />
      {playerNames.map((name, i) => (
        <Line
          key={name}
          type="monotone"
          dataKey={name}
          stroke={colors[i % colors.length]}
          dot={false}
        />
      ))}
    </LineChart>
  )
}

export default ProgressionChart
