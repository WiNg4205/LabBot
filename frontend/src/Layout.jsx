import { Outlet } from "react-router-dom"
import Header from "./components/Header"


const Layout = () => {
  return <div className="flex flex-col items-center w-full">
    <Header />
    <Outlet />
  </div>
}

export default Layout