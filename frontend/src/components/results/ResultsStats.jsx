import { useAvatars } from "../../context/AvatarsContext"

const ResultsStats = ({ id, selectedGame, game}) => {

  const getAvatars = useAvatars() || []

  const ranks = ["👑", "2nd", "3rd", "4th", "5th", "6th"]
  const winners = Object.entries(game.results).filter(result => result[1] >= 0.5)
  const losers = Object.entries(game.results).filter(result => result[1] < 0.5) 
  const totalRows = winners.length + losers.length
  const isOdd = totalRows % 2 !== 0

  return (
    <div className={`flex flex-1 mb-1 gap-2 ${
      selectedGame === id ? "block" : "hidden"}`}
    >
      <div className="flex flex-col w-1/2 bg-[#28344E] rounded-md border-[1px] border-[#5383E8]">
        <h3 className="text-sm font-bold text-[#5383E8] pl-2 pr-4 pt-2 pb-1">WIN</h3>
        <div className="flex flex-col">
          {winners.map((winner, index) => (
            <div key={index} className={`flex items-center gap-x-2 p-2
              ${index % 2 === 0 ? "bg-[#1c2941]" : "bg-[#28344E]"}
              ${index === winners.length - 1 ? "rounded-b-md" : ""}
            `}
          >
              <img src={getAvatars.find(avatar => avatar.username === winner[0])["avatar"]} alt="avatar" className="rounded-full size-6" />
              <span className="text-sm truncate min-w-15">{winner[0]}</span>
              <div className="flex items-center bg-zinc-500 rounded-2xl px-2 py-0.5">
                {game.game === "pool" ? (
                  <span className="text-[13px] truncate">👑</span>
                ) : (
                  <span className="text-[13px] truncate">{ranks[index]}</span>
                )}
              </div>
            </div>
          ))}
          {isOdd && winners.length === 2 && (
            <div className="flex items-center gap-x-2 p-2 bg-[#1c2941] rounded-b-md">
              <span className="size-6">&nbsp;</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-1/2 bg-[#59343B] rounded-md border-[1px] border-[#E84057]">
        <h3 className="text-sm font-bold text-[#E84057] pl-2 pr-4 pt-2 pb-1">LOSS</h3>
        <div className="flex flex-col">
          {losers.map((loser, index) => (
              <div key={index} className={`flex items-center gap-x-2 p-2
              ${index % 2 === 0 ? "bg-[#4b2930]" : "bg-[#59343B]"}
              ${index === losers.length - 1 ? "rounded-b-md" : ""}
            `}
          >
            <img src={getAvatars.find(avatar => avatar.username === loser[0])["avatar"]} alt="avatar" className="rounded-full size-6" />
              <span className="text-sm truncate min-w-15">{loser[0]}</span>
                <div className="flex items-center bg-zinc-500 rounded-2xl px-2 py-0.5">
                {game.game === "pool" ? (
                  <span className="text-[13px] truncate">2nd</span>
                ) : (
                  <span className="text-[13px] truncate">{ranks[index + winners.length]}</span>
                )}
              </div>
            </div>
          ))}
          {isOdd && losers.length === 2 && (
            <div className="flex items-center gap-x-2 p-2 bg-[#4b2930] rounded-b-md">
              <span className="size-6">&nbsp;</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultsStats