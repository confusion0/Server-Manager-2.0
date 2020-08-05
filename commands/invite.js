const invite = `
Invite bot: [Click Here](https://discord.com/api/oauth2/authorize?client_id=739943852726681650&permissions=8&scope=bot)
Support Server: [Click Here](https://discord.gg/r4WCBQe)
`

module.exports = {
  name: 'invite',
  aliases: [],
  run: async(Discord, client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle("Invite")
      .setDescription(invite)
      message.channel.send(embed)
  }
}
