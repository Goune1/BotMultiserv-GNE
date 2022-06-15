const Discord = require('discord.js')

module.exports= {
    name: 'kick' ,
    run: async(Client, message, args, config) => { 
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à expulser.')
        if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez pas expulser le propriétaire du serveur.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas expulser ce membre.')
        if (!member.bannable) return message.channel.send('Le bot ne peut pas exclure ce membre.')
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        await member.kick({reason})
        var embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Bannissement")
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
            .setThumbnail(member.user.displayAvatarURL())
            .addField("Succès", `**${member.user.tag}** a été expulsé avec succès !`)
            .addField("Raison :", reason)
            message.channel.send(embed);

            if(config[message.guild.id]["statut-logs"] == true) {
                if(config[message.guild.id]["id_logs"]) {
            message.guild.channels.cache.get(config[message.guild.id]["id_logs"]).send(new Discord.MessageEmbed()
                .setAuthor(`[KICK] ${member.user.tag}`, member.user.displayAvatarURL())
                .addField('Utilisateur', member, true)
                .addField('Modérateur', message.author, true)
                .addField('Raison', reason, true)
                .addField('Durée', '∞', true))
                }
            }
	}
}