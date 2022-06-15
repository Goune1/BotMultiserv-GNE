const Discord = require('discord.js')

module.exports= {
    name: 'mute' ,
    run: async(Client, message, args, config) => { 
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.') 
    const member = message.mentions.members.first()
    if (!member) return message.channel.send('Veuillez mentionner le membre à mute.')
    if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez mute le propriétaire du serveur.')
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mute ce membre.')
    if (!member.manageable) return message.channel.send('Le bot ne peut pas mute ce membre.')
    const reason = args.slice(2).join(' ') || 'Aucune raison fournie.'
    let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
    if (!muteRole) {
        muteRole = await message.guild.roles.create({
            data: {
                name: 'Muted',
                permissions: 0
            }
        })
        message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
            SEND_MESSAGES: false,
            CONNECT: false,
            ADD_REACTIONS: false
        }))
    }
    await member.roles.add(muteRole)
    var embed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle("Réduction au silence")
    .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
    .addField("Succès", "**" + `${member}` + "**" + " a été **réduit au silence** avec **succès.** pour la raison : " + `${reason}`, true)
    message.channel.send(embed);
    if(config[message.guild.id]["statut-logs"] == true) {
        if(config[message.guild.id]["id_logs"]) {
    message.guild.channels.cache.get(config[message.guild.id]["id_logs"]).send(new Discord.MessageEmbed()
            .setAuthor(`[MUTE DEF] ${member.user.tag}`, member.user.displayAvatarURL())
            .addField('Utilisateur', member, true)
            .addField('Modérateur', message.author, true)
            .addField('Raison', reason, true)
            .addField('Durée', '∞', true))
        }
    }
	}
}