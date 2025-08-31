import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { useModal } from "./context/ModalContext"

const Layout = () => {
  const showModal = useModal()
  
  return <div className={ `${ showModal ? "hidden" : "" } flex flex-col items-center w-full min-h-[calc(100vh+1px)]` }>
    <Header />
    <Outlet />
  </div>
}

export default Layout