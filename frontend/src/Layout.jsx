import { Outlet } from "react-router-dom"
import Header from "./components/Header"


const Layout = () => {
  return <div className="flex flex-col items-center bg-slate-900 text-slate-300 min-h-screen">
    <Header />
    <Outlet />
  </div>
}

export default Layout