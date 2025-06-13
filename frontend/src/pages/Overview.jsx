import Chart from "../components/Chart"
import useSWR from "swr"
import fetcher from "../../fetcher"

const Overview = () => {
  const { data: winrate } = useSWR("../api/winrate", fetcher);
  return <div className="mt-40 flex flex-col items-center">
    <h1 className="font-semibold text-8xl text-slate-100">LabBot</h1>
    <p className="mt-8 text-4xl text-slate-400">A private server discord bot built using&nbsp;
      <a href="https://discord.js.org" target="_blank" rel="noopener" className="font-bold">discord.js</a>
    </p>
    {winrate && <Chart winrate={winrate} />}
  </div>
}

export default Overview
