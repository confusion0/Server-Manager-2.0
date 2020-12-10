module.exports = {
  name: 'anti-ad',
  run: async(client) => {
    client.on('message', async message => {
      const { guild, member, content } = message
      if(!guild) return
      if(!member) return

      const antiad = await client.gData.get(`${guild.id}:antiad`)
      if(!antiad) return

      const bypassRoleName = "Anti-Ad Bypass"

      var bypassRole = guild.roles.cache.find(r => r.name === bypassRoleName)

      if(!bypassRole){
        guild.roles.create({
          data: {
            name: bypassRoleName,
            color: 'GREY',
            position: 0,
            mentionable: false,
          },
        })
        .then(role => bypassRole = role)
        .catch(()=>{})
      }

      var bypass = false
      if(member.hasPermission("MANAGE_GUILD")) bypass = true
      if(member.roles.cache.find(r => r === bypassRole)) bypass = true

      // discord.gg/23RAN4

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
        if (!isOurInvite && !bypass && bypassRole && message.author.id == client.OWNERID) return message.channel.send('Bot Owner Detected, bypassing anti-ad filter.')
        else if (!isOurInvite && !bypass && bypassRole) {
          message.delete()
          const message2 = await message.channel.send(`In order to post invites to other servers you must have the role ${bypassRole} or have the \`MANAGE_SERVER\` permmision. Advertiser: ${message.author}`)
        }
        else if(!isOurInvite && !bypassRole){
          const message2 = await message.channel.send(`In order to post invites to other servers you must have the \`MANAGE_SERVER\` permmision. This server has reached max roles so I am unable to create the bypass role. Advertiser: ${message.author}`)
        }
      }
    })
  }
}