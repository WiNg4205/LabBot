import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 2100, amt: 2100 },
  { name: 'Page C', uv: 500, pv: 2500, amt: 2500 },
  { name: 'Page D', uv: 200, pv: 2000, amt: 2000 },
  { name: 'Page E', uv: 450, pv: 2300, amt: 2300 },
];

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
