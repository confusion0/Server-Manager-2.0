module.exports = {
  name: 'message-delete',
  run: async(client) => {
    client.on('messageDelete', message => {
      if(!message.guild) return
      if(message.author.bot) return
      client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
      })
    })
  }
}