module.exports = {
  name: 'guildMemberAdd',
  run: async(Discord, client, member) => {
    member.guild.fetchInvites().then(guildInvites => {
      // This is the *existing* invites for the guild.
      const ei = client.invites[member.guild.id];
      // Update the cached invites for the guild.
      client.invites[member.guild.id] = guildInvites;
      // Look through the invites, find the one for which the uses went up.
      const invite = guildInvites.find(i => {
        const oldInvite = ei.get(i.code)
        if(!oldInvite) return false
        return oldInvite.uses < i.uses
      })
      if(!invite) return logChannel.send("I was unable to locate which invite this user joined using: " + member.user)
      // This is just to simplify the message being sent below (inviter doesn't have a tag property)
      const inviter = client.users.cache.get(invite.inviter.id);
      if(invite.maxAge != 0) logChannel.send(`\`${invite.inviter.tag}\` please remake your invite as a invite that doesn't expire`)
      if(invite.maxUses != 0) logChannel.send(`\`${invite.inviter.tag}\` please remake your invite as a invite that has infinite uses`)
      // Get the log channel (change to your liking)
      const logChannel = member.guild.channels.cache.find(channel => channel.name === "invite-logs");
      if(!logChannel) return
      // A real basic message with the information we need. 
      logChannel.send(`${member.user} **joined**; Invited by **${inviter.tag}** (${invite.uses} Invites)`);
    });
  }
}
