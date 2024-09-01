import { SlashCommandBuilder } from 'discord.js'

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const pollCommand = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll'),
  async execute (interaction) {
    const d = new Date()
    const answers = []
    for (let i = 1; i < 9; i++) {
      d.setDate(d.getDate() + 1)
      const dateAnswer = weekdays[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate()
      answers.push({ text: dateAnswer, emoji: '🔒' })
    }

    interaction.reply({
      poll: {
        question: { text: 'When are you available?' },
        answers,
        allowMultiselect: true,
        duration: 48
      }
    })
  }
}

export default pollCommand
