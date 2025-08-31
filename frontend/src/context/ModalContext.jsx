import { createContext, useContext, useState } from "react"

const ModalContext = createContext(undefined)
const ToggleModalContext = createContext(undefined)

const useModal = () => useContext(ModalContext)
const useToggleModal = () => useContext(ToggleModalContext)

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <ToggleModalContext.Provider value={setShowModal}>
      <ModalContext.Provider value={showModal}>
        {children}
      </ModalContext.Provider>
    </ToggleModalContext.Provider>
  )
}

export default ModalProvider
export { useModal, useToggleModal }
