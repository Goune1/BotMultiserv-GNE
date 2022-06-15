const Discord = require('discord.js')

module.exports= {
    name: 'suggest' ,
    run: async(Client, message, args, config) => { 
        if(config[message.guild.id]["statut-suggest"] == true) {
           /* message.channel.send(new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Cette commande est actuellement en maintenance, veuillez m'excuser pour l'eventuelle gêne occasionnée"))*/
        const filterMessage = (m) => m.author.id===message.author.id&&!m.author.bot;    
        let suggestion 
        suggestion = args.slice(1).join(" ")
        if(!suggestion) {
        message.channel.send(new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("Quelle est la suggestion souhaitée ?"))
        suggestion = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()    
        }
        const embedSuggest = new Discord.MessageEmbed()
        .setTitle("Nouvelle Suggestion :")
        .addField("Suggestion de :", message.author)
        .addField("Contenu :", suggestion)
        .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setFooter("Suggestion envoyée")
        .setTimestamp()
        if(config[message.guild.id]["id_suggest"]) {
        Client.channels.cache.get(config[message.guild.id]["id_suggest"]).send(embedSuggest).then(message => {
            message.react("✅")
            message.react("❌")
        })}
        
        }
        if(config[message.guild.id]["statut-suggest" == false]) {
            message.channel.send("Le système de suggestion est actuellement désactivé. Si vous êtes un administrateur et que vous souhaitez l'activer, faites `+config` puis `suggest` puis `on`")
        }
	}
}