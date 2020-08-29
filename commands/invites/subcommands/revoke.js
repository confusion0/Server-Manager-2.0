const revoke = async function(client, message, args){
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

module.exports = { name : "revoke", run : revoke, reqPerms: ["ADMINISTRATOR"] }