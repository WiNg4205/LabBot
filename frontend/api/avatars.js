export async function GET(request) {
  const res = await fetch(`https://discord.com/api/v10/guilds/${process.env.GUILD_ID}/members?limit=1000`, {
    headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` },
  })

  if (!res.ok) {
    console.error('Error fetching members:', res.status, await res.text())
    return
  }

  const members = await res.json()
  const users = members.map(member => {
    const user = member.user
    const defaultAvatarIndex = ((BigInt(user.id) >> 22n) % 6n).toString()
    const avatarLink = (!user.avatar)
      ? `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`
      : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`

    return {
      username: user.username,
      avatar: avatarLink
    }
  })

  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  })
}
