const ms = require('ms')

module.exports = {
  name: 'uptime',
  aliases: [],
  reqPerms: [],
  args: "",
  desc: "Checks uptime",
  run: async(Discord, client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Uptime')
    .setColor('GREEN')
    .setDescription(ms(client.uptime, {long:true}))
    message.channel.send(embed)
  }
}
