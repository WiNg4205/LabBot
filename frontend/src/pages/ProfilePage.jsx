import { useParams } from 'react-router-dom';
import { useAvatars } from "../context/AvatarsContext"
import { useData } from "../context/DataContext"

const ProfilePage = () => {
  const { name } = useParams()
  const getAvatars = useAvatars() || []

  const data = useData()
  const getWinrates = data.resultHistory
  getWinrates['total'].at(-1).sort((a, b) => b.winRate - a.winRate)
  const rank = getWinrates['total'].at(-1).findIndex(player => player.name === name)

  return (
    <div className="flex flex-col w-5xl mt-2">
      <div className="flex flex-col bg-zinc-800 items-center justify-center w-5xl rounded-md p-4 border border-zinc-700">
        <img src={getAvatars.find(avatar => avatar.username === name)?.avatar} alt="avatar" className="rounded-full size-24 border-[#efefef] border-3 mb-4" />
        <span className="text-2xl text-slate-100 font-bold tracking-wide">{name}</span>
        <span className="text-sm text-slate-400">Rank #{rank + 1}</span>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col w-1/2">
          <h2 className="text-xl font-extrabold my-4">GAME PERFORMANCE</h2>
          <div className="flex bg-zinc-800 rounded-md border border-zinc-700 p-4">
            <span className="text-md  text-slate-100">Overall Performance</span>
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <h2 className="text-xl font-extrabold my-4">OVERALL PERFORMANCE</h2>
          <div className="flex bg-zinc-800 rounded-md border border-zinc-700 p-4">
            <span className="text-md text-slate-100">Game Performance</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage