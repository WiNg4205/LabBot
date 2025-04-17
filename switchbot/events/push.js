import { Events } from 'discord.js'

const pull = {
	name: Events.MessageCreate,
	execute (message) {
		if (message.author.id === "1111618687032627203") {
            console.log("pull");
        }
		
	}
}

export default pull;
