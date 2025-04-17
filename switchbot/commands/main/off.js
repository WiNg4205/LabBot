import { SlashCommandBuilder } from 'discord.js';
import { exec } from 'child_process';

const pingCommand = {
  data: new SlashCommandBuilder()
    .setName('off')
    .setDescription('Turns off LabBot'),
  
  async execute(interaction) {
    await interaction.reply('LabBot de-activated!');

    // WARNING: closes all instances of gnome-terminal on the device.
    exec('pkill gnome-terminal', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error opening terminal: ${err}`);
        return;
      }
      if (stderr) {
        console.error(`Terminal error: ${stderr}`);
      }
    });
  }
};

export default pingCommand;
