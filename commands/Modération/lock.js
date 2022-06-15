const Discord = require('discord.js')

module.exports= {
    name: 'lock' ,
    run: async(Client, message, args, config) => { 
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission nécessaire pour effectuer cette commande");

        let role = message.guild.roles.cache.find(role => role.name === "@everyone");
        
        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!lockChannel) lockChannel = message.channel;

        await lockChannel.updateOverwrite(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        }).catch(err => console.log(err));
        message.channel.send("J'ai lock ce salon ! :lock:")
	}
}