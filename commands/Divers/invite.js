const Discord = require('discord.js')

module.exports= {
    name: 'invite' ,
    run: async(Client, message, args, config) => { 
        message.channel.send(new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setColor("RED")
        .setDescription("Pour inviter le bot dans votre serveur cliquez sur le lien ci dessus !")
        .setTitle("Invitation")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=986589225027784784&permissions=1644971949559&scope=bot")
        .setTimestamp()
        .setFooter("Invitation"))
    }
}        