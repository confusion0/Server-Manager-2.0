
const emojis = [
  ["green_load", "<>"]
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


  }
}