const Discord = require('discord.js')
const ms = require('ms')

module.exports= {
    name: 'tempmute' ,
    run: async(Client, message, args, config) => { 
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
            var member = message.guild.member(message.mentions.users.first()) 
            if (!member) return message.channel.send('Veuillez mentionner le membre à mute.')
            if (member.id === message.guild.ownerID) return message.channel.send('Vous ne pouvez mute le propriétaire du serveur.')
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas unmute ce membre.')
            if (!member.manageable) return message.channel.send('Le bot ne peut pas mute ce membre.')
            let reason = args.slice(3).join(" ");
            if(!args[0]) return message.channel.send("Merci de mentionner l'utilisateur à tempmute !")
    
            let role = message.guild.roles.cache.find(role => role.name === "Muted");
    
            let time = args[2]
            if(!time) return message.channel.send("Veuillez rentrer une valeur temps valide !")
            let timer = ms(time)
    
            if(!reason) {
                return message.channel.send("Veuillez indiquer la raison de cette réduction au silence !")
            }
    
            member.roles.add(role.id);
    
            var embed = new Discord.MessageEmbed()
            .setTitle(`${member.user.tag}`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setColor("RED")
            .setDescription("a été **réduit au silence**")
            .addField("Réduit au silence par :", message.author.tag)
            .addField("Avec pour raison :", reason)
            .addField("Pour une durée de :", `${ms(ms(time))}`)
            message.channel.send(embed)
            message.delete()
    
            setTimeout( function () {
                member.roles.remove(role.id);
                message.channel.send(`**${member.user.tag}** est de retour de l'enfer du mute !`)
            }, timer)
            if(config[message.guild.id]["statut-logs"] == true) {
                if(config[message.guild.id]["id_logs"]) {
            message.guild.channels.cache.get(config[message.guild.id]["id_logs"]).send(new Discord.MessageEmbed()
                    .setAuthor(`[TEMPMUTE] ${member.user.tag}`, member.user.displayAvatarURL())
                    .addField('Utilisateur', member, true)
                    .addField('Modérateur', message.author, true)
                    .addField('Raison', `${reason}`, true)
                    .addField('Durée', `${ms(ms(time))}`, true))
                }
            }
	}
}