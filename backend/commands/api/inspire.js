import { SlashCommandBuilder } from 'discord.js'
import apiHandler from '../../api.js'

const inspireCommand = {
  data: new SlashCommandBuilder()
    .setName('inspire')
    .setDescription('Replies with an inspirational quote!'),
  async execute (interaction) {
    const quote = await apiHandler.getQuote()
    await interaction.reply(quote)
  }
}

export default inspireCommand
