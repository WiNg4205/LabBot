import { SlashCommandBuilder, MessageFlags, EmbedBuilder } from 'discord.js'
import { generate } from 'random-words'

const stages = [
`   +---+
   |   |
   O   |
  /|\\  |
  / \\  |
       |
=========`,
`   +---+
   |   |
   O   |
  /|\\  |
  /    |
       |
=========`,
`   +---+
   |   |
   O   |
  /|\\  |
       |
       |
=========`,
`   +---+
   |   |
   O   |
  /|   |
       |
       | 
=========`,
`   +---+
   |   |
   O   |
  /    |
       |
       | 
=========`,
`   +---+
   |   |
   O   |
       |
       |
       |
=========`,
`   +---+
   |   |
       |
       |
       |
       |
=========`,
`   +---+
       |
       |
       |
       |
       |
=========`
]

const hangmanCommand = {
  data: new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Play hangman!')
    .addBooleanOption(option =>
      option.setName('multiplayer')
        .setDescription('singleplayer or multiplayer')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('word')
        .setDescription('the word to guess')
        .setRequired(false)),
  /**
   * @param {Object} param0
   * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
  */
  async execute (interaction) {
    await interaction.reply({
      content: 'Hangman',
      flags: MessageFlags.Ephemeral
    })

    for (let i = 0; i < 10; i++) {
      console.log(generate({ minLength: 5, maxLength: 10 }))
    }
    for (let i = 0; i < stages.length; i++) {
      console.log(stages[i])
    }
  }
}

export default hangmanCommand
