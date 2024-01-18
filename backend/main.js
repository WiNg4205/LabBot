import { Client, IntentsBitField } from 'discord.js'
import dotenv from 'dotenv'
import apiHandler from './api.js'
import minigameHandler from './minigame.js'
import databaseHandler from './data.js'

dotenv.config()

const people = {
  '287695357175922688': 'Brian',
  '393600653328515073': 'Kevin',
  '435674199424499712': 'Jeremy',
  '558581174629302273': 'William',
  '420151663429681153': 'Winson'
}

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
  ]
})

client.on('ready', () => {
  console.log('Our bot is ready to go!')
})

client.on('messageCreate', msg => {
  if (msg.author.bot) return // To avoid infinite loops

  if (msg.content === '!q') {
    minigameHandler.game = null
  } else if (minigameHandler.game != null) {
    minigameHandler.play(msg.content).then(result => msg.channel.send(result))
  } else if (msg.content === 'Hello LabBot') {
    const author = people[msg.author.id]
    msg.channel.send(`Hello ${author}!`)
  } else if (msg.content === '!inspire') {
    apiHandler.getQuote().then(quote => msg.channel.send(quote))
  } else if (msg.content === '!joke') {
    apiHandler.getJoke().then(joke => msg.channel.send(joke))
      .then(sentMessage => sentMessage.react('🤣'))
  } else if (msg.content === '!weather') {
    apiHandler.getWeather().then(weather => msg.channel.send(weather))
  } else if (msg.content === '!guess') {
    minigameHandler.playGuessTheNumber().then(guess => msg.channel.send(guess))
  } else if (msg.content === '!initdb') {
    databaseHandler.initPlayerCollection()
  } else if (msg.content === '!addData') {
    databaseHandler.insertData()
  } else if (msg.content === '!createEvent') {
    // TODO:
  } else if (msg.content === '!event') {
    // TODO:
  } else if (msg.content.startsWith('Name = ') ||
               msg.content.startsWith('Date = ') ||
               msg.content.startsWith('Time = ') ||
               msg.content.startsWith('Restaurant = ') ||
               msg.content.startsWith('Activity = ')) {
    // TODO:
  } else if (msg.content === '!initialise') {
    // TODO:
  } else if (msg.content.startsWith('!addPlayer')) {
    // TODO:
  } else if (msg.content.startsWith('!getPlayer')) {
    // TODO:
  } else if (msg.content.startsWith('!getTeam')) {
    // TODO:
  } else if (msg.content.startsWith('!gameResult')) {
    // TODO:
  } else if (msg.content.startsWith('!winrate')) {
    // TODO:
  } else if (msg.content === '!bestTeam') {
    // TODO:
  } else if (msg.content === '!worstTeam') {
    // TODO:
  }
})

process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing bot...')
  databaseHandler.closeClient() // close database client before Ctrl+C in development
  process.exit()
})

client.login(process.env.BOT_TOKEN)
