import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()
const uri = `mongodb+srv://Scientists:${process.env.MONGO_PWD}@cluster0.qivnnso.mongodb.net/results?retryWrites=true&w=majority`
const client = new MongoClient(uri)

export async function GET(request) {
  const db = client.db('results')

  const outingsCollection = db.collection('outings')
  const outings = await outingsCollection.find({}).toArray()

  return new Response(JSON.stringify(outings), {
    headers: { 'Content-Type': 'application/json' }
  })
}
