import { SlashCommandBuilder, ActionRowBuilder, UserSelectMenuBuilder, ButtonBuilder, ButtonStyle, ComponentType, MessageFlags } from 'discord.js'
import databaseHandler from '../../data.js'
import members from '../../members.js'

async function addGame (gameType, date, results) {
  const game = await databaseHandler.Game.create({
    game: gameType,
    date,
    results
  })

  // Add game to outing
  const objectId = game._id
  const query = { date }
  await databaseHandler.Outing.findOneAndUpdate(query, { $push: { games: objectId } }, { new: true, upsert: false })

  // Update player scores and winrate
  results.forEach(async (value, key) => {
    await databaseHandler.Player.findOneAndUpdate({ name: key }, { $inc: { gamesWon: value, gamesPlayed: 1 } })
    const player = await databaseHandler.Player.findOne({ name: key })
    const winRate = ((player.gamesWon / player.gamesPlayed) * 100).toFixed(2)
    await databaseHandler.Player.findOneAndUpdate({ name: key }, { $set: { winRate } })
  })
}

const gameCommand = {
  data: new SlashCommandBuilder()
    .setName('game')
    .setDescription('store a game result, requires /outing first')
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
    const date = new Date(interaction.options.get('date').value)

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
            confirmed = true
            if (!finalPlayers || !finalWinners) {
              i.reply({ content: 'Select at least 1 player or winner.', flags: MessageFlags.Ephemeral })
              return
            }
            i.reply({ content: 'Confirmed.', flags: MessageFlags.Ephemeral })
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

        const resultsArr = Array.from(results).sort((a, b) => b[1] - a[1])
        const sortedResults = new Map(resultsArr)
        await addGame(game, date, sortedResults)
      })
    } else {
      if (!interaction.options.get('results')) {
        interaction.reply({ content: 'You must provide results for this game.', flags: MessageFlags.Ephemeral })
        return
      }

      const orderResults = interaction.options.get('results').value
      const userIds = orderResults.match(/\d+/g) // Only keep numbers from the string
      const results = new Map()
      userIds.forEach((element, index) => {
        const name = members[element]
        const points = (1 - (1 / (userIds.length - 1) * index)).toFixed(2)
        results.set(name, points)
      })

      await addGame(game, date, results)
      interaction.reply({ content: 'Game added successfully.', flags: MessageFlags.Ephemeral })
    }
  }
}

export default gameCommand
