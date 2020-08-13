module.exports = {
  name: 'inviteCreate',
  run: async(Discord, client, invite) => {
    const logChannel = invite.guild.channels.cache.find(channel => channel.name === "invite-logs");
    if(!logChannel) return
    const inviter = client.users.cache.get(invite.inviter.id);
    let isTemp = false
    if(invite.maxAge != 0) logChannel.send(`${invite.inviter} please remake your invite as a invite that doesn't expire. I have already revoked your invite`).then(isTemp = ture)
    if(invite.maxUses != 0) logChannel.send(`${invite.inviter} please remake your invite as a invite that has infinite uses. I have already revoked your invite`).then(isTemp = ture)
    if(isTemp) invite.delete()
  }
}
