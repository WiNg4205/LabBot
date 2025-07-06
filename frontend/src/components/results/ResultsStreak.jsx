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
          <div class="rank-1-bg border rounded-2xl p-6 relative overflow-hidden transition-all duration-400 ease-out min-w-32 text-center scale-110">
            <div class="absolute inset-0 w-full h-full rounded-full glow-gold opacity-60 pointer-events-none transition-opacity duration-300"></div>
              <img class="size-14 mx-auto mb-3 rounded-full" src={getAvatars[0].avatar}/>
              <div class="text-base font-semibold text-white mb-2 tracking-tight">Joseph</div>
              <div class="text-3xl font-extrabold leading-none rank-1-text">2</div>
          </div>
       </div>
      )}
    </div>
  )
}

export default ResultsStreak