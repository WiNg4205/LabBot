import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const OverviewChart = ({ winrate }) => {
  const sortedData = [...winrate].sort((a, b) => b.winRate - a.winRate)
  return <>
    <BarChart layout="vertical" width={400} height={400} data={sortedData} barCategoryGap={12}>
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Bar dataKey="winRate" fill="#8884d8" />
    </BarChart>
  </>
}

export default OverviewChart
