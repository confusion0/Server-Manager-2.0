const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'christmascountdown',
  aliases: ['chcd', 'christmascd'],
  reqPerm: "NONE",
  args: "",
  cooldown: 1000,
  desc: "Shows how long until christmas.",
  example: [],
  run: async(client, message, args) => {
    const current_time = new Date()
    let christmas = new Date('December 25, 2020 0:0:00')
    let change = formatTime(christmas.getTime()-current_time.getTime())

    const countdownEmbed = new MessageEmbed()
        .setTitle('\:christmas_tree: Time left until christmas!')
        .setDescription(`\`${change}\``)
        .setColor('#FE019A')

    message.channel.send(countdownEmbed)
  }
}

const formatTime = (milliseconds) => Math.floor(milliseconds/86400000) + ((Math.floor(milliseconds/86400000) > 1) ? " days" : " day") + ", " + Math.floor((milliseconds%86400000)/3600000) + ((Math.floor(milliseconds/86400000) > 1) ? " hours" : " hour") + ", " + Math.floor((milliseconds%3600000)/60000) + ((Math.floor(milliseconds/86400000) > 1) ? " minutes" : " minute") + ", " + Math.floor((milliseconds%60000)/1000) + ((Math.floor(milliseconds/86400000) > 1) ? " seconds" : " second")