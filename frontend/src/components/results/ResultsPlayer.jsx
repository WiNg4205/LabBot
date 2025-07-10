import { useAvatars } from "../../context/AvatarsContext"

const ResultsPlayer = ({ isWinner, player, index, rankIndex, playerLength, game}) => {

  const getAvatars = useAvatars() || []
  const ranks = ["👑", "2nd", "3rd", "4th", "5th", "6th"]

  return (
    <>
      <div key={index} className={`flex items-center gap-x-2 p-2
        ${index % 2 === 0 && isWinner ? "bg-[#1c2941]"
          : index % 2 === 1 && isWinner ? "bg-[#28344E]"
          : index % 2 === 0 && !isWinner ? "bg-[#4b2930]"
          : index % 2 === 1 && !isWinner ? "bg-[#59343B]"
          : ""
        }
        ${index === playerLength - 1 ? "rounded-b-md" : ""}
      `}
      >
        <img src={getAvatars.find(avatar => avatar.username === player[0])["avatar"]} alt="avatar" className="rounded-full size-6" />
        <span className="text-sm truncate min-w-15">{player[0]}</span>
        <div className="flex items-center bg-zinc-500 rounded-2xl px-2 py-0.5">
          {game.game === "pool" ? (
            <span className="text-[13px] truncate">{isWinner ? "👑" : "2nd"}</span>
          ) : (
            <span className="text-[13px] truncate">{ranks[rankIndex]}</span>
          )}
        </div>
      </div>
    </>
  )
}

export default ResultsPlayer