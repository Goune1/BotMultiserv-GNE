const Discord = require('discord.js')

module.exports= {
    name: 'restart' ,
    run: async(Client, message, args, config) => { 
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission d'effectuer cette commande (admins)")
        await message.channel.send("Redémarrage du bot en cours...")
         process.exit()
	}
}