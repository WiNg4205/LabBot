import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()
const uri = `mongodb+srv://Scientists:${process.env.MONGO_PWD}@cluster0.qivnnso.mongodb.net/results?retryWrites=true&w=majority`
const client = new MongoClient(uri)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('user_id')
  const db = client.db('results')
  const playersCollection = db.collection('players')
  const players = await playersCollection.find({}).toArray()  

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

  const userIds = players.map(p => p.user_id)
  if (!userIds.includes(id)) {
    users.forEach((u, i) => { // if user is not signed in or not in guild -> anonymise avatars
      const index = i % 6
      u.avatar = `https://cdn.discordapp.com/embed/avatars/${index}.png`
    })
  }

  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  })
}
