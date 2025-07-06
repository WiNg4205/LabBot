import { createContext, useContext } from "react"
import useSWR from "swr"
import fetcher from "../../fetcher"

const DataContext = createContext(undefined)

const useData = () => useContext(DataContext)

const DataProvider = ({ children }) => {
  const { data } = useSWR("../api/data", fetcher)
  console.log(data)
  if (!data) return null

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
export { useData }
