const Discord = require('discord.js')

module.exports= {
    name: 'unlock' ,
    run: async(Client, message, args, config) => { 
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission nécessaire pour réaliser cette commande");

        let role = message.guild.roles.cache.find(role => role.name === "@everyone");

        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!lockChannel) lockChannel = message.channel;

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
        }).catch(err => console.log(err));
        message.channel.send("J'ai unlock ce salon ! :unlock:")
	}
}