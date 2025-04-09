import { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags, ComponentType } from 'discord.js'

const choices = [
  { name: 'Rock', beats: 'Scissors' },
  { name: 'Paper', beats: 'Rock' },
  { name: 'Scissors', beats: 'Paper' }
]

const rpsCommand = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('play rock paper scissors!')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('the user you want to play against')
        .setRequired(true)),
  /**
   * @param {Object} param0
   * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
  */
  async execute (interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Rock paper scissors')
      .setDescription(`Waiting for ${interaction.options.getUser('user').globalName} and ${interaction.user.globalName} to play!`)
      .setTimestamp()

    const buttons = choices.map((choice) => {
      return new ButtonBuilder()
        .setCustomId(choice.name)
        .setLabel(choice.name)
        .setStyle(ButtonStyle.Primary)
    })

    const row = new ActionRowBuilder()
      .addComponents(buttons)

    if (interaction.options.getUser('user') === interaction.user) {
      return interaction.reply({
        content: 'You cannot play against yourself!',
        flags: MessageFlags.Ephemeral
      })
    } else if (interaction.options.getUser('user').bot) {
      return interaction.reply({
        content: 'You cannot play against a bot!',
        flags: MessageFlags.Ephemeral
      })
    }

    const response = await interaction.reply({
      content: '',
      embeds: [embed],
      components: [row],
      withResponse: true
    })

    // Button collector that filters for both players
    const playerFilter = i => i.user === interaction.user || i.user === interaction.options.getUser('user')
    const collector = response.resource.message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 5_000, filter: playerFilter })

    const firstChoice = {} // { user: globalName, choice: choice }
    collector.on('collect', async i => {
      if (firstChoice.user === i.user.globalName) {
        return i.reply({
          content: 'You have already selected!',
          flags: MessageFlags.Ephemeral
        })
      }
      await i.reply({ content: `You selected ${i.customId}.`, flags: MessageFlags.Ephemeral })

      // If neither player has selected yet, store the first choice
      if (Object.keys(firstChoice).length === 0) {
        firstChoice.user = i.user.globalName
        firstChoice.choice = i.customId
      } else {
        embed.setDescription(`**${firstChoice.user}** chose **${firstChoice.choice}**\n**${i.user.globalName}** chose **${i.customId}**`)
        await interaction.editReply({
          embeds: [embed],
          components: [row]
        })

        // Find the choice that the first choice beats
        const firstChoiceBeats = choices.find((choice) => choice.name === firstChoice.choice).beats
        if (firstChoice.choice === i.customId) {
          interaction.followUp('It\'s a tie!')
        } else if (firstChoiceBeats === i.customId) {
          interaction.followUp(`${firstChoice.user} wins!`)
        } else {
          interaction.followUp(`${i.user.globalName} wins!`)
        }
        collector.stop()
      }
    })

    collector.on('end', async collected => {
      if (collected.size <= 1) {
        embed.setDescription('Game timed out!')
        await interaction.editReply({
          embeds: [embed],
          components: []
        })
      }
    })
  }
}

export default rpsCommand
