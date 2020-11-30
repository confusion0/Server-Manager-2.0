module.exports = {
  name: 'edit',
  aliases: [],
  reqPerm: "BOT_ADMIN",
  args: "<messageid> <text",
  desc: "Says the args",
  example: ['hi'],
  cooldown: undefined,
  run: async(client, message, args) => { 
    if(!args[1]) return message.channel.send('Invalid Arguments!')

    var messageID = args.shift()
    var text = args.join(' ')

    var msg = message.channel.messages.cache.get(messageID)

    if(!msg) return message.channel.send('Please enter a valid message ID')

    client.emojilist.forEach(emoji => {
      text = text.replace(emoji.name, client.emojis.cache.get(emoji.id))
    })

    msg.edit(text)
  }
}