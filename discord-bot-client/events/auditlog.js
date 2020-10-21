const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'auditlog',
  run: async(client) => {
    const audit = async (guild, options) => {
      const logChannel = guild.channels.cache.get(await client.gData.get(`${guild.id}:auditlogchannel`))
      if(!logChannel) return

      const embed = new MessageEmbed()

      if(options.title){
        embed.setTitle(options.title)
      }
      if(options.author){
        embed.setAuthor(options.author.tag, options.author.displayAvatarURL())
      }
      if(options.desc){
        embed.setDescription(options.desc)
      }
      if(options.color){
        embed.setColor(options.color)
      }

      logChannel.send(embed)
    }

    client.on('messageDelete', message => {
      const { guild, author, channel } = message
      audit(guild, { author, color: 'RED', timestamp: true, desc: `${author}'s message was from deleted inside ${channel}` })
    })

    client.on('channelCreate', channel => {
      const { guild } = channel
      if(!guild) return
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