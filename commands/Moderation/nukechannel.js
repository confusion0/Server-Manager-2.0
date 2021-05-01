const { MessageEmbed } = require('discord.js')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
  name: 'nukechannel',
  aliases: ['nchannel', 'nukec'],
  reqPerm: "MANAGE_MESSAGES",
  args: "[channel]",
  cooldown: 3000,
  desc: "deletes and remakes a channel with the exact settings",
  example: ['#general', '#bot-commands', ""],
  run: async(client, message, args) => {
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
    let position = channel.position
    let newChannel = await channel.clone()
    newChannel.setPosition(position)
    newChannel.send(`${message.author.toString()} just nuked ${channel.toString()}! This is the new channel, happy chatting!`)
    channel.send(`${message.author.toString()} just nuked this channel! Quick head over to ${newChannel} to continue chatting!`)
    let counter = 5
    let interval = setInterval(function(){
      channel.send(counter)
      counter--
    }, 1000)
    await sleep(counter * 1000)
    clearInterval(interval)
    channel.delete()
  }
}