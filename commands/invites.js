module.exports = {
  name: 'invites',
  aliases: [],
  run: async (Discord, client, message, args) => {
    const g = message.guild
    let invites = await g.fetchInvites()

    const embed = new Discord.MessageEmbed()

    if(!args[0]) return message.channel.send(`Usage:   ${client.config.prefix}invites ${client.user}`)
    else {
      let userInvites = 0
      let iUser = message.mentions.users.first()

      if(!iUser) return message.channel.send("please enter a valid mention")

      for(invite of invites){
        invite = invite[1]
        const inviter = client.users.cache.get(invite.inviter.id);
        if(inviter === iUser) userInvites += invite.uses
      }

      embed.setAuthor(iUser.tag, iUser.displayAvatarURL())
      embed.setDescription(`${userInvites} Invites!`)

      message.channel.send(embed)
    }
  }
}
