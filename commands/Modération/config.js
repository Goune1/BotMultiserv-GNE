const Discord = require('discord.js')
const fs = require("fs")


module.exports= {
    name: 'config' ,
    run: async(Client, message, args, config, bienvenue_statut, logs_statut, roleBienvenue_statut) => { 
        function Savebdd() {
            fs.writeFile("./config.json", JSON.stringify(config, null, 4), (err) => {
                if(err) message.channel.send("Une erreur est survenue !")
            })
        }

        if(config[message.guild.id]["message_bienvenue"]) {
            welcomeMessage = config["message_bienvenue"]
        } else {
            welcomeMessage = "Bienvenue sur le serveur"
        }
        if(config[message.guild.id]["statut-logs"] == true) {
            logs_statut = "Activés"
        }
        if(config[message.guild.id]["statut-logs"] == false) {
            logs_statut = "Désactivés"
        }
        if(config[message.guild.id]["statut-bienvenue"] == true) {
            bienvenue_statut = "Activés"
        }
        if(config[message.guild.id]["statut-bienvenue"] == false) {
            bienvenue_statut = "Désactivés"
        }
        if(config[message.guild.id]["statut-suggest"] == true) {
            suggest_statut = "Activé"
        }
        if(config[message.guild.id]["statut-suggest"] == false) {
            suggest_statut = "Désactivé"
        }
        if(config[message.guild.id]["role-bienvenue"] == true) {
            roleBienvenue_statut = "Activé"
        }
        if(config[message.guild.id]["role-bienvenue"] == false) {
            roleBienvenue_statut = "Désactivé"
        }

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission d'effectuer cette commande (admins)")
        const filterMessage = (m) => m.author.id===message.author.id&&!m.author.bot;
        message.channel.send(new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setDescription("Quelle partie du bot souhaitez vous configurer ? (`help` si vous ne savez pas)"))
        const configStatut = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
        

        if(configStatut.content == "help") {  message.channel.send(new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true}))
        .setColor("RED")
        .setDescription("Bienvenue dans la configuration, voici toutes les configurations possibles !")
        .addField("Prefix", "Pour changer de prefix, faites `prefix`")
        .addField("Actuellement le prefix est :", config[message.guild.id]["prefix"])
        .addField("Bienvenue", "Pour activer ou désactiver les messages de bienvenue, faites `bienvenue`")
        .addField("Actuellement les messages de bienvenue sont :", bienvenue_statut)
        .addField("Logs", "Pour activer ou désactiver les logs, faites `logs`")
        .addField("Actuellement les logs sont :", logs_statut)
        .addField("Suggestions", "Pour activer ou désactiver le système de suggestion, faites `suggest` puis `on` ou `off`")
        .addField("Actuellement le système de suggestion est :", suggest_statut /*EN MAINTENANCE*/)
        .addField("Salon des suggestions", "Pour changer le salon des suggestions, faites `suggest` puis `setup` puis l'identifiant du nouveau salon")
        .addField("Rôle automatique", "Pour activer ou désactiver le système d'ajout automatique de rôle lorsque qu'un membre rejoins le serveur, faites `role_bienvenue` puis `on` ou `off`")
        .addField("Actuellement l'ajout de rôle automatique est :", roleBienvenue_statut)
        .addField("Sélection du rôle automatique", "Pour changer le rôle à ajouter automatiquement, faites `role_bienvenue` puis `setup` puis l'identifiant du nouveau rôle")
        .setFooter("Configuration")
        .setTimestamp())

        }
        
           else if (configStatut.content === "prefix") {
                message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Que voulez vous comme nouveau préfix ?"))
                const configPrefix = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                config[message.guild.id]["prefix"] = configPrefix.content
                Savebdd();
                return message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`Le prefix du serveur est maintenant : **${configPrefix.content}**`))
            
            }

            else if (configStatut.content == "logs") {
                message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Voulez vous allumer le système de logs (`on`), l'éteindre (`off`) ou configurer le salon (`setup`) ?")) 
                const configLogs = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                if(configLogs.content == "on") {
                    config[message.guild.id]["statut-logs"] = true
                    Savebdd();
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("Les logs sont désormais activés !"))
                }
                if(configLogs.content == "off"){
                    config[message.guild.id]["statut-logs"] = false
                    Savebdd(); 
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("Les logs sont désormais désactivés !")) 
                }
                if(configLogs.content == "setup") {
                    message.channel.send(new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Quel est l'identifiant du nouveau salon pour les logs ?`))
                    const logsChannel = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    config[message.guild.id]["id_logs"] = logsChannel.content
                    Savebdd();
                    return message.channel.send(new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`L'identifiant du salon logs est maintenant : **${logsChannel.content}**`))
            }
        }

        else if (configStatut.content == "bienvenue") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Voulez vous allumer les messages de bienvenue (`on`), les éteindre (`off`) ou configurer le salon (`setup`) ?"))
            const configWelcome = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()

            if(configWelcome.content == "on") {
                config[message.guild.id]["statut-bienvenue"] = true
                Savebdd();
                return message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Les messages de bienvenue sont désormais activés !")) 
            }
            if(configWelcome.content == "off"){
                config[message.guild.id]["statut-bienvenue"] = false
                Savebdd(); 
                return message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Les messages de bienvenue sont désormais désactivés !")) 
            }
            if(configWelcome.content == "setup") {
                message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Quel est l'identifiant du nouveau salon pour les messages de bienvenue ?"))
                const welcomeChannel = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                config[message.guild.id]["id_bienvenue"] = welcomeChannel.content
                Savebdd()
                message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`Le salon des messages de bienvenue est maintenant : **${welcomeChannel.content}**`))
                }

        }
        

        else if (configStatut.content == "role_bienvenue") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Voulez vous allumer l'ajout d'un rôle lorsque qu'un membre rejoins le serveur (`on`), l'éteindre (`off`) ou changer le rôle à ajouter (`setup`) ?"))
            const configRoleBienvenue = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
            if(configRoleBienvenue.content == "on") {
                config[message.guild.id]["role-bienvenue"] = true
                Savebdd();
                if(config[message.guild.id]["role_bienvenue"] == undefined) {
                return message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("L'ajout automatique de rôle lorsqu'un membre rejoins le serveur est désormais activé (veuillez maitenant définir le rôle a ajouter en faisant `+config` puis `role_bienvenue` puis `setup` puis l'identifiant du nouveau rôle"))
                }
                else { 
                return message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("L'ajout automatique de rôle lorsqu'un membre rejoins le serveur est désormais activé"))
                }
            }
            if(configRoleBienvenue.content == "off"){
                config[message.guild.id]["role-bienvenue"] = false
                Savebdd(); 
                return message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("L'ajout automatique de rôle lorsque qu'un membre rejoins le serveur est désormais désactivé"))
            }
            if(configRoleBienvenue.content == "setup") {
                message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Quel est l'identifiant du nouveau rôle qui s'ajoute automatiquement lorsque qu'un membre rejoins le serveur ?"))
                const newWelcomeRole = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                config[message.guild.id]["role_bienvenue"] = newWelcomeRole.content
                Savebdd()
                return message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`L'identifiant du nouveau rôle qui s'ajoute automatiquement lorsque qu'un membre rejoins le serveur est désormais : **${newWelcomeRole.content}**`))
            }
        }


        else if(configStatut.content == "suggest") {
            message.channel.send(new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Voulez vous activer le système de suggestion (`on`), l'éteindre (`off`) ou changer le salon (`setup`) ?"))
            const configSuggest = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
            if(configSuggest.content == "on") {
                config[message.guild.id]["statut-suggest"] = true
                Savebdd();
                message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`Le système de suggestion est désormais activé !`))
            }
            if(configSuggest.content == "off"){
                config[message.guild.id]["statut-suggest"] = false
                Savebdd(); 
                message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`Le système de suggestion est désormais désactivé !`))
            }
            if(configSuggest.content == "setup") {
                message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Quel est l'identifiant du nouveau salon pour les suggestions ?"))
                const suggestChannel = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                config[message.guild.id]["id_suggest"] = suggestChannel.content
                Savebdd()
                message.channel.send(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`L'identifiant du salon des suggestions est maintenant : **${suggestChannel.content}**`))

            
            }
        }

     
	}
}