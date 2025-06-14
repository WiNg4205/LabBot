const ResultsData = ({ games }) => {

  return (
    <div className="flex flex-col w-3/5 box-border">
      <h2 className="text-2xl tracking-wider font-extrabold my-2">RESULTS</h2>
      {games.map((game, index) => (
        <div key={index} className="flex flex-row bg-zinc-800 rounded-md p-4 mb-2 border-l-6 min-h-24">
          <div className="flex flex-col">
            <p className="text-md font-bold">{game.game.charAt(0).toUpperCase() + game.game.slice(1)}</p>
            <p className="text-md font-extralight">{new Date(game.date).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResultsData