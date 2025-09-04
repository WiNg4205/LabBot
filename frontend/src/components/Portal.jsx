import { createPortal } from 'react-dom'
import { useToggleModal, useModal } from '../context/ModalContext.jsx'
import ModalContent from './ModalContent.jsx'
import dots from '../assets/three-dots.svg'

const Portal = () => {
  const setModal = useToggleModal()
  const showModal = useModal()

  return (
    <>
      <button onClick={() => {
        setModal(true)
      }}>
        <img src={dots} alt="Dots" className="flex md:hidden size-6 mr-2 rounded-sm hover:bg-zinc-700"/>
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setModal(false)} />,
        document.body )}
    </>
  )
}

export default Portal