const AntiAdSchema = require('../schemas/AntiAd.js')

module.exports = {
  name: "antiad",
  run: async(client, message) => {
    const { guild, member, content } = message

    let bypass = member.hasPermission("MANAGE_GUILD");

    const code = content.split('discord.gg/')[1]

    if (content.includes('discord.gg/')) {
      const isInvite = async (guild, code) => {
        return await new Promise((resolve) => {
          guild.fetchInvites().then((invites) => {
            for (const invite of invites) {
              if (code === invite[0]) {
                resolve(true)
                return
              }
            }
            resolve(false)
          })
        })
      }
      const isOurInvite = await isInvite(guild, code)
      if(!isOurInvite){
        const schema = await AntiAdSchema.findOne({
          _id: guild.id
        })
        if(!schema || !schema.enabled) return false;
        
        if(!bypass){
          message.delete()
          const message2 = await message.channel.send(`In order to post invites to other servers you must have the \`MANAGE_SERVER\` permmision. Advertiser: ${message.author}`)
          return true;
        } else return false;
      }
    }
  }
}