import { SlashCommandBuilder } from 'discord.js'
import apiHandler from '../../api.js'

const weatherCommand = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Replies with the current weather'),
  async execute (interaction) {
    const weather = await apiHandler.getWeather()
    await interaction.reply(weather)
  }
}

export default weatherCommand
