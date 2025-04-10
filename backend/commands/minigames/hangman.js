import { SlashCommandBuilder, MessageFlags, EmbedBuilder } from 'discord.js'
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

const hangmanCommand = {
  data: new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Play hangman!')
    .addBooleanOption(option =>
      option.setName('multiplayer')
        .setDescription('singleplayer or multiplayer')
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
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Hangman')
      .setDescription(`\`\`\`${stages[stages.length - 1]}\n\nWord\n${displayWord}\`\`\``)
      .addFields(
        { name: 'Guessed Letters', value: '' }
      )
      .setTimestamp()

    const response = await interaction.reply({
      embeds: [embed],
      withResponse: true
    })

    const filter = (reaction) => {
      return reaction.emoji.name in emojiLetterMap
    }
    const collector = response.resource.message.createReactionCollector({ filter, idle: 10_000 })

    collector.on('collect', (reaction, user) => {
      console.log(emojiLetterMap[reaction.emoji.name])
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`)
    })

    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`)
    })
  }
}

export default hangmanCommand

