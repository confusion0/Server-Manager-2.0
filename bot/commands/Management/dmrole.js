module.exports = {
  name: 'dmrole',
  aliases: [],
  reqPerms: "ADMINISTRATOR",
  args: "<mention> <message",
  desc: "DM's the amount specified",
  run: async(Discord, client, message, args) => {
    const role = message.mentions.roles.first()
    if(!role) return message.channel.send("Please mention the role you want to send this message to.")
    args.shift()
    var amount = 0;
    message.guild.members.cache.forEach(member => {
      if(member.roles.cache.find(crole => crole.id === role.id)){
        member.user.send(args.join(' '));
        amount++
      }
    })
    message.channel.send(`That message was sent to ${amount} users with ${role} role.`)
  }
}