import { useAvatars } from "../context/AvatarsContext"
import names from "../utility/names"

const ResultsData = ({ games }) => {

  const getAvatars = useAvatars() || []
  console.log("avatars: ", getAvatars)
  
  // games.map(game => {
  //   Object.entries(game.results).map(result => {
  //     console.log("result: ", result)
  //   })
  // })

  return (
    <div className="flex flex-col w-3/5 box-border">
      <h2 className="text-xl tracking-wider font-extrabold my-4">RECENT GAMES</h2>
      {games.map((game, index) => (
        <div key={index} className="flex justify-between bg-zinc-800 rounded-md p-4 mb-1 border-l-6 border-l-slate-600 min-h-24 max-h-24">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-slate-100">{game.game.charAt(0).toUpperCase() + game.game.slice(1)}</p>
            <p className="text-sm font-extralight">{new Date(game.date).toLocaleDateString()}</p>
          </div>
          {getAvatars.length > 0 && <div className="grid grid-flow-col grid-rows-3 gap-6 items-center">
            {Object.entries(game.results).map((result, index) => (
               <a key={index} className="flex gap-x-2 min-w-28 max-w-28" href={''} aria-disabled="true">
                <img src={getAvatars.find(avatar => avatar.username === names[result[0]])["avatar"]} alt="avatar" className="rounded-full size-6" />
                <span className="text-sm truncate">{result[0]}</span>
              </a>
            ))}
          </div>}
        </div>
      ))}
    </div>
  )
}

export default ResultsData  