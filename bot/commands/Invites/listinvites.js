module.exports = {
  name: 'listinvites',
  aliases: [],
  reqPerms: [],
  args: "",
  desc: "Lists out all of the invites on this server.",
  run: async (Discord, client, message, args) => {
    const { guild, channel } = message
      try {
        let invites = await guild.fetchInvites()
        let messageArray = []
        
        for(invite of invites){
          invite = invite[1]
          const inviter = client.users.cache.get(invite.inviter.id);
          messageArray.push(`\`${invite.code}\` was created by **${inviter.tag}** and currently has **${invite.uses} uses**`)
        }

        for(msg of messageArray){
          channel.send(msg)
        }
      }
      catch(error) {
        channel.send("Please contact a server administrator and make sure that this bot has every permission in this server")
      }
  }
}

