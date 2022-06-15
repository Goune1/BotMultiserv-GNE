const Discord = require('discord.js')

module.exports= {
    name: 'embed' ,
    run: async(Client, message, args, config) => { 
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')
        let embedBeforeEdit = new Discord.MessageEmbed()
            .setTitle("Titre par défaut")
            .setDescription("Description par défaut")
        let msgEmbedForEditing = await message.channel.send(embedBeforeEdit)
        const msgwait = await message.channel.send("Veuillez patienter la fin de l'ajout des réactions.")
        await Promise.all(['✏️','💬','🕵️','🔻','🔳','🕙','🌐','🔵','↩️','✅', '❌'].map(r => msgwait.react(r)));
        await msgwait.edit(`:pencil2: Modifier le titre\n:speech_balloon: Modifier la description\n:detective: Modifier l'auteur\n:small_red_triangle_down: Modifier le footer\n:white_square_button: Modifier le thumbnail\n:clock10: Ajouter un timestamp\n:globe_with_meridians: Modifier l'url\n:blue_circle: Modifier la couleur\n:leftwards_arrow_with_hook: Ajouter un field\n:white_check_mark: Envoyer l'embed\n:x: Supprimer l'embed en cours`)  

        const filterReaction = (reaction, user) => user.id===message.author.id&&!user.bot;
        const filterMessage = (m) => m.author.id===message.author.id&&!m.author.bot;
        const collectorReaction = await new Discord.ReactionCollector(msgwait, filterReaction);
        collectorReaction.on('collect', async reaction => {
            switch(reaction._emoji.name) {
                case '✏️':
                    const msgQuestionTitle = await message.channel.send("Quel est votre titre ?")
                    const title = (await message.channel.awaitMessages(filterMessage, {max: 1, time: 60000})).first()
                    title.delete()
                    msgQuestionTitle.delete()
                    embedBeforeEdit.setTitle(title.content);
                    msgEmbedForEditing.edit(embedBeforeEdit)
                break;  
                case '💬':
                    const msgQuestionDescription = await message.channel.send("Quelle est votre description ?")
                    const description = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    description.delete()
                    msgQuestionDescription.delete()
                    embedBeforeEdit.setDescription(description.content)
                    msgEmbedForEditing.edit(embedBeforeEdit)
                break; 
                case '🕵️':
                    const msgQuestionAuthor = await message.channel.send("Qui est votre auteur ?")
                    const author = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    author.delete()
                    msgQuestionAuthor.delete()
                    embedBeforeEdit.setAuthor(author.content)
                    msgEmbedForEditing.edit(embedBeforeEdit) 
                break;
                case '🔻':
                    const msgQuestionFooter = await message.channel.send("Quel est votre footer ?")
                    const footer = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    footer.delete()
                    msgQuestionFooter.delete()
                    embedBeforeEdit.setFooter(footer.content)
                    msgEmbedForEditing.edit(embedBeforeEdit)   
                break;
                case '🔳':
                    const msgQuestionThumbnail = await message.channel.send("Quelle est votre thumbnail ?")
                    const thumbnail = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    if(!thumbnail.content.includes('http') || !thumbnail.content.includes('https')) return message.channel.send("Thumbnail incorrecte")
                    msgQuestionThumbnail.delete()
                    thumbnail.delete()
                    embedBeforeEdit.setThumbnail(thumbnail.content)
                    msgEmbedForEditing.edit(embedBeforeEdit)   
                break;
                case '🕙':
                    embedBeforeEdit.setTimestamp();
                    msgEmbedForEditing.edit(embedBeforeEdit)
                break;
                case '🌐':
                    const msgQuestionLien = await message.channel.send("Quel est votre lien ?")
                    const lien = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    if(!lien.content.startsWith('http') || !lien.content.startsWith('https')) return message.channel.send("Votre lien doit commencer par `http` ou `https`.")
                    msgQuestionLien.delete()
                    lien.delete()
                    embedBeforeEdit.setURL(lien.content)
                    msgEmbedForEditing.edit(embedBeforeEdit) 
                break;   
                case '🔵':
                    const msgQuestionColor = await message.channel.send("Quelle est la couleur que vous désirez ?")
                    const color = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    msgQuestionColor.delete()
                    color.delete()
                    embedBeforeEdit.setColor(color.content)
                    msgEmbedForEditing.edit(embedBeforeEdit)  
                break;
                case '↩️':
                    const msgQuestionField = await message.channel.send("Quel est le titre de votre field ?")
                    const titlefield = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    msgQuestionField.delete()
                    titlefield.delete()
                    const msgQuestionDescField = await message.channel.send("Quel est la description de votre field ?")
                    const descfield = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    msgQuestionDescField.delete()
                    descfield.delete()
                    embedBeforeEdit.addField(titlefield.content, descfield.content)
                    msgEmbedForEditing.edit(embedBeforeEdit)   
                break;
                case '✅':
                    const msgQuestionChannel = await message.channel.send("Veuillez indiquer l'identifiant du message où vous souhaiter envoyer l'embed.")
                    const channel = (await message.channel.awaitMessages(filterMessage, {max : 1, time: 60000})).first()
                    msgQuestionChannel.delete()
                    channel.delete()
                    if(!message.guild.channels.cache.get(channel.content)) return message.channel.send('Salon invalide !')
                    else {
                        Client.channels.cache.get(channel.content).send(embedBeforeEdit);
                        //await embedBeforeEdit.delete()
                        await msgwait.delete()
                        message.channel.send(`Voilà le résultat de votre embed qui a été envoyé dans le salon : **${channel.content}**`)
                    }
                break;  
                case '❌':
                    msgEmbedForEditing.delete()
                    msgwait.delete()
                    message.delete()
                break;  

            } 
        })
	}
}