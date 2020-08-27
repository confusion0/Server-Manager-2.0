module.exports = {
  name: 'eval',
  aliases: [],
  run: async(Discord, client, message, args) => {
    if(message.author.id == client.config.OWNERID){
      const result = eval(content.replace(`${client.config.prefix}eval`, ''))
      message.channel.send(result)
    }
  }
}
