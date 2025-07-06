import { useData } from "../../context/DataContext"
import { useAvatars } from "../../context/AvatarsContext"
import FireLogo from "../../assets/fire.svg"
const ResultsStreak = () => {
  const data = useData()
  const getStreaks = data.streaks
  const getAvatars = useAvatars() || []

  return (
    <div className="flex flex-col">
      <h2 className="text-xl tracking-wider font-extrabold my-4">STREAKS</h2>
      {getAvatars.length <= 0 ? (
        <div></div>
      ) : (
        <div className="flex p-6 items-center bg-zinc-800 rounded-md">
          <div className="flex flex-col items-center justify-center gap-y-0.5">
            <div className="flex relative size-10">
              <img src={getAvatars[0].avatar} className="size-10 rounded-full" alt="avatar"/>
              <img src={FireLogo} className="absolute size-8 -top-3 -right-3" alt="fire"/>
            </div>
            <div className="text-sm font-bold">Joseph</div>
            <hr className="w-8 border-1 border-zinc-900 mt-1" />
            <div className="text-sm text-slate-400">22</div>
          </div>
       </div>
      )}
    </div>
  )
}

export default ResultsStreak