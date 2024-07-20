import { SlashCommandBuilder } from 'discord.js'
import apiHandler from '../../api.js'

const jokeCommand = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Replies with a joke!'),
  async execute (interaction) {
    const joke = await apiHandler.getJoke()
    await interaction.reply(joke)
  }
}

export default jokeCommand
