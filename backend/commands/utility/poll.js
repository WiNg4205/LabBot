import { ButtonBuilder, ButtonStyle, ActionRowBuilder, SlashCommandBuilder, ComponentType, MessageFlags } from 'discord.js'

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const pollCommand = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll'),
  async execute (interaction) {
    const d = new Date()
    const answers = []
    for (let i = 0; i < 7; i++) {
      d.setDate(d.getDate() + 1)
      const dateAnswer = weekdays[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate()
      answers.push({ text: dateAnswer, emoji: '🔒' })
    }

    const end = new ButtonBuilder()
      .setCustomId('end')
      .setLabel('End Poll')
      .setStyle(ButtonStyle.Success)

    const row = new ActionRowBuilder()
      .addComponents(end)

    const response = await interaction.reply({
      poll: {
        question: { text: 'When are you available?' },
        answers,
        allowMultiselect: true,
        duration: 48
      },
      components: [row],
      withResponse: true
    })

    const collector = response.resource.message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 172_800_000 })

    collector.on('collect', async interaction => {
      await interaction.reply({ content: 'Poll closed.', flags: MessageFlags.Ephemeral })
      await interaction.message.poll.end()
      collector.stop()
    })
  }
}

export default pollCommand
