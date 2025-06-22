const GamesHeader = ({ handleClick }) => {
  
  return (
    <div className="flex flex-row w-full bg-zinc-800 gap-x-1 mt-2 rounded-md">
      <span id="all" className="py-3 px-3 hover:text-fuchsia-300  hover:cursor-pointer rounded-md transition duration-300" onClick={handleClick}>All</span>
      <span id="pool" className="py-3 px-3 hover:text-fuchsia-300  hover:cursor-pointer rounded-md transition duration-300" onClick={handleClick}>Pool</span>
      <span id="cards" className="py-3 px-3 hover:text-fuchsia-300  hover:cursor-pointer rounded-md transition duration-300" onClick={handleClick}>Cards</span>
      <span id="bowling" className="py-3 px-3 hover:text-fuchsia-300  hover:cursor-pointer rounded-md transition duration-300" onClick={handleClick}>Bowling</span>
    </div>
  )
}

export default GamesHeader