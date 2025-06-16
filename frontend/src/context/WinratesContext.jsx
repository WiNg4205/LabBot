import { createContext, useContext, useState, useEffect } from "react"
import useSWR from "swr"
import fetcher from "../../fetcher"

const WinratesContext = createContext(undefined)

const useWinrates = () => useContext(WinratesContext)

const WinratesProvider = ({ children }) => {
  const { data: winratesData } = useSWR("../api/winrates", fetcher)
  const [winrates, setAvatars] = useState(null)

  useEffect(() => {
    if (winratesData) {
      setAvatars(winratesData)
    }
  }, [winratesData])

  return (
    <WinratesContext.Provider value={winrates}>
      {children}
    </WinratesContext.Provider>
  )
}

export default WinratesProvider
export { useWinrates }
