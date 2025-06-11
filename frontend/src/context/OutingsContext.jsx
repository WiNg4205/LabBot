import { createContext, useContext, useState, useEffect } from "react"
import useSWR from "swr"
import fetcher from "../../fetcher"
import { subHours } from "date-fns"

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
  const [Outings, setOutings] = useState([])

  useEffect(() => {
    if (outingsData) {
      // adjust to AEST time
      const adjustedData = outingsData.map(o => ({
        ...o,
        date: subHours(new Date(o.date), 10).toISOString()
      }))
      setOutings(adjustedData)
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
