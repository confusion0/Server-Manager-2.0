module.exports = {
  name: 'whois',
  aliases: [],
  run: async(Discord, client, message, args) => {
    if(!args[0]) return message.channel.send("Please mention a user to use this command on. @Example")
    let mention = args[0]
    let member = message.mentions.members.first()
    if(!user) return message.channel.send("Please enter the user as a mention. Ex: @Example")
    let guild = message.guild

    const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addField("Account Created: ", member.user.createdAt, true)
    .addField("Joined this Server: ", member.joinedAt, true)
    .setFooter(`Requested by ${message.author.tag} • Searched User`)
    .setTimestamp()
  }
}
