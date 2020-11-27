
const emojis = [
  ["$green_load$", client.emojis.cache.get("781994480567451668")],
  ["$yellow_load$", client.emojis.cache.get("781994480638754837")],
  ["$red_load$", client.emojis.cache.get("781994480676765696")],
  ["$grey_load$", client.emojis.cache.get("781994480265592904")]
]

module.exports = {
  name: 'say',
  aliases: [],
  reqPerm: "BOT_ADMIN",
  args: "<text",
  desc: "Says the args",
  example: ['hi'],
  cooldown: undefined,
  run: async(client, message, args) => {
    var text = args.join()

    emojis.forEach(emoji => {
      text.replace(emoji[0], emoji[1])
    })

    message.channel.send(text)
  }
}