module.exports = {
  name: 'serverinfo',
  aliases: [],
  reqPerms: [],
  args: "[mention]",
  desc: "Displays useful information on a user.",
  run: async(Discord, client, message, args) => {
    const { guild } = message

    const { name, region, memberCount, owner, afkTimeout, roles } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for "${name}"`)
      .setThumbnail(icon)
      .addFields(
        {
          name: 'Region',
          value: region,
        },
        {
          name: 'All Members',
          value: memberCount,
          inline: true,
        },
        {
          name: 'Members',
          value: getMembersWithoutBots(guild),
          inline: true,
        },
        {
          name: 'Bots',
          value: getBots(guild),
          inline: true,
        },
        {
          name: 'Owner',
          value: `${owner.user.tag} (${owner})`,
        },
        {
          name: 'AFK Timeout',
          value: afkTimeout / 60,
        },
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
