import { useEffect, useState } from 'react'
import members from '../utility/members'

const SignIn = () => {
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
      .then(data => {
        if (data.id in members) {
          setUser(`${data.username}#${data.discriminator}`)
          setAvatar(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`)
        }
      })
      .catch(console.error)
  }, [])

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
