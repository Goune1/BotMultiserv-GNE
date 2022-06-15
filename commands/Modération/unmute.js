const Discord = require('discord.js')

module.exports= {
    name: 'unmute' ,
    run: async(Client, message, args, config) => { 
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à unmute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez unmute le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unmute ce membre.')
        if (!member.manageable) return message.channel.send('Le bot ne peut pas unmute ce membre.')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channel.send('Il n\'y a pas de muterole.')
        await member.roles.remove(muteRole)
            var unmutembed = new Discord.MessageEmbed()
            .setColor('RED')
            .setAuthor("")
            .setDescription(`${member} a été unmute !`)
        message.channel.send(unmutembed)
        if(config[message.guild.id]["statut-logs"] == true) {
            if(config[message.guild.id]["id_logs"]) {
        message.guild.channels.cache.get(config[message.guild.id]["id_logs"]).send(new Discord.MessageEmbed()
            .setAuthor(`[UNMUTE] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true))
            }
        }
	}
}