const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'serverinfo',
  aliases: [],
  reqPerm: "NONE",
  args: "",
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
        { name: 'Members', value: `${guild.memberCount} All Members \n${getMembersWithoutBots(guild)} Humans \n${getBots(guild)} Bots`, inline: true, },
        { name: 'Channels', value: `${guildChannelAmounts.total} Total \n${guildChannelAmounts.categories} Categories \n${guildChannelAmounts.text} Text, ${guildChannelAmounts.voice} Voice`, inline: true, },
        { name: 'Roles', value: `${guild.roles.cache.size}`, inline: true, },

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

function rolesToString(guild){
  let roles = ""
  guild.roles.cache.forEach(role => {
    if(role.toString() != "@everyone") roles += role.toString() + " "
  })
  if(!roles) roles = "No roles"
  return roles
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
