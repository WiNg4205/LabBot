const Results = () => {
  return <>
    <div className="flex">
      <div className="flex flex-col w-5xl">
        <div className="flex flex-row w-full bg-zinc-800 gap-x-1 mt-2 rounded-md">
          <span className="py-3 px-3 hover:bg-gray-700 rounded-md">All</span>
          <span className="py-3 px-3 hover:bg-gray-700 rounded-md">Pool</span>
          <span className="py-3 px-3 hover:bg-gray-700 rounded-md">Cards</span>
          <span className="py-3 px-3 hover:bg-gray-700 rounded-md">Bowling</span>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col w-2/5 mr-2">
            <h2 className="text-2xl tracking-wider font-extrabold my-2">LEADERBOARD</h2>
            <div className="flex bg-zinc-800 rounded-md">
              Test
            </div>
          </div>
          <div className="flex flex-col w-3/5">
            <h2 className="text-2xl tracking-wider font-extrabold my-2">RESULTS</h2>
            <div className="flex bg-zinc-800 rounded-md">
              Test
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
}

export default Results
