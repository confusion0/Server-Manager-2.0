module.exports = {
  name: 'invites',
  aliases: [],
  reqPerms: [],
  args: "[user]",
  desc: "Checks yours or someone elses invites. This only shows how many times a invite was used, not how many people joined using that invite.",
  run: async (Discord, client, message, args) => {
    const { guild, channel } = message
  try {
    let invites = await guild.fetchInvites()
    const code = args[1]
    let revoked = false
    
    for(invite of invites){
      invite = invite[1]
      if(invite.code == code) {
        revoked = true
        invite.delete()
      }
    }
    if(revoked) channel.send(`\`${code}\` was successfully revoked`)
    else channel.send(`\`${code}\` doesn't exist`)
  }
  catch(error) {
    channel.send("Please contact a server administrator and make sure that this bot has every permission in this server")
  }
  }
}