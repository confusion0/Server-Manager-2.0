const { MessageEmbed } = require('discord.js')
const ms = require("ms")

module.exports = {
  name: 'whois',
  aliases: [],
  reqPerm: "NONE",
  args: "[mention]",
  cooldown: 1000,
  module: "General",
  desc: "Displays useful information on a user.",
  example: ['@!!NoobMan13!!', '@Commander786'],
  run: async(client, message, args) => {
    let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.member(message.author))
    let user = rMember.user
    if(!user) return message.channel.send("Please enter the user as a mention. Ex: @Example")
    let guild = message.guild

    let createdAt = (user.createdAt).toString().slice(0, 15)
    let joinedAt = (rMember.joinedAt).toString().slice(0, 15)
    var createdAgo = ms(Math.abs(new Date() - user.createdAt),{long:true})
    var joinedAgo = ms(Math.abs(new Date() - rMember.joinedAt),{long:true})
    let roleAmount = rMember.roles.cache.size - 1
    let id = user.id

    let roles = ""
    rMember.roles.cache.forEach(role => {
      if(role.toString() != "@everyone") roles += role.toString() + " "
    })
    if(!roles) roles = "No roles"
    if(roles.length > 1024) roles = roleAmount + " roles"

    let userStatus = user.presence.status
    if(userStatus === "offline") userStatus = "⚫ Offline"
    if(userStatus === "dnd") userStatus = "⛔ Do Not Disturb"
    if(userStatus === "online") userStatus = ":green_circle: Online"

    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(rMember.user)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addField(`Registered: `, `${createdAt} (${createdAgo} ago)`, true)
    .addField(`Joined: `, `${joinedAt} (${joinedAgo} ago)`, true)
    .addField(`Status: `, userStatus)
    .addField(`Roles[${roleAmount}]: `, roles)
    .setFooter(`ID: ${id}`)
    .setTimestamp()
    message.channel.send(embed)
  }
}
