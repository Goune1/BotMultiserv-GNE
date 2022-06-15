const Discord = require('discord.js')

module.exports= {
    name: 'stats' ,
    run: async(Client, message, args, config) => { 
        let onlines = message.guild.members.cache.filter(({
            presence
        }) => presence.status !== 'offline').size;
        let totalmembers = message.guild.members.cache.size;
        let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;

        var statsEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
        .setTitle("Statistiques du serveur :")
        .setColor("RED")
        .addField("Nombre total de membre :", totalmembers)
        .addField("Nombre de membres connectés :", onlines)
        .addField("Nombre de bots :", totalbots)
        //.setThumbnail(guild.iconURL)
        message.channel.send(statsEmbed)
	}
}