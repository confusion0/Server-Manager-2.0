const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
  name: 'counting',
  run: async(client) => {
    client.on('message', async message => {
      const { guild, author, channel, content } = message
      if(!guild || author.bot) return

      const countingChannelID = await client.gData.get(`${guild.id}:countingchannel`)

      if(channel.id != countingChannelID) return
      
      const countingChannel = guild.channels.cache.get(countingChannelID)

      var oldTopic = countingChannel.topic || 'I am false'

      oldTopic = oldTopic.replace('Next Number: ', '')

      if(isNaN(oldTopic)) {
        countingChannel.setTopic('Next Number: 1')
        oldTopic = '1'
      }

      var currentCount = parseInt(oldTopic)

      if(content != currentCount) return message.delete()
      const temp = await countingChannel.setTopic(`Next Number: ${currentCount+1}`)
      console.log(temp)
    })
  }
}