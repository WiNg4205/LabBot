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
  const userIds = players.map(p => p.user_id)
  let auth = false
  if (userIds.includes(id)) auth = true

  return new Response(JSON.stringify(auth), {
    headers: { 'Content-Type': 'application/json' }
  })
}
