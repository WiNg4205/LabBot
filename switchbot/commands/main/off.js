import { SlashCommandBuilder } from 'discord.js';
import { exec } from 'child_process';

const pingCommand = {
  data: new SlashCommandBuilder()
    .setName('off')
    .setDescription('Turns off LabBot'),
  
  async execute(interaction) {
    await interaction.reply('LabBot de-activated!');

    // WARNING: closes all instances of gnome-terminal on the device.
    exec('pkill gnome-terminal');
  }
};

export default pingCommand;
