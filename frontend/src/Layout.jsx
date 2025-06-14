import { Outlet } from "react-router-dom"
import Header from "./components/Header"


const Layout = () => {
  return <div className="flex flex-col items-center bg-zinc-900 text-zinc-300 min-h-[calc(100vh+1px)] w-full">
    <Header />
    <Outlet />
  </div>
}

export default Layout