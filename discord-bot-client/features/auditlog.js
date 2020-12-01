const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'auditlog',
  run: async(client) => {
    const logAudit = async (guild, embed) => {
      const logChannel = guild.channels.cache.get(await client.gData.get(`${guild.id}:auditlogchannel`))
      if(logChannel) logChannel.send(embed)
    }

    client.on('messageDelete', message => {
      const { guild, author, channel, content } = message
      const embed = new MessageEmbed()
      .setAuthor(author.tag, author.displayAvatarURL())
      .setDescription(`${author}'s message was from deleted inside ${channel}`)
      .addField('Message', content)
      .setColor('RED')
      .setTimestamp()

      logAudit(guild, embed)
    })

    client.on('channelCreate', channel => {
      const { guild } = channel
      if(!guild) return

      const embed = new MessageEmbed()
      .setAuthor(author.tag, author.displayAvatarURL())
      .setDescription(`${author}'s message was from deleted inside ${channel}`)
      .addField('Message', content)
      .setColor('RED')
      .setTimestamp()

      logAudit(guild, embed)
      audit(guild, { title: 'A channel was created', color: 'GREEN', desc: `${channel} was created!`})
    })
    client.on('channelDelete', channel => {
      const { guild } = channel
      if(!guild) return
      audit(guild, { title: 'A channel was deleted', color: 'RED', desc: `#${channel.name} was deleted!`})
    })
    client.on('channelUpdate', channel => {
      const { guild } = channel
      if(!guild) return
    })
  }
}