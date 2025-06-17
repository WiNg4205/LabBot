import { useAvatars } from "../context/AvatarsContext"
import members from "../utility/members" 

const ResultsLeaderboard = () => {

  const getAvatars = useAvatars() || []

  return (
    <div className="flex flex-col w-2/5 mr-2">
      <h2 className="text-2xl tracking-wider font-extrabold my-2">LEADERBOARD</h2>
      <div className="flex items-center">
        <span className="w-8">1st</span>
        <div>{ getAvatars.length > 0 && <img src={getAvatars[4]["avatar"]} alt="Avatar" className="rounded-full size-9 ml-4" /> }</div>
        <span className="ml-4 font-semibold">{ getAvatars.length > 0 && members[getAvatars[4].id] }</span>
      </div>
      <div className="my-2"></div>
      <div className="flex items-center">
        <span className="w-8">2nd</span>
        <div>{ getAvatars.length > 0 && <img src={getAvatars[1]["avatar"]} alt="Avatar" className="rounded-full size-9 ml-4" /> }</div>
        <span className="ml-4 font-semibold">{ getAvatars.length > 0 && members[getAvatars[1].id] }</span>
      </div>
    </div>
  )
}

export default ResultsLeaderboard