import BottomArrow from "../../assets/bottom-arrow.svg"
import TopArrow from "../../assets/top-arrow.svg"

const ResultsDropdown = ({ id, selectedGame, setSelectedGame }) => {

  const handleClick = () => {
    setSelectedGame(prev => prev === id ? null : id)
  }

  return (
    <>
      <div className="flex flex-col justify-end bg-[#42424a] px-3 py-2 rounded-tr-md rounded-br-md cursor-pointer hover:bg-zinc-800 transition duration-300" onClick={handleClick}>
        <img className="size-4" src={selectedGame === id ? TopArrow : BottomArrow} alt="arrow"></img>
      </div>
    </>
   
  )
}

export default ResultsDropdown