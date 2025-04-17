import { Client, Collection, IntentsBitField } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import databaseHandler from './data.js'

dotenv.config()

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessagePolls,
    IntentsBitField.Flags.GuildMessageReactions
  ]
})

client.commands = new Collection()

const __dirname = dirname(fileURLToPath(import.meta.url))
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const filePath = new URL(`file://${path.join(commandsPath, file)}`)
    import(filePath).then(module => {
      const command = module.default
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command)
      } else {
        console.log(`[WARNING] the command at ${filePath} is missing a required "data or "execute property`)
      }
    })
  }
}

const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = new URL(`file://${path.join(eventsPath, file)}`)
  import(filePath).then(module => {
    const event = module.default
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args))
    } else {
      client.on(event.name, (...args) => event.execute(...args))
    }
  })
}

process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing bot...')
  databaseHandler.closeClient() // Close database client before Ctrl+C in development
  process.exit()
})

client.login(process.env.BOT_TOKEN)
