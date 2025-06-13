import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'

const ProgressionChart = ({ winrate }) => {
  const data = []
  winrate.forEach(round => {
    let roundData = {}
    round.forEach((player) => {
      roundData[player.name] = player.winRate
    })
    data.push(roundData);
  })

  return <>
    <LineChart width={730} height={500} data={data}>
      <XAxis dataKey={(_, index) => index} />
      <YAxis />
      <Tooltip position={{ x: 800, y: 100 }} />
      <Legend />
      <Line type="monotone" dataKey="William" stroke="#1f77b4" />
      <Line type="monotone" dataKey="Kevin" stroke="#ff7f0e" />
      <Line type="monotone" dataKey="Brian" stroke="#2ca02c" />
      <Line type="monotone" dataKey="Winson" stroke="#d62728" />
      <Line type="monotone" dataKey="Jeremy" stroke="#9467bd" />
      <Line type="monotone" dataKey="Joseph" stroke="#8c564b" />
    </LineChart>
  </>
}

export default ProgressionChart