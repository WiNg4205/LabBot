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
  const gamesCollection = db.collection('games')
  const games = await gamesCollection.find({}).toArray()
  games.reverse().sort((a, b) => new Date(b.date) - new Date(a.date)) 
  const outingsCollection = db.collection('outings')
  const outings = await outingsCollection.find({}).toArray()

  // CALCULATE WINRATES
  const results = []
  const resultHistory = {}
  resultHistory["total"] = []
  resultHistory["bowling"] = []
  resultHistory["pool"] = []
  resultHistory["cards"] = []

  players.forEach(player => {
    results.push({ name: player.name, points: 0, numGames: 0 })
  })
  games.slice().reverse().forEach(game => {
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
  const bowlingGames = games.filter(g => g.game === 'bowling').reverse()
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
  const poolGames = games.filter(g => g.game === 'pool').reverse()
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
  const cardsGames = games.filter(g => g.game === 'cards').reverse()
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

  // CALCULATE STREAKS
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

  const userIds = players.map(p => p.user_id)
  if (!userIds.includes(id)) { // if user is not signed in or not in guild -> anonymise data
    const anonymise = players.reduce((acc, player, i) => {
      acc[player.name] = `Player ${i + 1}`
      return acc
    }, {})

    players.forEach(player => {
      player.name = anonymise[player.name]
    })

    games.forEach(game => {
      const results = game.results
      const newResult = new Map()
        for (const [key, value] of Object.entries(results)) {
          newResult[anonymise[key]] = value
        }
      game.results = newResult
    })

    resultHistory.bowling.forEach(game => {
      game.forEach(player => {
        player.name = anonymise[player.name]
      })
    })

    resultHistory.cards.forEach(game => {
      game.forEach(player => {
        player.name = anonymise[player.name]
      })
    })

    resultHistory.pool.forEach(game => {
      game.forEach(player => {
        player.name = anonymise[player.name]
      })
    })

    resultHistory.total.forEach(game => {
      game.forEach(player => {
        player.name = anonymise[player.name]
      })
    })

    for (const category in streaks) {
      const original = streaks[category]
      const updated = {}
      for (const name in original) {
        const newName = anonymise[name]
        updated[newName] = original[name]
      }
      streaks[category] = updated
    }
  }


  return new Response(JSON.stringify({games, players, outings, resultHistory, streaks}), {
    headers: { 'Content-Type': 'application/json' }
  })
}
