import { createContext, useContext, useState, useEffect } from "react"
import useSWR from "swr"
import fetcher from "../../fetcher"

const OutingsContext = createContext(undefined)
const InitOutingsContext = createContext(undefined)

const useOutings = () => {
  return useContext(OutingsContext)
}

const useInitOutings = () => {
  return useContext(InitOutingsContext)
}

const OutingsProvider = ({ children }) => {
  const { data: outingsData } = useSWR("../api/outings", fetcher)
  const [Outings, setOutings] = useState(null)

  useEffect(() => {
    if (outingsData) {
      setOutings(outingsData)
    }
  }, [outingsData])

  return (
    <OutingsContext.Provider value={Outings}>
      <InitOutingsContext.Provider value={setOutings}>
        {children}
      </InitOutingsContext.Provider>
    </OutingsContext.Provider>
  )
}

export default OutingsProvider
export { useOutings, useInitOutings }
