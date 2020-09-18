const ms = require("ms")
const Discord = require('discord.js')

module.exports = {
  name: 'guildMemberAdd',
  run: async(client) => {
    client.on('guildMemberAdd', async member => {
      member.guild.fetchInvites().then(guildInvites => {
        const logChannel = member.guild.channels.cache.find(channel => channel.name.includes('invite-logs'));
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
        if(invite) inviter = client.users.cache.get(invite.inviter.id);
        // A real basic message with the information we need. 
        let createdAt = (member.user.createdAt).toString().slice(0, 15)
        var diff = Math.abs(new Date() - member.user.createdAt);
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(member.user.tag + " Joined!", member.user.displayAvatarURL())
        if(!isbot(member.user)) embed.setDescription(`${member.user} Member #${getMembersWithoutBots(member.guild)}`)
        else embed.setDescription(`${member.user} 🤖BOT`)
        embed.addField(`Registered At: `, `${createdAt}
        (${ms(diff,{long:true})})`, true)
        if(!isbot(member.user)) embed.addField(`Inviter`, inviter)
        embed.setFooter(`ID: ${member.user.id}`)
        embed.setTimestamp()
        logChannel.send(embed)
      });
    })
  }
}

function isbot(user){
  if(user.bot) return true
  return false
}

function getMembersWithoutBots(guild){
  var members = 0;
  guild.members.cache.forEach(member => {
    if(!isbot(member.user)) members++;
  })
  return members
}