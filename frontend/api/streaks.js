import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()
const uri = `mongodb+srv://Scientists:${process.env.MONGO_PWD}@cluster0.qivnnso.mongodb.net/results?retryWrites=true&w=majority`
const client = new MongoClient(uri);

export async function GET(request) {
  const db = client.db('results')
  const gamesCollection = db.collection('games')
  const games = await gamesCollection.find({}).toArray()
  games.sort((a, b) => new Date(b.date) - new Date(a.date))

  const playersCollection = db.collection('players')
  const players = await playersCollection.find({}).toArray()

  const gameTypes = ["bowling", "pool", "cards"]
  const streaks = {}
  
  players.forEach(player => {
    streaks["all"] = {}
    streaks["all"][player.name] = 0

    gameTypes.forEach(gameType => {
      if (!streaks[gameType]) {
        streaks[gameType] = {}
      }
      streaks[gameType][player.name] = 0
    })
  })

  const gamesByPlayer = {}
  players.forEach(player => {
    const playerGames = games.filter(game => {
      return Object.keys(game.results).includes(player.name)
    })
    gamesByPlayer[player.name] = playerGames
  })

  players.forEach(player => {
    const playerGames = gamesByPlayer[player.name]
    let currentStreak = 0

    for (let i = 0; i < playerGames.length; i++) {
      const result = playerGames[i].results[player.name]
      if (result >= 0.5) {
        currentStreak += 1
      } else {
        break 
      }
    }
    streaks["all"][player.name] = currentStreak

    gameTypes.forEach(gameType => {
      let gameStreak = 0
      for (let i = 0; i < playerGames.length; i++) {
        const game = playerGames[i]
    
        if (game.game === gameType) {
          const result = game.results[player.name]

          if (result >= 0.5) {
            gameStreak += 1
          } else {
            break 
          }
        }
      }
      streaks[gameType][player.name] = gameStreak
    })
  })

  console.log("Streaks:", streaks)

  return new Response(JSON.stringify(games), {
    headers: { 'Content-Type': 'application/json' }
  })
}
