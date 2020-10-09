const { MessageEmbed } = require('discord.js')
const noblox = require('noblox.js')

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'checkroblox',
  aliases: ['croblox'],
  reqPerm: "NONE",
  args: "[user mention]",
  desc: "Checks the mentioned user or your roblox data",
  example: ['', '@Commander786'],
  run: async(client, message, args) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author

    const uData = await client.uData.get(user.id)
    if(!uData || !uData.robloxID) return message.channel.send('They/you haven\'t linked their/your roblox account yet! Use the `linkroblox` commmand to do so.')

    const playerinfo = await noblox.getPlayerInfo(uData.robloxID)

    message.channel.send(
      new MessageEmbed()
      .setAuthor(user.tag, user.displayAvatarURL())
      .setDescription('Roblox Username: ' + playerinfo.username)
    )
  }
}