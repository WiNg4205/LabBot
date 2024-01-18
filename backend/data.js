import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

import mongoose from 'mongoose'
dotenv.config()
const uri = `mongodb+srv://Scientists:${process.env.MONGO_PWD}@cluster0.qivnnso.mongodb.net/resultsdb2?retryWrites=true&w=majority`
mongoose.connect(uri)

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  winRate: { type: Number, default: 0 }
})
const Player = mongoose.model('Player', playerSchema)
const player = new Player({ name: 'William' })
await player.save()

// const client = new MongoClient(uri);
// const db = client.db("resultsdb");
// const kittens = await Kitten.find();
// console.log(kittens);
class DatabaseHandler {
  async initPlayerCollection () {
    const playerSchema = {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name'],
        properties: {
          name: {
            bsonType: 'string'
          },
          winRate: {
            bsonType: ['double'],
            description: 'not set initially'
          }
        }
      }
    }

    const outingSchema = {
      $jsonSchema: {
        bsonType: 'object',
        required: ['people', 'location', 'restaurant', 'date', 'time'],
        properties: {
          people: {
            bsonType: 'array'
          },
          location: {
            bsonType: 'string'
          },
          restaurant: {
            bsonType: 'string'
          },
          activity: {
            bsonType: ['string']
          },
          date: {
            bsonType: 'string',
            description: 'format should be YYYY-MM-DD'
          },
          time: {
            bsonType: 'string'
          },
          games: {
            bsonType: 'array'
          }
        }
      }
    }

    const gameSchema = {
      $jsonSchema: {
        bsonType: 'object',
        required: ['game', 'teams', 'results'],
        properties: {
          game: {
            bsonType: 'string',
            description: 'game that we played (pool etc.)'
          },
          results: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              required: ['team', 'placing'],
              properties: {
                team: {
                  bsonType: 'array',
                  description: 'team members'
                },
                placing: {
                  bsonType: 'int',
                  description: 'rank'
                }
              }
            }
          }
        }
      }
    }

    // await db.createCollection("players", { validator: playerSchema });
    await db.createCollection('outings', { validator: outingSchema })
    // await db.createCollection("games", { validator: gameSchema });
  }

  async closeClient () {
    this.client.close()
  }

  async insertData () {
    // const doc = { game: "pool", teams: [["Kevin", "William"], ["Brian", "William"]], results: [ {team: ["Brian, William"], placing: 1} ] };
    const doc = { people: ['Kevin'], location: 'Somewhere', restaurant: 'A restaurant', activity: 'pool', date: '2023-01-03', time: '6pm', games: ['65851d6d430377f2f6f43e0a'] }
    const myColl = db.collection('outings')
    myColl.insertOne(doc)
  }
}

const databaseHandler = new DatabaseHandler()

export default databaseHandler
