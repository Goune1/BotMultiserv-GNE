const Discord = require('discord.js')
const fs = require('fs')

module.exports= {
    name: 'changeRiotApiKey' ,
    run: async(Client, message, args, config) => { 
        function Savebdd() {
            fs.writeFile("./config.json", JSON.stringify(config, null, 4), (err) => {
                if(err) message.channel.send("Une erreur est survenue !")
            })
        }

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission d'effectuer cette commande (admins)")
        var apiKey = args[1]
        message.delete()
        if(!apiKey) return message.channel.send("Veuillez indiquer la nouvelle clée d'api Riot Games")
        config["riotApiKey"] = apiKey
        Savebdd()
        await message.channel.send("La nouvelle clée d'api a bien été enregistrée (le bot va redémarrer...)")
        process.exit()
	}
}