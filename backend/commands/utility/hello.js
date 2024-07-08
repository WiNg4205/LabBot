import { SlashCommandBuilder } from 'discord.js'
import members from '../../members.js'

const helloCommand = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello (name)!'),
  async execute (interaction) {
    const memberId = interaction.member.user.id
    await interaction.reply(`Hello ${members[memberId]}!`)
  }
}

export default helloCommand
