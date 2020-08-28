const whois = require('../../commands/whois.js')
const ms = require("ms")

module.exports = {
  name: 'guildMemberAdd',
  run: async(Discord, client, member) => {
    member.guild.fetchInvites().then(guildInvites => {
      const logChannel = member.guild.channels.cache.find(channel => channel.name === "invite-logs");
      if(!logChannel) return
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
      var inviter = "Unknown"
      if(invite) {
        inviter = client.users.cache.get(invite.inviter.id);
        let isTemp = false
        if(invite.maxAge != 0) logChannel.send(`${invite.inviter} please remake your invite as a invite that doesn't expire. I have already revoked your invite`).then(isTemp = true)
        if(invite.maxUses != 0) logChannel.send(`${invite.inviter} please remake your invite as a invite that has infinite uses. I have already revoked your invite`).then(isTemp = true)
        if(isTemp) invite.delete()
      }
      // A real basic message with the information we need. 
      let createdAt = (member.user.createdAt).toString().slice(0, 15)
      var diff = Math.abs(new Date() - member.user.createdAt);
      const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(member.user.tag + " Joined!", member.user.displayAvatarURL())
      .setDescription(member.user)
      .addField(`Registered At: `, createdAt, true)
      .addField(`Registered: `, ms(diff,{long:true}) + " ago", true)
      .addField(`Inviter`, inviter)
      .setFooter(`ID: ${member.user.id}`)
      .setTimestamp()
      logChannel.send(embed)
    });
  }
}
