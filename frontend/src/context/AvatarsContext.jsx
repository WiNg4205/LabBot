import { createContext, useContext, useState, useEffect } from "react"
import useSWR from "swr"
import fetcher from "../utility/fetcher"

const AvatarsContext = createContext(undefined)

const useAvatars = () => useContext(AvatarsContext)

const AvatarsProvider = ({ children }) => {
  const userId = localStorage.getItem('discord_user_id')
  const { data: avatarsData } = useSWR(`../api/avatars?user_id=${userId}`, fetcher)
  const [avatars, setAvatars] = useState([])

  useEffect(() => {
    if (avatarsData) {
      setAvatars(avatarsData)
    }
  }, [avatarsData])

  return (
    <AvatarsContext.Provider value={avatars}>
      {children}
    </AvatarsContext.Provider>
  )
}

export default AvatarsProvider
export { useAvatars }
