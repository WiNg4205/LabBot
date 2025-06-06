import { SlashCommandBuilder, ActionRowBuilder, UserSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType, MessageFlags } from 'discord.js'
import databaseHandler from '../../data.js'
import members from '../../members.js'

async function addGame (gameType, date, results, interaction) {
  let game
  try {
    game = await databaseHandler.Game.create({
      game: gameType,
      date,
      results
    })
  } catch (error) {
    // If the date is before 2022-01-01
    if (gameType === 'pool') {
      interaction.followUp({ content: 'Invalid date.', flags: MessageFlags.Ephemeral })
    } else {
      interaction.reply({ content: 'Invalid date.', flags: MessageFlags.Ephemeral })
    }
    return false
  }

  // Add game to outing
  const objectId = game._id
  const query = { date }
  await databaseHandler.Outing.findOneAndUpdate(query, { $push: { games: objectId } }, { new: true, upsert: false })

  return true
}

const gameCommand = {
  data: new SlashCommandBuilder()
    .setName('game')
    .setDescription('Store a game result, requires /outing first')
    .addStringOption(option =>
      option.setName('game')
        .setDescription('game played')
        .setRequired(true)
        .addChoices(
          { name: 'Pool', value: 'pool' },
          { name: 'Cards', value: 'cards' },
          { name: 'Bowling', value: 'bowling' }
        ))
    .addStringOption(option =>
      option.setName('date')
        .setDescription('YYYY-MM-DD')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('results')
        .setDescription('user mentions in order of winners')
        .setRequired(false)),

  async execute (interaction) {
    const game = interaction.options.get('game').value
    let date = interaction.options.get('date').value
    if (date.split('-').length !== 3) {
      interaction.reply({ content: 'Invalid date format.', flags: MessageFlags.Ephemeral })
      return
    }
    date = new Date(date)

    if (game === 'pool') {
      const userSelectPlay = new UserSelectMenuBuilder()
        .setCustomId('players')
        .setPlaceholder('Select people that played.')
        .setMinValues(1)
        .setMaxValues(10)

      const userSelectWin = new UserSelectMenuBuilder()
        .setCustomId('winners')
        .setPlaceholder('Select people that won.')
        .setMinValues(1)
        .setMaxValues(10)

      const confirm = new ButtonBuilder()
        .setCustomId('confirm')
        .setLabel('Confirm selection')
        .setStyle(ButtonStyle.Success)

      const cancel = new ButtonBuilder()
        .setCustomId('cancel')
        .setLabel('Cancel')
        .setStyle(ButtonStyle.Secondary)

      const row1 = new ActionRowBuilder()
        .addComponents(userSelectPlay)
      const row2 = new ActionRowBuilder()
        .addComponents(userSelectWin)
      const row3 = new ActionRowBuilder()
        .addComponents(confirm, cancel)

      const response = await interaction.reply({
        content: '',
        components: [row1, row2, row3]
      })

      let finalPlayers // Contains last selection made for both select menus
      let finalWinners
      // Collect a confirm/cancel interaction and stop both collectors at this point
      let confirmed = false
      const buttonCollector = response.createMessageComponentCollector({ componentType: ComponentType.Button, idle: 120_000 })
      buttonCollector.on('collect', i => {
        if (i.user.id === interaction.user.id) {
          if (i.customId === 'confirm') {
            if (!finalPlayers || !finalWinners) {
              i.reply({ content: 'Select at least 1 player or winner.', flags: MessageFlags.Ephemeral })
              return
            }
            confirmed = true
            i.deferUpdate()
            buttonCollector.stop()
          } else if (i.customId === 'cancel') {
            i.reply({ content: 'Cancelled.', flags: MessageFlags.Ephemeral })
            buttonCollector.stop()
          }
        } else {
          i.reply({ content: 'This button isn\'t for you :(', flags: MessageFlags.Ephemeral })
        }
      })

      buttonCollector.on('end', (collected, reason) => {
        if (reason === 'idle') {
          interaction.editReply({ content: 'Timed out.', components: [] })
        } else {
          interaction.deleteReply()
        }
        selMenuCollector.stop()
      })

      // Collect all interactions with select menus
      const selMenuCollector = response.createMessageComponentCollector({ componentType: ComponentType.UserSelect })
      selMenuCollector.on('collect', i => {
        if (i.user.id === interaction.user.id) {
          if (i.customId === 'players') {
            finalPlayers = i.users
          } else if (i.customId === 'winners') {
            finalWinners = i.users
          }
          i.deferUpdate()
        } else {
          i.reply({ content: 'This isn\'t for you :(', flags: MessageFlags.Ephemeral })
        }
      })

      selMenuCollector.on('end', async collected => {
        if (!confirmed) {
          return
        }

        const results = new Map()
        finalPlayers.forEach(function (value, key) {
          if (!finalWinners.has(value.id)) {
            results.set(members[value.id], 0)
          } else {
            results.set(members[value.id], 1)
          }
        })

        // Sort results by value (points) in descending order
        const resultsArr = Array.from(results).sort((a, b) => b[1] - a[1])
        const sortedResults = new Map(resultsArr)
        const success = await addGame(game, date, sortedResults, interaction)
        if (success) {
          interaction.followUp({ content: 'Game added successfully.', flags: MessageFlags.Ephemeral })
        }
      })
    } else {
      if (!interaction.options.get('results')) {
        interaction.reply({ content: 'You must provide results for this game.', flags: MessageFlags.Ephemeral })
        return
      }

      const orderResults = interaction.options.get('results').value
      const userIds = orderResults.match(/\d+/g) // Only keep numbers from the string
      if (userIds.length < 2) {
        interaction.reply({ content: 'You must provide at least 2 players in results.', flags: MessageFlags.Ephemeral })
        return
      }

      const results = new Map()
      let isValid = true
      // Calculate points for each player
      userIds.forEach((element, index) => {
        const name = members[element]
        if (!name) {
          interaction.reply({ content: 'Invalid user mention.', flags: MessageFlags.Ephemeral })
          isValid = false
          return
        }
        const points = (1 - (1 / (userIds.length - 1) * index)).toFixed(2)
        results.set(name, points)
      })

      if (!isValid) {
        return
      }

      const success = await addGame(game, date, results, interaction)
      if (success) {
        interaction.reply({ content: 'Game added successfully.', flags: MessageFlags.Ephemeral })
      }
    }
  }
}

export default gameCommand
