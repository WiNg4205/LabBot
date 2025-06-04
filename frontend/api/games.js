import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()
const uri = `mongodb+srv://Scientists:${process.env.MONGO_PWD}@cluster0.qivnnso.mongodb.net/results?retryWrites=true&w=majority`
const client = new MongoClient(uri);

export async function GET(request) {
  const db = client.db('results')
  const gamesCollection = db.collection('games')
  const games = await gamesCollection.find({}).toArray()

  return new Response(JSON.stringify(games), {
    headers: { 'Content-Type': 'application/json' }
  })
}
