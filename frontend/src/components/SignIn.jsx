import { useEffect, useState } from 'react'

const SignIn = () => {
  const [user, setUser] = useState(null)
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1))
    const accessToken = fragment.get('access_token')
    const tokenType = fragment.get('token_type')

    if (!accessToken) return;

    fetch('https://discord.com/api/users/@me', {
      headers: { authorization: `${tokenType} ${accessToken}` },
    })
      .then(res => res.json())
      .then(data => {
        setUser(`${data.username}#${data.discriminator}`)
        setAvatar(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`)
      })
      .catch(console.error)
  }, []);

  if (!user) {
    return (
      <a
        id="login"
        href="https://discord.com/oauth2/authorize?client_id=1111800916589432906&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000&scope=identify"
        className="text-sm font-normal ml-4 px-2 py-2 bg-indigo-950 hover:bg-slate-900 border border-slate-500 rounded-md transition duration-300"
      >
        Sign in
      </a>
    );
  }

  return <img src={avatar} alt="Avatar" className="rounded-full size-9 ml-4" />;
};

export default SignIn;
