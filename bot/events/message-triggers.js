module.exports = {
  name: 'message-triggers',
  run: async(client) => { 
    client.on('message', message => {
      var { content, guild, author } = message
      if(!guild || author.bot) return
      const triggers = client.gData.get(guild.id).messageTriggers
      triggers.forEach(trigger => {
        var { includes, mtrigger, response, caseSensitive, deleteMessage } = trigger

        if(!caseSensitive) content = content.toLowerCase()

        if(includes) {
          if(content.includes(mtrigger)) message.channel.send(response)
          else return
          if(deleteMessage) return message.delete()
        }
        else {
          if(content == mtrigger) return message.channel.send(response)
          else return
          if(deleteMessage) return message.delete()
        }
      })
    })
  }
}