import { SlashCommandBuilder } from 'discord.js';
import { exec } from 'child_process';

const pingCommand = {
  data: new SlashCommandBuilder()
    .setName('on')
    .setDescription('Turns on LabBot'),
  
  async execute(interaction) {
    await interaction.reply('LabBot activated!');

    exec('gnome-terminal -- bash -c "./on.sh; exec bash"', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error opening terminal: ${err}`);
        return;
      }
      console.log(`Terminal output: ${stdout}`);
      if (stderr) {
        console.error(`Terminal error: ${stderr}`);
      }
    });
  }
};

export default pingCommand;
