import { Outlet } from "react-router-dom"
import Header from "./components/Header"

const Layout = () => {
  return <div className="flex flex-col items-center">
    <Header />
    <Outlet />
  </div>
}

export default Layout