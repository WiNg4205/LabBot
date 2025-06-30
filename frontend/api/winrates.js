import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config()
const uri = `mongodb+srv://Scientists:${process.env.MONGO_PWD}@cluster0.qivnnso.mongodb.net/results?retryWrites=true&w=majority`
const client = new MongoClient(uri)

export async function GET(request) {
  const db = client.db('results')
  const gamesCollection = db.collection('games')
  const games = await gamesCollection.find({}).toArray()
  const playersCollection = db.collection('players')
  const players = await playersCollection.find({}).toArray()

  const results = []
  const resultHistory = {}
  resultHistory["total"] = []
  resultHistory["bowling"] = []
  resultHistory["pool"] = []
  resultHistory["cards"] = []

  players.forEach(player => {
    results.push({ name: player.name, points: 0, numGames: 0 })
  })
  games.forEach(game => {
    Object.entries(game.results).forEach((key) => {
      const player = results.find(p => p.name === key[0])
      player.points += key[1]
      player.numGames += 1
    })
    results.forEach(player => {
      player.winRate = ((player.points / player.numGames) * 100).toFixed(2)
    })

    resultHistory["total"].push(results.map(p => ({ ...p })))
  })

  results.length = 0
  players.forEach(player => {
    results.push({ name: player.name, points: 0, numGames: 0 })
  })
  const bowlingGames = games.filter(g => g.game === 'bowling')
  bowlingGames.forEach(game => {
    Object.entries(game.results).forEach((key) => {
      const player = results.find(p => p.name === key[0])
      player.points += key[1]
      player.numGames += 1
    })
    results.forEach(player => {
      player.winRate = ((player.points / player.numGames) * 100).toFixed(2)
    })

    resultHistory["bowling"].push(results.map(p => ({ ...p })))
  })

  results.length = 0
  players.forEach(player => {
    results.push({ name: player.name, points: 0, numGames: 0 })
  })
  const poolGames = games.filter(g => g.game === 'pool')
  poolGames.forEach(game => {
    Object.entries(game.results).forEach((key) => {
      const player = results.find(p => p.name === key[0])
      player.points += key[1]
      player.numGames += 1
    })
    results.forEach(player => {
      player.winRate = ((player.points / player.numGames) * 100).toFixed(2)
    })

    resultHistory["pool"].push(results.map(p => ({ ...p })))
  })

  results.length = 0
  players.forEach(player => {
    results.push({ name: player.name, points: 0, numGames: 0 })
  })
  const cardsGames = games.filter(g => g.game === 'cards')
  cardsGames.forEach(game => {
    Object.entries(game.results).forEach((key) => {
      const player = results.find(p => p.name === key[0])
      player.points += key[1]
      player.numGames += 1
    })
    results.forEach(player => {
      player.winRate = ((player.points / player.numGames) * 100).toFixed(2)
    })

    resultHistory["cards"].push(results.map(p => ({ ...p })))
  })

  return new Response(JSON.stringify(resultHistory), {
    headers: { 'Content-Type': 'application/json' }
  })
}
