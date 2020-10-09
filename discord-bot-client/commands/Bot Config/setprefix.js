const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'setprefix',
  aliases: [],
  reqPerm: "MANAGE_GUILD",
  args: "<prefix>",
  module: "Bot Config",
  desc: "Sets the prefix for the bot in this server.",
  example: ["?", "sm!"],
  run: async(client, message, args) => {
    if(!args[0]) return message.channel.send('You need to enter a prefix.')
    const data = await client.gData.get(message.guild.id)
    data.prefix = args[0]
    client.gData.set(message.guild.id, data)
    message.channel.send(`The bot prefix is now \`${args[0]}\``)
  }
}
