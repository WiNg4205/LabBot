import ResultsPlayer from "./ResultsPlayer"

const ResultsStats = ({ id, selectedGame, game}) => {

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
            <ResultsPlayer key={index} isWinner={true} player={winner} index={index} rankIndex={index} isOdd={isOdd} playerLength={winners.length} game={game}/>
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
        <div className="flex flex-col ">
          {losers.map((loser, index) => (
            <ResultsPlayer key={index} isWinner={false} player={loser} index={index} rankIndex={index + winners.length} isOdd={isOdd} playerLength={losers.length} game={game}/>
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