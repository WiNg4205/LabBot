import { Events, MessageFlags } from 'discord.js'
import databaseHandler from '../data.js'

const modalSubmit = {
  name: Events.InteractionCreate,
  async execute (interaction) {
    if (!interaction.isModalSubmit()) return

    if (interaction.customId === 'outingModal') {
      await interaction.reply({ content: 'Your submission was received successfully!', flags: MessageFlags.Ephemeral })
    }

    const date = interaction.fields.getTextInputValue('dateInput')
    // Comma separated
	  let people = interaction.fields.getTextInputValue('peopleInput')
    people = people.replaceAll(/ /g, '')
    people = people.split(',')
    const location = interaction.fields.getTextInputValue('locationInput')

    // Save to database
    await databaseHandler.Outing.create({
      people,
      placesWent: location,
      date
    })
  }
}

export default modalSubmit
