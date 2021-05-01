const AntiAdSchema = require('../schemas/AntiAd.js')

module.exports = {
  name: "antiad",
  run: async(client, message) => {
    const { guild, member, content } = message
    if (content.includes('discord.gg/')) {
      let bypass = member.hasPermission("MANAGE_GUILD");
      const code = content.split('discord.gg/')[1]
      const isOurInvite = (await guild.fetchInvites()).find(i => i == code)
      if(!isOurInvite){
        const enabled = await AntiAdSchema.get(guild.id)
        if(!enabled) return false;
        if(!bypass){
          message.delete()
          const message2 = await message.channel.send(`In order to post invites to other servers you must have the \`MANAGE_SERVER\` permmision. Advertiser: ${message.author}`)
          return true;
        } else return false;
      }
    } else return false;
  }
}