import BottomArrow from "../../assets/bottom-arrow.svg"
import TopArrow from "../../assets/top-arrow.svg"

const ResultsDropdown = ({ id, selectedGame, setSelectedGame }) => {

  const handleClick = () => {
    setSelectedGame(prev => prev === id ? null : id)
  }

  return (
    <>
      <div className="flex flex-col justify-end bg-[#42424a] px-2 sm:px-3 py-2 rounded-tr-md rounded-br-md cursor-pointer hover:bg-zinc-800 transition duration-300 select-none" onClick={handleClick}>
        <img className="size-3" src={selectedGame === id ? TopArrow : BottomArrow} alt="arrow"></img>
      </div>
    </>
   
  )
}

export default ResultsDropdown