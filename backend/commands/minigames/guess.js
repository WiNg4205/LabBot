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

    const collector = interaction.channel.createMessageCollector({ filter, time: 15000 })
    let won = false
    collector.on('collect', message => {
      if (parseInt(message.content) === minigameHandler.game.randomNumber) {
        interaction.followUp('Congrats! You guessed the number correctly!')
        won = true
        collector.stop()
      } else {
        minigameHandler.play(message.content).then(result => interaction.followUp(result))
      }
    })

    collector.on('end', collected => {
      if (won) {
        if (collected.size === 1) {
          interaction.followUp(`You took ${collected.size} guess!`)
        } else {
          interaction.followUp(`You took ${collected.size} guesses!`)
        }
      } else {
        interaction.followUp('You ran out of time! 😔')
      }

      minigameHandler.game = null
    })
  }
}

export default guessCommand