const Discord = require('discord.js')
const axios = require ('axios')

module.exports= {
    name: 'tft' ,
    run: async(Client, message, args, config) => { 
        const riotApiKey = config["riotApiKey"]
          // récupération pseudo
          var name = args.slice(1).join(" ")
          if(!name) return 
  
          // récupération des données personnelles de l'utilisateur indiqué via discord + return
          const profile = await axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotApiKey).catch(err => {
              return message.channel.send("Une erreur est survenue (sûrement un problème dans l'orthographe du pseudo)")
          })
  
          // id du joueur
          let playerId = profile.data.id
  
          // requête api rank + return 
          let rank
          if(profile) {
              rank = await axios.get('https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/' + playerId + "?api_key=" + riotApiKey);
          } 
          else return message.channel.send("Ce pseudo a été mal écrit ou n'existe pas")
  
          // variables
          let tftWins
          let tftLosses 
          let tftTotal
          let tftRatio
          let tftRatioFinal
          let tftTier 
          let tftRank 
          let tftLp 
          let tftFinal
          let tftRankFinal
  
          // récupération data
          try {
              if(rank.data[0] == "RANKED_TFT")
                  tftWins = rank.data[0].wins
                  tftLosses = rank.data[0].losses 
                  tftTier = rank.data[0].tier 
                  tftRank = rank.data[0].rank
                  tftLp = rank.data[0].leaguePoints
          }catch{}
  
          try {
              if(rank.data[1] == "RANKED_TFT")
                  tftWins = rank.data[1].wins
                  tftLosses = rank.data[1].losses 
                  tftTier = rank.data[1].tier 
                  tftRank = rank.data[1].rank
                  tftLp = rank.data[1].leaguePoints
          }catch{}
  
          try {
              if(rank.data[2] == "RANKED_TFT")
                  tftWins = rank.data[2].wins
                  tftLosses = rank.data[2].losses 
                  tftTier = rank.data[2].tier 
                  tftRank = rank.data[2].rank
                  tftLp = rank.data[2].leaguePoints
          }catch{}
  
          // set des variables concernant le winrate
          tftTotal = tftWins + tftLosses
          tftRatio = tftWins / tftTotal * 100
          tftRatioFinal = Math.round(tftRatio)
          tftFinal = tftWins + " victoires / " + tftLosses + " défaites, soit un winrate de " + tftRatioFinal + "%"
          if(tftFinal.startsWith("undefined")) tftFinal = "Pas de partie enregistrée"
          
  
          //traduction des rank
          if(tftTier == "IRON") tftTier = "Fer"
          if(tftTier == "BRONZE") tftTier = "Bronze"
          if(tftTier == "SILVER") tftTier = "Argent"
          if(tftTier == "GOLD") tftTier = "Or"
          if(tftTier == "PLATINUM") tftTier = "Platine"
          if(tftTier == "DIAMOND") tftTier = "Diamant"
          if(tftTier == "MASTER") tftTier = "Master"
          if(tftTier == "GRANDMASTER") tftTier = "Grandmaster"
          if(tftTier == "CHALLENGER") tftTier = "Challenger"
  
          // set de la variable final du rank (Ex : Silver III 28LP)
          tftRankFinal = tftTier + " " + tftRank + " " + tftLp + "LP"
  
          // si le rank est supérieur à diamant 1, on enlève le rank "I" à côté de Master, Grandmaster, Challenger
          if(tftTier == "Master") tftRankFinal = tftTier + " " + tftLp + "LP"
          if(tftTier == "Grandmaster") tftRankFinal = tftTier + " " + tftLp + "LP"
          if(tftTier == "Challenger") tftRankFinal = tftTier + " " + tftLp + "LP"
  
          // return si le joueur est non classé
          if(tftRankFinal.startsWith ("undefined undefined undefinedLP")) tftRankFinal = "Non classé"
  
  
          // embed envoyé sur discord
          var tftEmbed = new Discord.MessageEmbed()
          .setAuthor(profile.data.name, ('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/'+ profile.data.profileIconId + '.png'))
          .setDescription(`Voici le profil Teamfight Tactics de **${profile.data.name}** :`)
          .addField("Niveau du compte :", profile.data.summonerLevel)
          .addField("Rang :", tftRankFinal)
          .addField("Ratio :", tftFinal)
          .setThumbnail('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/'+ profile.data.profileIconId + '.png')
          message.channel.send(tftEmbed)
  
          // console.log du résultat
          console.log(`Commande tft utilisée, pseudo : ${profile.data.name} , rank : ${tftRankFinal}, ratio ${tftFinal}`)
	}
}