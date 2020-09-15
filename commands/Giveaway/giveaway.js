const { MessageEmbed } = require('discord.js')
const ms = require('ms')

var giveawayEmbeds = {
  length: new MessageEmbed()
  .setDescription('How long would you like this giveaway to last? \nExample: 1d, 3 hours, 10m or 5 seconds \n '),
  prize: new MessageEmbed()
  .setDescription('What would you like to giveaway? \nExample: Awesome Role'),
  winners: new MessageEmbed()
  .setDescription('How many winners do you want for this giveaway? \nExample: 1'),
  channel: new MessageEmbed()
  .setDescription('Please mention the channel you would like this giveaway to be in. \nExample: #giveaways'),
  timeout: new MessageEmbed()
  .setTitle(':octagonal_sign: Error')
  .setDescription('You ran out of time')
  .setFooter('Do the giveaway command again to continue')
  .setColor('RED'),
  cancelled: new MessageEmbed()
  .setTitle(':white_check_mark: You have cancelled the giveaway!')
  .setFooter('Do the giveaway command again to continue')
  .setColor('GREEN')
}

const deafultColor = "BLUE"
const deafultFooter = 'Reply with "cancel" to stop the process'
const deafultTitle = ":tada: Giveaway Setup"

for(var embed in giveawayEmbeds){
  if(!giveawayEmbeds[embed].title) giveawayEmbeds[embed].setTitle(deafultTitle)
  if(!giveawayEmbeds[embed].color) giveawayEmbeds[embed].setColor(deafultColor)
  if(!giveawayEmbeds[embed].footer) giveawayEmbeds[embed].setFooter(deafultFooter)
}



module.exports = {
  name: 'giveaway',
  aliases: ['gg'],
  reqPerms: "BOT_OWNER",//["MANAGE_GUILD"],
  args: "",
  desc: "Starts a giveaway constructor (Not Finished) (interactive)",
  run: async(Discord, client, message, args) => {
    // for(var embed in giveawayEmbeds){
    //   message.channel.send(giveawayEmbeds[embed])
    // }

    const giveaway = {}
    const filter = response => { return response.author.id == message.author.id }

    do {
      message.channel.send(giveawayEmbeds.length)
      await message.channel.awaitMessages(filter, { max: 1, time: 60000})
      .then(collected => giveaway.length = collected.first().content)
      if(giveaway.length === undefined) return message.channel.send(giveawayEmbeds.timeout)
      giveaway.length = ms(giveaway.length)
      if(isNaN(giveaway.length)) giveaway.length = undefined
    } while (!giveaway.length)

    do {
      message.channel.send(giveawayEmbeds.prize)
      await message.channel.awaitMessages(filter, { max: 1, time: 60000})
      .then(collected => giveaway.prize = collected.first().content)
      if(giveaway.prize === undefined) return message.channel.send(giveawayEmbeds.timeout)
      if(giveaway.prize.length > 1024) giveaway.prize = undefined
    } while (!giveaway.prize)

    do {
      message.channel.send(giveawayEmbeds.winners)
      await message.channel.awaitMessages(filter, { max: 1, time: 60000})
      .then(collected => giveaway.winners = parseInt(collected.first().content))
      if(giveaway.winners === undefined) return message.channel.send(giveawayEmbeds.timeout)
      if(isNaN(giveaway.winners)) giveaway.winners = undefined
    } while (!giveaway.winners)

    message.channel.send(JSON.stringify(giveaway), {code: '1x'})
  }
}