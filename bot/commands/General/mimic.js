module.exports = {
  name: 'mimic',
  aliases: [],
  reqPerms: [],
  args: "<mention or id>",
  desc: "mimics the user specified (not finished)",
  run: async(Discord, client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    if(!user) return message.channel.send('No mention or ID detected')
    
  }
}
