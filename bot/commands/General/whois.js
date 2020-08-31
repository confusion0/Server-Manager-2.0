module.exports = {
  name: 'whois',
  aliases: [],
  reqPerms: [],
  args: "[mention]",
  desc: "Displays useful information on a user.",
  run: async(Discord, client, message, args) => {
    let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.member(message.author))
    let user = rMember.user
    if(!user) return message.channel.send("Please enter the user as a mention. Ex: @Example")
    let guild = message.guild

    let createdAt = (user.createdAt).toString().slice(0, 15)
    let joinedAt = (rMember.joinedAt).toString().slice(0, 15)
    let roleAmount = rMember.roles.cache.size - 1
    let id = user.id

    let roles = ""
    rMember.roles.cache.forEach(role => {
      if(role.toString() != "@everyone") roles += role.toString() + " "
    })
    if(!roles) roles = "No roles"

    let userStatus = user.presence.status
    if(userStatus === "offline") userStatus = "⚫ Offline"
    if(userStatus === "dnd") userStatus = "⛔ Do Not Disturb"
    if(userStatus === "online") userStatus = ":green_circle: Online"

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(rMember.user)
    .setAuthor(user.tag, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addField(`Registered: `, createdAt, true)
    .addField(`Joined: `, joinedAt, true)
    .addField(`Status: `, userStatus)
    .addField(`Roles[${roleAmount}]: `, roles)
    .setFooter(`ID: ${id}`)
    .setTimestamp()
    message.channel.send(embed)
  }
}
