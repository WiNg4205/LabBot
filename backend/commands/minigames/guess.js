import { SlashCommandBuilder } from 'discord.js'
import minigameHandler from '../../minigame.js'

const guessCommand = {
  data: new SlashCommandBuilder()
    .setName('guess')
    .setDescription('Guess the number game!'),
  async execute (interaction) {
    minigameHandler.playGuessTheNumber().then(guess => interaction.reply(guess))

    const filter = response => {
      return !isNaN(response.content)
    }

    const collector = interaction.channel.createMessageCollector({ filter, time: 30000 })
    let won = false

    collector.on('collect', message => {
      if (parseInt(message.content) === minigameHandler.game.randomNumber) {
        message.reply('Congrats! You guessed the number correctly!')
        won = true
        collector.stop()
      } else {
        minigameHandler.play(message.content).then(result => message.reply(result))
      }
    })

    collector.on('end', collected => {
      if (won) {
        if (collected.size === 1) {
          collected.last().reply(`You took ${collected.size} guess!`)
        } else {
          collected.last().reply(`You took ${collected.size} guesses!`)
        }
      } else {
        interaction.followUp('You ran out of time! 😔')
      }

      minigameHandler.game = null
    })
  }
}

export default guessCommand
