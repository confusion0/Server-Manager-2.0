const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'inviteCreate',
  run: async(client) => {
    client.on('inviteCreate', async invite => {
      const logChannel = invite.guild.channels.cache.find(channel => channel.name === "invite-logs");
      if(!logChannel) return

      const inviter = client.users.cache.get(invite.inviter.id);

      logChannel.send(inviter.toString() + " 👇")

      const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Invite Creation Unsuccessful")
      .setDescription("")

      let isTemp = false
      if(invite.maxAge != 0) {
        embed.setDescription(embed.description + `${invite.inviter} please remake your invite as a invite that doesn't expire. I have already revoked your invite. Use the command for more info: ${process.env.PREFIX}invitehelp \n`)
        isTemp = true
      }
      if(invite.maxUses != 0) {
        embed.setDescription(embed.description + `${invite.inviter} please remake your invite as a invite that has infinite uses. I have already revoked your invite. Use the command for more info: ${process.env.PREFIX}invitehelp \n`)
        isTemp = true
      }
      if(isTemp){
        invite.delete()
        return logChannel.send(embed)
      } 

      embed.setTitle("Invite Creation Successful")
      .setDescription(`${inviter} Code: \`${invite.code}\``)
      logChannel.send(embed)
    })
  }
}