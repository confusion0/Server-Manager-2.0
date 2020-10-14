const ms = require('ms')
const { MessageEmbed } = require('discord.js')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const formatTime = (milliseconds) => Math.floor(milliseconds/86400000) + ((Math.floor(milliseconds/86400000) > 1) ? " days" : " day") + ", " + Math.floor((milliseconds%86400000)/3600000) + ((Math.floor(milliseconds/86400000) > 1) ? " hours" : " hour") + ", " + Math.floor((milliseconds%3600000)/60000) + ((Math.floor(milliseconds/86400000) > 1) ? " minutes" : " minute") + ", " + Math.floor((milliseconds%60000)/1000) + ((Math.floor(milliseconds/86400000) > 1) ? " seconds" : " second") + " left"

const embeds = {
  title: new MessageEmbed()
  .setTitle('Countdown Setup')
  .setDescription(`Enter a title for your countdown. Quick Start Mode: ${process.env.PREFIX}countdown 5d 5 day countdown!`)
  .setFooter('Prompt will cancel in 60 secs'),
  length: new MessageEmbed()
  .setTitle('Countdown Setup')
  .setDescription('**Enter** a **duration** in **seconds** and **inculde** a **S** at the **end**, **minutes** and **include** a **M**, or **days** and **include** a **D**')
  .setFooter('Prompt will cancel in 60 secs'),
  channel: new MessageEmbed()
  .setTitle('Countdown Setup')
  .setDescription('Mention the channel you would like this countdown to be in.')
  .setFooter('Prompt will cancel in 60 secs'),
  timedout: new MessageEmbed()
  .setTitle('Countdown Setup')
  .setDescription('You did not respond in time, run the command again to setup again.')
}

module.exports = {
  name: 'countdown',
  aliases: ['cd'],
  reqPerm: 'MANAGE_GUILD',
  args: "[length] <title>",
  cooldown: 2000,
  desc: "Starts a countdown (interactive setup)",
  module: "Fun",
  example: ['', '2m reminder', '1h timer'],
  run: async(client, message, args) => {
    var countdown = {}

    if(args[0] && args[1]){
      countdown.title = args.slice(1).join(' ')
      countdown.length = ms(args[0].toLowerCase())
      countdown.channel = message.channel
      if(!countdown.title && !countdown.length) return message.channel.send('You didn\'t format countdown quickstart correctly')
    }
    else {
      const filter = (response) => response.author.id === message.author.id

      do {
        message.channel.send(embeds.title)
        await message.channel.awaitMessages(filter, { max: 1, time: 60000}).then(collected => countdown.title = collected.first().content)
        if(countdown.title === undefined) return message.channel.send(embeds.timedout)
        if(countdown.title.length > 64){
          countdown.title = undefined
          message.channel.send('The title needs to be less than 64 characters long.')
        }
      } while (!countdown.title)

      do {
        message.channel.send(embeds.length)
        await message.channel.awaitMessages(filter, { max: 1, time: 60000}).then(collected => countdown.length = collected.first().content)
        if(countdown.length === undefined) return message.channel.send(embeds.timeout)
        countdown.length = ms(countdown.length.toLowerCase())
        if(isNaN(countdown.length)){
          countdown.length = undefined
          message.channel.send('You formatted your time wrong, please read the prompt and try again.')
        }
      } while (!countdown.length)

      do {
        message.channel.send(embeds.channel)
        await message.channel.awaitMessages(filter, { max: 1, time: 60000}).then(collected => countdown.channel = collected.first())
        if(countdown.channel === undefined) return message.channel.send(embeds.timeout)
        countdown.channel = countdown.channel.mentions.channels.first()
        if(!countdown.channel){
          countdown.channel = undefined
          message.channel.send('You didn\'t enter a channel mention.')
        }
      } while (!countdown.channel)
    }

    const embed = new MessageEmbed()
    .setTitle(countdown.title)
    .setDescription(formatTime(countdown.length))
    countdown.message = await countdown.channel.send(embed)

    countdown.interval = setInterval(function(){
      if(countdown.message.deleted) clearInterval(countdown.interval) 
      countdown.length -= 1000
      if(countdown.length <= 0){
        countdown.ended = true
        clearInterval(countdown.interval) 
      }
      embed.setDescription(formatTime(countdown.length))
      countdown.message.edit(embed)
    }, 1000)

    await sleep(countdown.length)

    if(!countdown.ended) return

    embed.setDescription('Countdown Finished')
    countdown.message.edit(embed)
  }
}