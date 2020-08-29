module.exports = {
  name: 'mail',
  aliases: [],
  reqPerms: [],
  args: "<mention> <message",
  desc: "Mails the specified message to the user that you mention.",
  run: async(Discord, client, message, args) => {
    if(!args[0]) return message.channel.send("Please mention the user you would like me to mail. "+process.env.PREFIX+"mail @recipient <message>")
    let user = message.mentions.users.first()
    if(!user) return message.channel.send("Please mention the user you would like me to mail. "+process.env.PREFIX+"mail @recipient <message>")

    args.shift()

    const embed = new Discord.MessageEmbed()
    .setAuthor("From: " + message.author.tag, message.author.displayAvatarURL())
    .setDescription(args.join(" "))
    .setFooter("SENDER USER ID: " + user.id)
    .setTimestamp()

    user.send(embed)

    message.channel.send("Your mail was sent! Here is what it looked like.")

    message.channel.send(embed)
  }
}
