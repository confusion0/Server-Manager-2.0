const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'setverifiedrole',
  aliases: ['setvrole'],
  reqPerm: "MANAGE_GUILD",
  args: "<role mention>",
  cooldown: 5000,
  desc: "Sets verified role for this server",
  example: ["@Verified", "@Members", "none"],
  run: async(client, message, args) => {
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    
    if(!role) return message.channel.send("Please enter the role as a mention or its id, or none to remove. Ex: @Example or 129038032234 or none")

    if(args[0] != 'none') client.gData.set(`${message.channel.guild}:vRole`)
    else client.delete(`${message.guild.id}`)
  }
}
