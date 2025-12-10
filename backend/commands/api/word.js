import { SlashCommandBuilder } from 'discord.js'
import apiHandler from '../../api.js'

const wordCommand = {
  data: new SlashCommandBuilder()
    .setName('wordoftheday')
    .setDescription('Replies with a random word!'),
  async execute (interaction) {
    await interaction.deferReply()  // Tell Discord: "I'm working on it"
    const word = await apiHandler.getWord()  // Do the slow API calls
    await interaction.editReply(word)  // Send the result when ready
  }
}

export default wordCommand
