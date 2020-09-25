const ms = require('ms')

module.exports = {
  name: 'uptime',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  desc: "Checks uptime",
  example: [],
  module: "Util",
  run: async(client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Uptime')
    .setColor('GREEN')
    .setDescription(ms(client.uptime, {long:true}))
    message.channel.send(embed)
  }
}
