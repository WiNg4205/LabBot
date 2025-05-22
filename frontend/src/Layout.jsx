import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"

const Layout = () => {
  return <div className="flex flex-col items-center">
    <NavBar />
    <Outlet />
  </div>
}

export default Layout