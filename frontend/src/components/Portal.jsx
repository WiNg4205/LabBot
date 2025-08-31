import { createPortal } from 'react-dom';
import ModalContent from './ModalContent.jsx';
import { useToggleModal, useModal } from '../context/ModalContext.jsx';

const Portal = () => {
  const setModal = useToggleModal()
  const showModal = useModal()

  return (
    <>
      <button onClick={() => {
        setModal(true);
      }}>
        Show modal using a portal
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setModal(false)} />,
        document.body  )}
    </>
  )
}

export default Portal