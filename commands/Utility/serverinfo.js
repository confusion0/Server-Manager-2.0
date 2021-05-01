const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
  name: 'serverinfo',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  cooldown: 2000,
  module: "General",
  desc: "Displays useful information on a server.",
  example: [],
  run: async(client, message, args) => {
    const { guild } = message

    const guildChannelAmounts = getChannelAmounts(guild)

    const embed = new MessageEmbed()
      .setTitle(`Server info for "${guild.name}"`)
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: 'Region', value: guild.region, },
        { name: 'Owner', value: `${guild.owner.user.tag} (${guild.owner})`, },
        { name: 'Server Boost Status', value: `${guild.premiumSubscriptionCount} Boosts, Tier ${guild.premiumTier}`},
        { name: 'Members', value: `${guild.memberCount} All Members \n${getMembersWithoutBots(guild)} Humans \n${getBots(guild)} Bots`, inline: true, },
        { name: 'Channels', value: `${guildChannelAmounts.total} Total \n${guildChannelAmounts.categories} Categories \n${guildChannelAmounts.text} Text, ${guildChannelAmounts.voice} Voice`, inline: true, },
        { name: `Roles[${guild.roles.cache.size-1}]`, value: `${rolesToString(guild, { characterLimit: 700 })}`, },
        { name: `Created At`, value: `${(guild.createdAt).toString().slice(0, 15)} (${ms(guild.createdTimestamp, { long: true })} ago)`, },
      )

    message.channel.send(embed)
  }
}

function isbot(user){
  if(user.bot) return true
  return false
}

function getMembersWithoutBots(guild){
  var members = 0;
  guild.members.cache.forEach(member => {
    if(!isbot(member.user)) members++;
  })
  return members
}

function getBots(guild){
  var members = 0;
  guild.members.cache.forEach(member => {
    if(isbot(member.user)) members++;
  })
  return members
}

function rolesToString(guild, options){
  const characterLimit = options.characterLimit || false

  const notAdded = 'and {amount} more...'
  var notAddedAmount = 0
  
  let finalString = ""
  guild.roles.cache.forEach(role => {
    if(role.toString() == "@everyone") return "@everyone"
    if(characterLimit && !finalString.endsWith(notAdded) && (finalString + role.toString() + notAdded + '   ').length > characterLimit ) finalString += notAdded
    if(!finalString.endsWith(notAdded)) return finalString += role.toString() + " "
    notAddedAmount++
  })

  return (finalString.length > 0) ? finalString.replace('{amount}', notAddedAmount) : "No Roles"
}

function getChannelAmounts(guild){
  let channels = { total: 0, categories: 0, text: 0, voice: 0 }
  guild.channels.cache.forEach(channel => {
    channels.total ++
    if(channel.type == "category") channels.categories ++
    else if(channel.type == "text") channels.text ++
    else if(channel.type == "voice") channels.voice ++
  })
  return channels
}