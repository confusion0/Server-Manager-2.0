module.exports = {
  name: 'invites',
  aliases: [],
  run: async (Discord, client, message, args) => {
    if(!args[0]) return message.channel.send("Please choose one of the following. \n-user \n-list")
    if(args[0] == "-user"){
      try{
        const g = message.guild
        let invites = await g.fetchInvites()

        const embed = new Discord.MessageEmbed()

        let userInvites = 0

        let iUser = message.mentions.users.first()

        if(!iUser) iUser = message.author

        for(invite of invites){
          invite = invite[1]
          const inviter = client.users.cache.get(invite.inviter.id)
          if(inviter === iUser) userInvites += invite.uses
        }

        embed.setAuthor(iUser.tag, iUser.displayAvatarURL())
        embed.setDescription(`${userInvites} Invites!`)
        embed.setFooter("This may not be accurate.")

        message.channel.send(embed)
      }
      catch(error){
        message.channel.send("Please contact the server owner and make sure that this bot has every permission in this server")
      }
    }
    if(args[0] == "-list"){
      try{
        const g = message.guild
        let invites = await g.fetchInvites()

        const embed = new Discord.MessageEmbed()
        
        for(invite of invites){
          invite = invite[1]
          const inviter = client.users.cache.get(invite.inviter.id);
          message.channel.send(`\`${invite.code}\` was created by **${inviter.tag}** and currently has ${invite.uses} uses`)
        }
      }
      catch(error){
        message.channel.send("Please contact the server owner and make sure that this bot has every permission in this server")
      }
    }
  }
}
