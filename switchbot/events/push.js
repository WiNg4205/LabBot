import { Events } from 'discord.js'
import { exec } from 'child_process'

const pull = {
	name: Events.MessageCreate,
	execute (message) {
		if (message.author.id === "1111618687032627203") {
            exec('gnome-terminal -- bash -c "./pull.sh"');
        }
		
	}
}

export default pull;
