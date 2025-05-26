import { LineChart, Line } from 'recharts';

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 2100, amt: 2100 },
  { name: 'Page C', uv: 500, pv: 2500, amt: 2500 },
  { name: 'Page D', uv: 200, pv: 2000, amt: 2000 },
  { name: 'Page E', uv: 450, pv: 2300, amt: 2300 },
];

const Chart = () => {
  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );
}

export default Chart
