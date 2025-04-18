import { SlashCommandBuilder, MessageFlags, EmbedBuilder, bold } from 'discord.js'
import { generate } from 'random-words'

const emojiLetterMap = {
  '🇦': 'A', '🇧': 'B', '🇨': 'C', '🇩': 'D', '🇪': 'E', '🇫': 'F', '🇬': 'G', '🇭': 'H', '🇮': 'I', 
  '🇯': 'J', '🇰': 'K', '🇱': 'L', '🇲': 'M', '🇳': 'N', '🇴': 'O', '🇵': 'P', '🇶': 'Q', '🇷': 'R', 
  '🇸': 'S', '🇹': 'T', '🇺': 'U', '🇻': 'V', '🇼': 'W', '🇽': 'X', '🇾': 'Y', '🇿': 'Z'
}

const stages = [
 ` +---+   
 |   |   
 |   O   
 |  /|\\  
 |  / \\  
 |       
=========           `,
 ` +---+   
 |   |   
 |   O   
 |  /|\\  
 |  /    
 |       
=========           `,
 ` +---+   
 |   |   
 |   O   
 |  /|\\  
 |       
 |       
=========           `,
 ` +---+   
 |   |   
 |   O   
 |  /|  
 |       
 |       
=========           `,
 ` +---+   
 |   |   
 |   O   
 |   |   
 |       
 |       
=========           `,
 ` +---+   
 |   |   
 |   O   
 |       
 |       
 |       
=========           `,
 ` +---+   
 |   |   
 |       
 |       
 |       
 |       
=========           `,
 ` +---+   
 |       
 |       
 |       
 |       
 |      
=========          `
]

// Find the indices of the letter in the word
function search (word, letter) {
  const indices = []
  for (let i = 0; i < word.length; i++) {
    if (word[i].toUpperCase() === letter) {
      indices.push(i)
    }
  }
  return indices
}

// Return the display string with the guessed letters replaced
function replaceWord (wordSplit, word, indices) {
  for (const index of indices) {
    wordSplit[index] = word.charAt(index).toUpperCase()
  }
  return wordSplit.join(' ')
}

const hangmanCommand = {
  data: new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Play hangman!')
    .addBooleanOption(option =>
      option.setName('multiplayer')
        .setDescription('singleplayer or multiplayer')
        .setRequired(true))
    .addBooleanOption(option =>
      option.setName('hardmode')
        .setDescription('hardmode or normal')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('word')
        .setDescription('the word to guess')
        .setRequired(false)),
  /**
   * @param {Object} param0
   * @param {import('discord.js').ChatInputCommandInteraction} param0.interaction
  */
  async execute (interaction) {
    const isMultiplayer = interaction.options.getBoolean('multiplayer')
    let word
    if (!isMultiplayer) {
      word = generate({ minLength: 5, maxLength: 10 })
    } else {
      word = interaction.options.getString('word')
      if (!word) {
        return interaction.reply({
          content: 'Please provide a word to guess!',
          flags: MessageFlags.Ephemeral
        })
      }
    } 

    const displayWord = word.split('').map(() => '_').join(' ')
    let stage
    if (interaction.options.getBoolean('hardmode')) {
      stage = stages.length - 3
    } else {
      stage = stages.length - 1
    }
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Hangman')
      .setDescription(`\`\`\`${stages[stage]}\n\nWord\n${displayWord}\`\`\``)
      .addFields(
        { name: 'Guessed Letters', value: 'None' },
        { name: 'How to play', value: 'React with the regional indicators 🇦 to guess a letter!' }
      )
      .setTimestamp()

    const response = await interaction.reply({
      embeds: [embed],
      withResponse: true
    })

    const guessedLetters = []
    const wordSplit = word.split('').map(() => '_')
    let ended = false

    const filter = (reaction) => {
      return reaction.emoji.name in emojiLetterMap
    }
    const collector = response.resource.message.createReactionCollector({ filter, idle: 240_000 })

    collector.on('collect', async (reaction) => {
      const letter = emojiLetterMap[reaction.emoji.name]
      if (guessedLetters.includes(letter)) {
        return
      }
      guessedLetters.push(letter)

      embed.setFields(
        { name: 'Guessed Letters', value: guessedLetters.join(' ') },
        { name: 'How to play', value: 'React with the regional indicators 🇦 to guess a letter!' }
      )

      // Progress game
      const indices = search(word, letter)
      const displayWord = replaceWord(wordSplit, word, indices)
      if (indices.length === 0) {
        stage--
      }

      let content
      if (stage === 0) {
        ended = true
        content = `You lost! The word was ${bold(word.toUpperCase())}`
      } else if (!wordSplit.includes('_')) {
        ended = true
        content = `You won! The word was ${bold(word.toUpperCase())}`
      }

      embed.setDescription(`\`\`\`${stages[stage]}\n\nWord\n${displayWord}\`\`\``)
      await interaction.editReply({
        content,
        embeds: [embed],
        components: []
      })

      if (ended) {
        collector.stop()
      }
    })

    collector.on('end', () => {
      // Idled out
      if (!ended) {
        interaction.editReply({
          content: 'Game timed out!',
          embeds: [embed],
          components: []
        })
      }
    })
  }
}

export default hangmanCommand
