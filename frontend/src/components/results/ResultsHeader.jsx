const ResultsHeader = ({ selected, setSelected, setNumGames, setHide }) => {

  function handleClick(e) {
    const gameType = e.target.id
    setSelected(`game=${gameType}`)
    setNumGames(10) 
    setHide(false)
  }  
  
  return (
    <div className="flex flex-row w-full bg-zinc-800 gap-x-1 mt-2 rounded-md">
      {["all", "pool", "cards", "bowling"].map(type => (
        <span key={type} id={type}
          className={`py-3 px-3 border-2 border-transparent cursor-pointer transition duration-300 ${
            selected === type ? "border-b-fuchsia-400 font-bold" : "border-transparent hover:border-b-zinc-700"
          }`}
          onClick={handleClick}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      ))}
    </div>
  )
}

export default ResultsHeader