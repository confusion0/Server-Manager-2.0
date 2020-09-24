module.exports = {
  name: 'listinvites',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  desc: "Lists out all of the invites on this server.",
  example: [],
  run: async (Discord, client, message, args) => {
    const { guild, channel } = message
      try {
        let invites = await guild.fetchInvites()
        let inviteslist = ""
        
        for(invite of invites){
          invite = invite[1]
          const inviter = client.users.cache.get(invite.inviter.id);
          inviteslist += `\`${invite.code}\` was created by **${inviter.tag}** and currently has **${invite.uses} uses** \n`
        }
        message.channel.send(inviteslist, {split: true})
      }
      catch(error) {
        channel.send("Please contact a server administrator and make sure that this bot has every permission in this server")
      }
  }
}

