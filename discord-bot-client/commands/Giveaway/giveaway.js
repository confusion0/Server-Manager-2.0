const { MessageEmbed } = require('discord.js')
const ms = require('ms')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const timeout = 200000
const max_tries = 3

module.exports = {
  name: 'giveaway',
  aliases: ['gg'],
  reqPerm: "MANAGE_GUILD",
  args: "",
  cooldown: 3000,
  desc: "Starts a giveaway constructor (Not Finished) (interactive)",
  example: [],
  module: "Giveaway",
  run: async(client, message, args) => {
    const filter = response => response.author == message.author

    var giveaway = {}
    var status = { timedout: false, moveon: false, cancelled: false, tries_left: 0 }

    //Getting the giveaway length
    status.tries_left = max_tries
    status.moveon = false
    do {
      await message.channel.send(new MessageEmbed()
        .setTitle(':tada: Giveaway')
        .setDescription('How long do you want this giveaway to last? ' + `\`(tries left: ${status.tries_left})\``)
        .setFooter(`Reply with "cancel" to stop the process, you have ${timeout/1000} seconds to respond.`)
        .setColor('NAVY')
      )
      
      const collected = await message.channel.awaitMessages(filter, { max: 1, time: timeout })
      if(collected) {
        const response = collected.first()
        if(response.content.toLowerCase() != 'cancel'){
          const converted = ms(response.content)
          if(!isNaN(converted)){
            giveaway.length = converted
            status.moveon = true
          } else {
            status.tries_left = status.tries_left - 1
            message.channel.send(new MessageEmbed()
              .setTitle(':tada: Giveaway')
              .setDescription('Please make sure to input your time in the correct format. Examples: 1d, 3h, 15s')
              .setColor('RED')
            )
          }
        } else status.cancelled = true
      } else status.timedout = true
    } while (!status.timedout && !status.moveon && status.tries_left > 0)

    if(status.timedout) return message.channel.send(new MessageEmbed()
      .setTitle(':tada: Giveaway')
      .setDescription('You ran out of time! Please prepare your giveaway details in advance for a more streamlined experience.')
      .setColor('RED')
    )

    if(status.tries_left == 0) return message.channel.send(new MessageEmbed()
      .setTitle(':tada: Giveaway')
      .setDescription('You entered the time in the wrong format way to many times. Please prepare your giveaway details in advance for a more streamlined experience.')
      .setColor('RED')
    )

    //Getting the giveaway prize
    status.tries_left = max_tries
    status.moveon = false
    do {
      await message.channel.send(new MessageEmbed()
        .setTitle(':tada: Giveaway')
        .setDescription('What prize do you want for this giveaway? ' + `\`(tries left: ${status.tries_left})\``)
        .setFooter(`Reply with "cancel" to stop the process, you have ${timeout/1000} seconds to respond.`)
        .setColor('NAVY')
      )
      
      const collected = await message.channel.awaitMessages(filter, { max: 1, time: timeout })
      if(collected) {
        const response = collected.first()
        if(response.content.toLowerCase() != 'cancel'){
          if(response.content.length < 512){
            giveaway.prize = response.content
            status.moveon = true
          } else {
            status.tries_left = status.tries_left - 1
            message.channel.send(new MessageEmbed()
              .setTitle(':tada: Giveaway')
              .setDescription('The prize text has to be less than 512 characters.')
              .setColor('RED')
            )
          }
        } else status.cancelled = true
      } else status.timedout = true
    } while (!status.timedout && !status.moveon && status.tries_left > 0)

    if(status.timedout) return message.channel.send(new MessageEmbed()
      .setTitle(':tada: Giveaway')
      .setDescription('You ran out of time! Please prepare your giveaway details in advance for a more streamlined experience.')
      .setColor('RED')
    )

    if(status.tries_left == 0) return message.channel.send(new MessageEmbed()
      .setTitle(':tada: Giveaway')
      .setDescription('You failed to enter valid prize text too many times. Please prepare your giveaway details in advance for a more streamlined experience.')
      .setColor('RED')
    )

    //Get giveaway channel
    status.tries_left = max_tries
    status.moveon = false
    do {
      await message.channel.send(new MessageEmbed()
        .setTitle(':tada: Giveaway')
        .setDescription('Mention the channel do you want this giveaway to be in? Example: #giveaway-channel ' + `\`(tries left: ${status.tries_left})\``)
        .setFooter(`Reply with "cancel" to stop the process, you have ${timeout/1000} seconds to respond.`)
        .setColor('NAVY')
      )
      
      const collected = await message.channel.awaitMessages(filter, { max: 1, time: timeout })
      if(collected) {
        const response = collected.first()
        if(response.content.toLowerCase() != 'cancel'){
          const channel = response.mentions.channels.first()
          if(channel && message.guild.channels.cache.get(channel.id)){
            giveaway.channel = channel
            status.moveon = true
          } else {
            status.tries_left = status.tries_left - 1
            if(!channel){
              message.channel.send(new MessageEmbed()
                .setTitle(':tada: Giveaway')
                .setDescription('You didn\'t mention a channel!')
                .setColor('RED')
              )
            }
            else if(channel && !message.guild.channels.cache.get(channel.id)){
              message.channel.send(new MessageEmbed()
                .setTitle(':tada: Giveaway')
                .setDescription('The channel you selected isn\'t part of this guild')
                .setColor('RED')
              )
            }
          }
        } else status.cancelled = true
      } else status.timedout = true
    } while (!status.timedout && !status.moveon && status.tries_left > 0)

    if(status.timedout) return message.channel.send(new MessageEmbed()
      .setTitle(':tada: Giveaway')
      .setDescription('You ran out of time! Please prepare your giveaway details in advance for a more streamlined experience.')
      .setColor('RED')
    )

    if(status.tries_left == 0) return message.channel.send(new MessageEmbed()
      .setTitle(':tada: Giveaway')
      .setDescription('You entered your prize over 512 characters way too many times. Please prepare your giveaway details in advance for a more streamlined experience.')
      .setColor('RED')
    )

    message.channel.send(`Length: ${giveaway.length}, Prize: '${giveaway.prize}', Channel: ${giveaway.channel}`)
    message.channel.send(`timedout: ${status.timedout}, moveon: ${status.moveon}, cancelled: ${status.cancelled}, tries_left: ${status.tries_left}`)

    // var end_time =  new Date() + giveaway.length

    // while(new Date() < end_time){
    //   await sleep()
    // }
  }
}