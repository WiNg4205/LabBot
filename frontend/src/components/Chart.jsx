import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 2100, amt: 2100 },
  { name: 'Page C', uv: 500, pv: 2500, amt: 2500 },
  { name: 'Page D', uv: 200, pv: 2000, amt: 2000 },
  { name: 'Page E', uv: 450, pv: 2300, amt: 2300 },
];

const Chart = ({ winrate }) => {
  const sortedData = [...winrate].sort((a, b) => b.winRate - a.winRate)
  return <>
    <div className="mb-24"></div>
    <BarChart layout="vertical" width={600} height={300} data={sortedData} barCategoryGap={8}>
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Bar dataKey="winRate" fill="#8884d8" />
    </BarChart>
  </>
}

export default Chart
