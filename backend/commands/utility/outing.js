import { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js'

const modalCommand = {
  data: new SlashCommandBuilder()
    .setName('outing')
    .setDescription('Store an outing'),
  async execute (interaction) {
    const modal = new ModalBuilder()
      .setCustomId('outingModal')
      .setTitle('Outing')

    const dateInput = new TextInputBuilder()
      .setCustomId('dateInput')
      .setLabel('Date of outing')
      .setPlaceholder('YYYY-MM-DD')
      .setMaxLength(100)
      .setStyle(TextInputStyle.Short)

    const timeInput = new TextInputBuilder()
      .setCustomId('timeInput')
      .setLabel('Time of outing')
      .setPlaceholder('HH:MM (24-hour format)')
      .setMaxLength(100)
      .setStyle(TextInputStyle.Short)

    const peopleInput = new TextInputBuilder()
      .setCustomId('peopleInput')
      .setLabel('Who went')
      .setPlaceholder('e.g. Kev, Wil, Bri')
      .setMaxLength(100)
      .setStyle(TextInputStyle.Short)

    const locationInput = new TextInputBuilder()
      .setCustomId('locationInput')
      .setLabel('Where we went')
      .setMaxLength(1000)
      .setStyle(TextInputStyle.Paragraph)

    // An action row only holds one text input so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(dateInput)
    const secondActionRow = new ActionRowBuilder().addComponents(timeInput)
    const thirdActionRow = new ActionRowBuilder().addComponents(peopleInput)
    const fourthActionRow = new ActionRowBuilder().addComponents(locationInput)

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow)

    // Show the modal to the user
    await interaction.showModal(modal)
  }
}

export default modalCommand
