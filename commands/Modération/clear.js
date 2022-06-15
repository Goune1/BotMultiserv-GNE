const Discord = require('discord.js')

module.exports= {
    name: 'clear' ,
    run: async(Client, message, args, config) => { 
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        let clear_messages
        if(args[1] == undefined){
            message.delete();
            message.channel.send("Nombre de message non ou mal saisi.")
        }
        if(args[1] > 99) return message.channel.send("Vous ne pouvez que supprimer 99 messages à la fois !")
        else {
           let number = parseInt(args[1]);
           
          if(isNaN(number)) {
              message.delete();
              message.channel.send("Nombre de message non ou mal saisi.")
          }
          else {
              message.channel.bulkDelete(number + 1).then(messages => {
                  if(messages.size == "1") {
                    clear_messages = "message"
                  }
                  else {
                      clear_messages = "messages"
                  }
                  message.channel.send(`Suppression de ${messages.size - 1} ${clear_messages} réussie !`)

                  if(config[message.guild.id]["statut-logs"] == true) {
                    if(config[message.guild.id]["id_logs"]) {
                  message.guild.channels.cache.get(config[message.guild.id]["id_logs"]).send(new Discord.MessageEmbed()
                  .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ format: 'png', dynamic: true})}`)
                  .setTitle("Clear de messages")
                  .addField("Nombre de message :", messages.size - 1)
                  .addField("Salon :", message.channel))
                    }
                  }
              })
          }
        }
	}   
}