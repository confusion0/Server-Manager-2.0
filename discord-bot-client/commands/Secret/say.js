module.exports = {
  name: 'say',
  aliases: [],
  reqPerm: "BOT_ADMIN",
  args: "<text",
  desc: "Says the args",
  example: ['hi'],
  cooldown: undefined,
  run: async(client, message, args) => {
    var text = args.join(' ')

    client.emojilist.forEach(emoji => {
      console.log(client.emojis.cache.get(emoji.id))
      text = text.replace(emoji.name, client.emojis.cache.get(emoji.id))
    })

    message.channel.send(text)
  }
}