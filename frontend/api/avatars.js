import { Client, GatewayIntentBits } from 'discord.js'

export async function GET(request) {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  })

  try {
    await client.login(process.env.BOT_TOKEN)
    await new Promise(resolve => client.once('ready', resolve))

    const guild = await client.guilds.fetch(process.env.GUILD_ID)
    const members = await guild.members.fetch()

    const users = members.map(({ user }) => ({
      username: user.username,
      avatar: user.displayAvatarURL(),
    }))
    client.destroy()

    return new Response(JSON.stringify(users), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    client.destroy()
    return new Response(JSON.stringify({ error: "Permission error", details: err.message }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}