module.exports = {
  name: 'whois',
  aliases: [],
  run: async(Discord, client, message, args) => {
    if(!args[0]) return message.channel.send("Please mention a user to use this command on. @Example")
    let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])) 
    let user = message.mentions.users.first()
    if(!user) return message.channel.send("Please enter the user as a mention. Ex: @Example")
    let guild = message.guild

    let createdAt = (user.createdAt).toString().slice(0, 14)
    let joinedAt = (rMember.joinedAt).toString().slice(0, 14)
    let roleAmount = rMember.roles.cache.size - 1
    let id = user.id

    let roles = ""
    rMember.roles.cache.forEach(role => {
      if(role.toString() != "@everyone") roles += role.toString() + " "
    })

    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(user.tag, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addField(`Registered: `, createdAt, true)
    .addField(`Joined: `, joinedAt, true)
    .addField(`Roles[${roleAmount}]: `, roles)
    .setFooter(`ID: ${id}`)
    .setTimestamp()
    message.channel.send(embed)
  }
}
