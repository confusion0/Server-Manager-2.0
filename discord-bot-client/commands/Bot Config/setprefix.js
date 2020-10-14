const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'setprefix',
  aliases: ['setserverprefix'],
  reqPerm: "MANAGE_GUILD",
  args: "<prefix>",
  cooldown: 10000,
  module: "Bot Config",
  desc: "Sets the prefix for the bot in this server.",
  example: ["?", "sm!"],
  run: async(client, message, args) => {
    if(!args[0]) return message.channel.send('You need to enter a prefix.')
    
    client.gData.set(`${message.guild.id}:prefix`, args[0])
    
    message.channel.send(`The bot prefix is now \`${args[0]}\``)
  }
}
