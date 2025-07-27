import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import CustomToolTip from './OverviewChartTooltip'

const OverviewChart = ({ winrate }) => {
  const sortedData = [...winrate].sort((a, b) => b.winRate - a.winRate)
  return <>
    <BarChart layout="vertical" width={400} height={400} data={sortedData} barCategoryGap={12}>
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" width={65} />
      <Tooltip content={<CustomToolTip />}/>
      <Bar 
        dataKey="winRate" 
        fill="#8884d8" 
        activeBar={{ fill: "#8884d8", stroke: "#6463A6", strokeWidth: 1}}
      />
    </BarChart>
  </>
}

export default OverviewChart
