module.exports = async (client, message) => {
  const { guild, member, content } = message

  var bypass = false
  if(member.roles.cache.find(r => r.name === "anti-ad bypass")) bypass = true

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
    if (!isOurInvite && !bypass) {
      message.channel.send("No Advertising")
      message.delete()
    }
  }
}