import { createContext, useContext, useState, useEffect } from "react"
import useSWR from "swr"
import fetcher from "../../fetcher"

const StreaksContext = createContext(undefined)

const useStreaks = () => useContext(StreaksContext)

const StreaksProvider = ({ children }) => {
  const { data: streaksData } = useSWR("../api/streaks", fetcher)
  const [streaks, setStreaks] = useState([])

  useEffect(() => {
    if (streaksData) {
      setStreaks(streaksData)
    }
  }, [streaksData])

  return (
    <StreaksContext.Provider value={streaks}>
      {children}
    </StreaksContext.Provider>
  )
}

export default StreaksProvider
export { useStreaks }
