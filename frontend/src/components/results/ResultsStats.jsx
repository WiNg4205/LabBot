const ResultsStats = ({ id, selectedGame }) => {

  return (
    <div className={`flex flex-1 bg-zinc-700 rounded-md mb-1 ${
      selectedGame === id ? "block" : "hidden"}`}
    >
      {id}
    </div>
  )
}

export default ResultsStats