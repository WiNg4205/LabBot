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
    <LineChart width={600} height={400} data={data}>
      <XAxis dataKey={(_, index) => index} />
      <YAxis />
      <Tooltip
        position={{ x: 650, y: 100 }}
        content={({ payload, label, active }) => {
          if (active && payload && payload.length) {
            const sorted = [...payload].sort((a, b) => b.value - a.value);
            return (
              <div style={{ backgroundColor: 'white', padding: 10, border: '1px solid #ccc' }}>
                <p>{`Index: ${label}`}</p>
                {sorted.map((entry) => (
                  <p key={entry.dataKey} style={{ color: entry.color }}>
                    {entry.dataKey}: {entry.value}
                  </p>
                ))}
              </div>
            );
          }
          return null;
        }}
      />
      <Legend />
      <Line type="monotone" dataKey="William" stroke="#1f77b4" dot={false} />
      <Line type="monotone" dataKey="Kevin" stroke="#ff7f0e" dot={false} />
      <Line type="monotone" dataKey="Brian" stroke="#2ca02c" dot={false} />
      <Line type="monotone" dataKey="Winson" stroke="#d62728" dot={false} />
      <Line type="monotone" dataKey="Jeremy" stroke="#9467bd" dot={false} />
      <Line type="monotone" dataKey="Joseph" stroke="#8c564b" dot={false} />
    </LineChart>
  </>
}

export default ProgressionChart