module.exports = {
  name: 'snipe',
  aliases: [],
  reqPerm: "MANAGE_MESSAGES",
  args: "",
  desc: "snipes the last deleted message.",
  example: [],
  run: async(Discord, client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send('There is nothing to snipe!')

    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(msg.content)
    .setTimestamp()

    if(msg.image) embed.setImage(msg.image)

    message.channel.send(embed)
  }
}
