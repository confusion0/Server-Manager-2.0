module.exports = {
  name: 'guildMemberAdd',
  run: async(Discord, client, member) => {
    member.guild.fetchInvites().then(guildInvites => {
      // This is the *existing* invites for the guild.
      const ei = client.invites[member.guild.id];
      // Update the cached invites for the guild.
      client.invites[member.guild.id] = guildInvites;
      // Look through the invites, find the one for which the uses went up.
      const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
      // This is just to simplify the message being sent below (inviter doesn't have a tag property)
      const inviter = client.users.cache.get(invite.inviter.id);
      // Get the log channel (change to your liking)
      const logChannel = member.guild.channels.cache.find(channel => channel.name === "invite-logs");
      if(!logChannel) return
      // A real basic message with the information we need. 
      logChannel.send(`${member.user} joined using invite code \`${invite.code}\` from ${inviter}. Invite was used ${invite.uses} times since its creation.`);
    });
  }
}
