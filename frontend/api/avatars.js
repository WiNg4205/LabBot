import { Client, GatewayIntentBits } from 'discord.js'

export async function GET(request) {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  })

  await client.login(process.env.BOT_TOKEN)

  await new Promise(resolve => {
    client.once('ready', resolve)
  })

  const guild = await client.guilds.fetch(process.env.GUILD_ID)
  const members = await guild.members.fetch()

  const users = members.map(({ user }) => ({
    username: user.username,
    avatar: user.displayAvatarURL(),
  }))

  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  })
}
