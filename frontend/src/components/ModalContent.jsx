import { useRef, useEffect } from 'react'
import LabBotIcon from '../assets/flask-solid.svg'
import cross from '../assets/xmark-solid.svg'
import { Link, useLocation } from "react-router-dom"

const ModalContent = ({ onClose }) => {
  const location = useLocation()
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      onClose()
    }

   prevPath.current = location.pathname
  }, [onClose, location.pathname])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center p-4 pr-3">
        <img src={LabBotIcon} alt="LabBot SVG" className="size-6"/>
        <button onClick={ onClose }>
          <img src={cross} alt="Close" className="size-6 hover:bg-zinc-700 rounded-sm p-1 mr-2"/>
        </button>
      </div>
      <div className="flex flex-col gap-1">
        <Link to="/events" className="flex items-center pl-4 p-3 rounded-md hover:bg-zinc-700 mx-1">
          <h1 className="text-xl font-semibold">Events</h1>
        </Link>
        <Link to="/results" className="flex items-center pl-4 p-3 rounded-md hover:bg-zinc-700 mx-1" >
          <h1 className="text-xl font-semibold">Results</h1>
        </Link>
        <Link to="/docs/installation" className="flex items-center pl-4 p-3 rounded-md hover:bg-zinc-700 mx-1">
          <h1 className="text-xl font-semibold">Docs</h1>
        </Link>
      </div>
    </div>
  )
}

export default ModalContent