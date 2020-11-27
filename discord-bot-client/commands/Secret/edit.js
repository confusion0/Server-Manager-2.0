const emojis = [
  ["$green_load$", client.emojis.cache.get("781994480567451668")],
  ["$yellow_load$", client.emojis.cache.get("781994480638754837")],
  ["$red_load$", client.emojis.cache.get("781994480676765696")],
  ["$grey_load$", client.emojis.cache.get("781994480265592904")]
]

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
    var text = args.join()

    var msg = message.channel.messages.cache.get(messageID)

    if(!msg) return message.channel.send('Please enter a valid message ID')

    emojis.forEach(emoji => {
      text.replace(emoji[0], emoji[1])
    })

    msg.edit(text)
  }
}