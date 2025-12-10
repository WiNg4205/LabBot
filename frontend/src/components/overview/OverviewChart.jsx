import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomToolTip from './OverviewChartTooltip';

const OverviewChart = ({ winrate }) => {
  const sortedData = [...winrate].sort((a, b) => b.winRate - a.winRate);

  return (
    <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={sortedData} barCategoryGap={12}>
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={65} />
          <Tooltip content={<CustomToolTip />} />
          <Bar
            dataKey="winRate"
            fill="#8884d8"
            activeBar={{ fill: "#8884d8", stroke: "#6463A6", strokeWidth: 1 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
