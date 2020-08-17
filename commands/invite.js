const Rmessage = `
[Commands/Feature List](https://servermanager20.herokuapp.com/)
[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=739943852726681650&permissions=8&scope=bot)
[Support Server](https://discord.gg/r4WCBQe)
`

module.exports = {
  name: 'help',
  aliases: ['invite'],
  run: async(Discord, client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle("Additional Resources")
      .setDescription(Rmessage)
      message.channel.send(embed)
  }
}
