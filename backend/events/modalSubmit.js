import { Events, MessageFlags } from 'discord.js'
import databaseHandler from '../data.js'

const modalSubmit = {
  name: Events.InteractionCreate,
  async execute (interaction) {
    if (!interaction.isModalSubmit()) return

    const date = interaction.fields.getTextInputValue('dateInput')
    if (date.split('-').length !== 3) {
      interaction.reply({ content: 'Invalid date format.', flags: MessageFlags.Ephemeral })
      return
    }
    const time = interaction.fields.getTextInputValue('timeInput')
    const dateTime = date + time
    const people = interaction.fields.getTextInputValue('peopleInput')
    const location = interaction.fields.getTextInputValue('locationInput')

    // Save to database
    try {
      await databaseHandler.Outing.create({
        people,
        placesWent: location,
        date: dateTime
      })
    } catch (error) {
      interaction.reply({ content: 'Invalid date.', flags: MessageFlags.Ephemeral })
      return
    }

    if (interaction.customId === 'outingModal') {
      await interaction.reply({ content: 'Your submission was received successfully!', flags: MessageFlags.Ephemeral })
    }
  }
}

export default modalSubmit
