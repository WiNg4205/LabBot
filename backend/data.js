import dotenv from 'dotenv'
import { ActionRowBuilder, TextInputStyle, ComponentType, SlashCommandBuilder} from 'discord.js'
import mongoose, { trusted } from 'mongoose'
dotenv.config()
const { Schema } = mongoose
const uri = `mongodb+srv://Scientists:${process.env.MONGO_PWD}@cluster0.qivnnso.mongodb.net/results?retryWrites=true&w=majority`
mongoose.connect(uri)

class DatabaseHandler {
  static playerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    winRate: {
      type: Number,
      default: 0
    }
  })

  static resultsSchema = new mongoose.Schema({
    placing: {
      type: Number,
      required: true
    },
    team: {
      type: [String],
      required: true
    }
  })

  static outingSchema = new mongoose.Schema({
    people: {
      type: [String],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    restaurant: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      min: '2024-01-20'
    },
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Game'
      }
    ]
  })

  static gameSchema = new mongoose.Schema({
    game: {
      type: String,
      required: true
    },
    result: {
      type: [DatabaseHandler.resultsSchema]
    }
  })

  constructor() {
    this.Player = mongoose.model('Player', DatabaseHandler.playerSchema)
    this.Game = mongoose.model('Game', DatabaseHandler.gameSchema)
    this.Outing = mongoose.model('Outing', DatabaseHandler.outingSchema)
    this.Result = mongoose.model('Result', DatabaseHandler.resultsSchema)
  }
}

// const result = new Result({
//     placing: "1",
//     team: ["Kevin"]
// });
// const result2 = Result({
//     placing: "2",
//     team: ["William"]
// });

// const game1 = await Game.create({
//     game: "pool",
//     result: [result, result2]
// });
// const game2 = await Game.create({
//     game: "cards",
//     result: [result, result2]
// });

// const outing = await Outing.create({
//     people: ["Kevin", "William"],
//     location: "Town Hall",
//     restaurant: "Some Italian restaurant",
//     date: "2024-01-23",
//     games: ["65af3ed19862e629edfba09e", "65af3ed19862e629edfba0a3"],
// });

// const results = await Game.find({}).
//     populate('result').
//     exec();

// const outing1 = await Outing.findOne({}).
//     populate('games').
//     exec();
// console.log(outing1.games[0].result);

const databaseHandler = new DatabaseHandler()

export default databaseHandler
