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
  const users = members
    .filter(member => players.find(p => p.user_id === member.user.id))
    .map(member => {
      const user = member.user
      const player = players.find(p => p.user_id === user.id)
      const defaultAvatarIndex = ((BigInt(user.id) >> 22n) % 6n).toString()
      const avatarLink = (!user.avatar)
        ? `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`
        : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`

      return {
        username: player.name,
        avatar: avatarLink
      }
    })

  const userIds = players.map(p => p.user_id)
  if (!userIds.includes(id)) {
    users.forEach((u, i) => { // if user is not signed in or not in guild -> anonymise avatars 
      const anonymise = players.reduce((acc, player, i) => {
        acc[player.name] = `Player ${i + 1}`
        return acc
      }, {})

      const index = i % 6
      u.avatar = `https://cdn.discordapp.com/embed/avatars/${index}.png`
      u.username = anonymise[u.username]
    })
  }

  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  })
}
