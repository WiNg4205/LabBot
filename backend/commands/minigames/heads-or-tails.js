import { SlashCommandBuilder } from 'discord.js'
import minigameHandler from '../../minigame.js';

const coinFlip = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a coin!'),
    async execute(interaction) {
        minigameHandler.playHeadsOrTails().then(guess => interaction.reply(guess))

        const filter = response => {
            const content = response.content.toLowerCase();
            return content === 'heads' || content === 'tails';
        }

        const collector = interaction.channel.createMessageCollector({ filter, time: 30000 });
        
        collector.on('collect', message => {
            if (message.content === minigameHandler.game.result) {
                message.reply(`Correct!`);
                collector.stop();
            } else {
                message.reply(`Wrong!`);
                collector.stop();
            }
        });

    },
};

export default coinFlip;
// This command allows users to flip a coin and get a random result of either "Heads" or "Tails".
// It uses the Discord.js library to create a slash command and handle the interaction.