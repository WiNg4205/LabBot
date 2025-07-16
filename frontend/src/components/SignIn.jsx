import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from '../utility/fetcher'

const SignIn = () => {
  const [userData, setUserData] = useState(null)
  const [user, setUser] = useState(null)
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1))
    let accessToken = fragment.get('access_token')
    const tokenType = fragment.get('token_type')

    if (accessToken) {
      localStorage.setItem('discord_access_token', accessToken)
      localStorage.setItem('discord_token_type', tokenType)
      window.history.replaceState(null, '', window.location.pathname)
    } else {
      accessToken = localStorage.getItem('discord_access_token')
    }

    if (!accessToken) return

    const type = localStorage.getItem('discord_token_type') || 'Bearer'

    fetch('https://discord.com/api/users/@me', {
      headers: { authorization: `${type} ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(console.error)
  }, [])

  const { data: authenticated } = useSWR(
    () => (userData ? `../api/auth?user_id=${userData.id}` : null),
    fetcher
  )

  useEffect(() => {
    if (authenticated && userData) {
      localStorage.setItem('discord_user_id', userData.id)
      setUser(`${userData.username}#${userData.discriminator}`)
      setAvatar(`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`)
    }
  }, [authenticated, userData])

  if (!user) {
    return (
      <a
        id="login"
        href={`https://discord.com/oauth2/authorize?client_id=1111800916589432906&response_type=token&redirect_uri=https%3A%2F%2F${import.meta.env.VITE_BASE_URL}&scope=identify`}
        className="text-sm font-normal ml-4 px-2 py-2 bg-indigo-950 hover:bg-slate-900 border border-slate-500 rounded-md transition duration-300"
      >
        Sign in
      </a>
    )
  }

  return <img src={avatar} alt="Avatar" className="rounded-full size-9 ml-4" />
}

export default SignIn
