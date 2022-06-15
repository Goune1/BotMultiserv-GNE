const Discord = require('discord.js')

module.exports= {
    name: 'ratio' ,
    run: async(Client, message, args, config) => { 
        const member = message.mentions.members.first()
        if(!member) {
            message.delete()
            message.channel.send(`ratio`).then((message => {
                message.react("❤️")
                message.react("🔁")
            })) 
        }
        else {
            message.delete()
            message.channel.send(`ratio ${member}`).then((message => {
                message.react("❤️")
                message.react("🔁")
            }))
        }  
	}
}