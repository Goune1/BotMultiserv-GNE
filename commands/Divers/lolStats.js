const Discord = require('discord.js')
const axios = require('axios')


module.exports= {
    name: 'lol' ,
    run: async(Client, message, args, config) => { 
        const riotApiKey = config["riotApiKey"]
          //récupération du pseudo du joueur
          var name = args.slice(1).join(" ")
          if(!name) return 
  
          // récupération des données personnelles de l'utilisateur indiqué via discord + return
          const profile = await axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotApiKey).catch(err => {
             return message.channel.send("Une erreur est survenue (sûrement un problème dans l'orthographe du pseudo)")
          })
  
          // identifiant du joueur
          if(profile) {
          var encryptedId = profile.data.id 
          } 
          
          // récupération et listage de toutes les informations ranked du joueur
          let rank
          if(profile) {
              rank = await axios.get('https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encryptedId + "?api_key=" + riotApiKey);
          } 
          else return message.channel.send("Ce pseudo a été mal écrit ou n'existe pas")
          
          //variables 
          let soloQrankTotal
          let flexRankTotal
          let soloQtier
          let soloQrank
          let soloQlp
          let flexRank
          let flexTier
          let flexLp
          let soloQwins
          let soloQlosses
          let soloQtotal
          let soloQratio
          let soloQratioFinal
          let soloQfinal
          let flexWins
          let flexLosses
          let flexTotal
          let flexRatio
          let flexRatioFinal
          let flexFinal
          
      
          // essais en fonction de où est placer chaque type de queue dans le JSON que l'api nous envoie
          try{
          if(rank.data[0].queueType == "RANKED_SOLO_5x5") {
              soloQtier = rank.data[0].tier
              soloQrank = rank.data[0].rank
              soloQlp = rank.data[0].leaguePoints
              soloQwins = rank.data[0].wins
              soloQlosses = rank.data[0].losses
          }} catch{} 
  
          try{
          if(rank.data[1].queueType == "RANKED_SOLO_5x5") {
              soloQtier = rank.data[1].tier
              soloQrank = rank.data[1].rank
              soloQlp = rank.data[1].leaguePoints
              soloQwins = rank.data[1].wins
              soloQlosses = rank.data[1].losses
          }} catch{}
          
          try {
          if(rank.data[2].queueType == "RANKED_SOLO_5x5") {
              soloQtier = rank.data[2].tier
              soloQrank = rank.data[2].rank
              soloQlp = rank.data[2].leaguePoints
              soloQwins = rank.data[2].wins
              soloQlosses = rank.data[2].losses
          }} catch{}
          
          try {
          if(rank.data[0].queueType == "RANKED_FLEX_SR") {
              flexTier = rank.data[0].tier
              flexRank = rank.data[0].rank
              flexLp = rank.data[0].leaguePoints
              flexWins = rank.data[0].wins
              flexLosses = rank.data[0].losses
          }} catch{}
          
          try {
          if(rank.data[1].queueType == "RANKED_FLEX_SR") {
              flexTier = rank.data[1].tier
              flexRank = rank.data[1].rank
              flexLp = rank.data[1].leaguePoints
              flexWins = rank.data[1].wins
              flexLosses = rank.data[1].losses
          }} catch{}
          
          try{
          if(rank.data[2].queueType == "RANKED_FLEX_SR") {
              flexTier = rank.data[2].tier
              flexRank = rank.data[2].rank
              flexLp = rank.data[2].leaguePoints
              flexWins = rank.data[2].wins
              flexLosses = rank.data[2].losses
          }} catch{}
  
  
          //calcul des winrates pour les 2 types de queue
          soloQtotal = soloQwins + soloQlosses
          soloQratio = soloQwins / soloQtotal * 100
          soloQratioFinal = Math.round(soloQratio)
          soloQfinal = soloQwins + " victoires / " + soloQlosses + " défaites, soit un winrate de " + soloQratioFinal + "%"
  
          flexTotal = flexWins + flexLosses
          flexRatio = flexWins / flexTotal * 100
          flexRatioFinal = Math.round(flexRatio)
          flexFinal = flexWins + " victoires / " + flexLosses + " défaites, soit un winrate de " + flexRatioFinal + "%"
  
          if(soloQfinal.startsWith ("undefined")) soloQfinal = "Pas de partie enregistrée"
          if(flexFinal.startsWith ("undefined")) flexFinal = "Pas de partie enregistrée"
          
          
          //traduction des rank en français
          if(soloQtier == "IRON") soloQtier = "Fer"
          if(soloQtier == "BRONZE") soloQtier = "Bronze"
          if(soloQtier == "SILVER") soloQtier = "Argent"
          if(soloQtier == "GOLD") soloQtier = "Or"
          if(soloQtier == "PLATINUM") soloQtier = "Platine"
          if(soloQtier == "DIAMOND") soloQtier = "Diamant"
          if(soloQtier == "MASTER") soloQtier = "Master"
          if(soloQtier == "GRANDMASTER") soloQtier = "Grandmaster"
          if(soloQtier == "CHALLENGER") soloQtier = "Challenger"
  
          if(flexTier == "IRON") flexTier = "Fer"
          if(flexTier == "BRONZE") flexTier = "Bronze"
          if(flexTier == "SILVER") flexTier = "Argent"
          if(flexTier == "GOLD") flexTier = "Or"
          if(flexTier == "PLATINUM") flexTier = "Platine"
          if(flexTier == "DIAMOND") flexTier = "Diamant"
          if(flexTier == "MASTER") flexTier = "Master"
          if(flexTier == "GRANDMASTER") flexTier = "Grandmaster"
          if(flexTier == "CHALLENGER") flexTier = "Challenger"
  
          
  
          // ligne total du rank en soloQ dans l'embed
          soloQrankTotal = soloQtier + " " + soloQrank + " " + soloQlp + "LP"
          flexRankTotal = flexTier + " " + flexRank + " " + flexLp + "LP"
  
          // si le rank est supérieur à diamant 1, on enlève le rank "I" à côté de Master, Grandmaster, Challenger
          if(soloQtier == "Master") soloQrankTotal = soloQtier + " " + soloQlp + "LP"
          if(soloQtier == "Grandmaster") soloQrankTotal = soloQtier + " " + soloQlp + "LP"
          if(soloQtier == "Challenger") soloQrankTotal = soloQtier + " " + soloQlp + "LP"
  
          if(flexTier == "Master") flexRankTotal = flexTier + " " + flexLp + "LP"
          if(flexTier == "Grandmaster") flexRankTotal = flexTier + " " + flexLp + "LP"
          if(flexTier == "Challenger") flexRankTotal = flexTier + " " + flexLp + "LP"
  
          // permet d'indiquer "Non classé" ou "Pas de partie enregistrée" lorsque les variables ne sont pas définies
          if(soloQrankTotal.startsWith ("undefined undefined undefinedLP")) soloQrankTotal = "Non classé"
          if(flexRankTotal.startsWith("undefined undefined undefinedLP")) flexRankTotal = "Non classé "
              
          // embed envoyé sur discord
          var lpEmbed = new Discord.MessageEmbed()
          .setAuthor(profile.data.name, ('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/'+ profile.data.profileIconId + '.png'))
          .setDescription(`Voici le profil de **${profile.data.name}** :`)
          .addField("Niveau du compte :", profile.data.summonerLevel)
          .addField(`Rang Solo / Duo: `, soloQrankTotal) 
          .addField("Ratio Solo / Duo :", soloQfinal)
          .addField(`Rang ranked Flex :`, flexRankTotal)
          .addField("Ratio ranked flex :", flexFinal)
          .setThumbnail('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/'+ profile.data.profileIconId + '.png')
          message.channel.send(lpEmbed)
  
           console.log(`Commande LoL utilisée, pseudo : ${profile.data.name}, rank soloQ : ${soloQtier}, rank flex : ${flexTier}`)
	}
}