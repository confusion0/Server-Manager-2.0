module.exports = {
  name: 'invites',
  aliases: [],
  reqPerms: [],
  args: "[user]",
  desc: "Checks yours or someone elses invites. This only shows how many times a invite was used, not how many people joined using that invite.",
  run: async (Discord, client, message, args) => {
    const { guild, channel } = message
    try{
      let invites = await guild.fetchInvites()

      const embed = new Discord.MessageEmbed()

      let userInvites = 0

      let iUser = message.mentions.users.first()

      if(!iUser) return message.channel.send('Please mention the user you would like to check')

      for(invite of invites){
        invite = invite[1]
        const inviter = client.users.cache.get(invite.inviter.id)
        if(inviter === iUser) userInvites += invite.uses
      }

      embed.setAuthor(iUser.tag, iUser.displayAvatarURL())
      embed.setDescription(`${userInvites} Invites!`)
      embed.setFooter("This may not be 100% accurate. This only displays how many times a invite was used not how many people joined using it.")

      channel.send(embed)
    }
    catch(error){
      channel.send("Please contact a server administrator and make sure that this bot has every permission in this server")
    }
  }
}