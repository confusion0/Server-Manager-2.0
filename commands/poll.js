module.exports = {
  name: 'poll',
  aliases: [],
  run: async(Discord, client, message, args) => {
    if(!args[0]){
      const embed = new Discord.MessageEmbed()
      .setTitle("Poll Usage")
      .setColor("RANDOM")
      .addField("Yes/No", client.config.prefix + "poll Do you like Server Manager 2.0?")
      return message.channel.send(embed)
    }

    const arg = message.content.slice(client.config.prefix.length).slice(4).trim()

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")

    embed.setTitle(arg)
    let message2 = await message.channel.send(embed)
    message2.react("👍")
    message2.react("👎")

  }
}
