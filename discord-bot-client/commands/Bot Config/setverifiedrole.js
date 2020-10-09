const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'setverifiedrole',
  aliases: ['setvrole'],
  reqPerm: "MANAGE_GUILD",
  args: "<role mention>",
  desc: "Sets verified role for this server",
  example: ["@Verified", "@Members", "none"],
  run: async(client, message, args) => {
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!role) return message.channel.send("Please enter the role as a mention or its id, or none to remove. Ex: @Example or 129038032234 or none")

    var data = await client.gData.get(message.guild.id)
    if(args[0] != 'none') data.vRole = role.id
    else data.vRole = undefined
    client.gData.set(message.guild.id, data)
  }
}
