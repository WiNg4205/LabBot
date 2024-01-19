import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

import mongoose from 'mongoose'
const uri = `mongodb+srv://Scientists:${process.env.MONGO_PWD}@cluster0.qivnnso.mongodb.net/results?retryWrites=true&w=majority`
mongoose.connect(uri);

class databaseHandler {
    static playerSchema = new mongoose.Schema({
        name: { 
            type: String, 
            required: true 
        },
        winRate: { 
            type: Number,
            default: 0
        }
    });

    static outingSchema = new mongoose.Schema({
        
    })
}
   
// const Player = mongoose.model('Player', databaseHandler.playerSchema);
// const player = await Player.create({
//     name: "Kevin",
// });
// console.log(player);

export default databaseHandler;
