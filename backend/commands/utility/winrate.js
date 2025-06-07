import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import databaseHandler from '../../data.js'

async function getWinRate (game) {
  const results = []
  const players = await databaseHandler.Player.find()
  players.forEach(player => {
    results.push({ name: player.name, points: 0, numGames: 0 })
  })

  let games
  if (!game) {
    games = await databaseHandler.Game.find()
  } else {
    games = await databaseHandler.Game.find({ game })
  }

  // Calculate game win rate for each player
  games.forEach(game => {
    game.results.forEach((value, key) => {
      results[results.findIndex(player => player.name === key)].points += value
      results[results.findIndex(player => player.name === key)].numGames += 1
    })
  })
  results.forEach(player => {
    player.winRate = ((player.points / player.numGames) * 100).toFixed(2)
  })

  return results
}

const winrateCommand = {
  data: new SlashCommandBuilder()
    .setName('winrate')
    .setDescription("Returns everyone's win rate!")
    .addStringOption(option =>
      option.setName('game')
        .setDescription('game')
        .setRequired(false)
        .addChoices(
          { name: 'Pool', value: 'pool' },
          { name: 'Cards', value: 'cards' },
          { name: 'Bowling', value: 'bowling' }
        )),
  async execute (interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Win rate')
      .addFields({ name: '\u200B', value: '\u200B' })
      .setThumbnail(interaction.guild.iconURL())
      .setTimestamp()

    let game
    if (interaction.options.getString('game')) {
      game = interaction.options.getString('game')
      embed.setDescription(`Win rate for ${game}`)
      const playerWinRates = await getWinRate(game)
      for (let i = 0; i < playerWinRates.length; i++) {
        embed.addFields({ name: playerWinRates[i].name, value: playerWinRates[i].winRate + '%' })
      }
    } else {
      embed.setDescription('Win rate across all games')
      // Get players overall win rate
      const playerWinRates = await getWinRate(null)
      for (let i = 0; i < playerWinRates.length; i++) {
        embed.addFields({ name: playerWinRates[i].name, value: playerWinRates[i].winRate + '%' })
      }
    }

    interaction.reply({ embeds: [embed] })
  }
}

export default winrateCommand
