import { createContext, useContext } from "react"
import useSWR from "swr"
import fetcher from "../utility/fetcher"

const DataContext = createContext(undefined)

const useData = () => useContext(DataContext)

const DataProvider = ({ children }) => {
  const userId = localStorage.getItem('discord_user_id')
  const { data } = useSWR(`../api/data?user_id=${userId}`, fetcher)

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
export { useData }
