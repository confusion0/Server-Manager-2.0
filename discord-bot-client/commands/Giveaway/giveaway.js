const { MessageEmbed } = require('discord.js')
const ms = require('ms')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const timeout = 200000
const max_tries = 3

const reaction = '🎉'

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

    var giveaway = { host: message.author, winners: 1}
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
          if(isNaN(response.content) && !isNaN(converted)){
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

    var end_time =  new Date().getTime() + giveaway.length
    giveaway.end_time = end_time

    const msg = await message.channel.send(new MessageEmbed().setTitle('Generating the giveaway embed... please wait'))
    msg.react(reaction)

    while(new Date().getTime() < end_time){
      var time_left = Math.floor((end_time - new Date().getTime())/1000) //In seconds
      var next_edit = Math.floor(Math.sqrt(time_left))
      if(next_edit < 1) next_edit = 1
      if(time_left <= 10) next_edit = 1
      
      if(time_left > 5) msg.edit(generateGiveawayEmbed(giveaway, ms(time_left*1000, {long: true}), ))
      else if(time_left > 0) msg.edit(generateGiveawayEmbed(giveaway, ms(time_left*1000, {long: true}), true))
      else msg.edit(generateGiveawayEmbed(giveaway, ms(time_left*1000, {long: true}), true, true))

      await sleep(next_edit*1000)
    }

    var users = msg.reactions.cache.get(reaction).users.cache
    users.delete(client.user.id)

    var winner = users.random()

    if(!winner) return message.channel.send('No one joined the giveaway!')
    message.channel.send(`${winner} won the giveaway`)
  }
}

function generateGiveawayEmbed(giveawayObject, time_left_String, last_chance_to_join, ended){
  const prize = giveawayObject.prize
  const host = giveawayObject.host
  const winners = giveawayObject.winners
  const end_time = giveawayObject.end_time

  const embed = new MessageEmbed()
    .setTitle(prize)
    .setDescription(`React with ${reaction} to enter \nTime remaining: ${time_left_String} \nHosted by: ${host}`)
    .setFooter(`${winners} winners`)
    .setColor('BLUE')
    .setTimestamp()

  if(last_chance_to_join) embed.setDescription(`**Last Chance to Enter!** \nReact with ${reaction} to enter \nTime remaining: ${time_left_String} \nHosted by: ${host}`).setColor('RED')

  if(ended) embed.setDescription(`Giveaway Ended \nHosted by: ${host}`).setColor('GRAY')

  return embed
}