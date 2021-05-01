const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'snipe',
  aliases: [],
  reqPerm: "MANAGE_MESSAGES",
  args: "",
  cooldown: 1000,
  module: "General",
  desc: "snipes the last deleted message.",
  example: [],
  run: async(client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send('There is nothing to snipe!')

    const embed = new MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(msg.content)
    .setTimestamp()

    if(msg.image) embed.setImage(msg.image)

    message.channel.send(embed)
  }
}