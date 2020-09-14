module.exports = {
  name: 'join',
  aliases: [],
  reqPerms: ["MANAGE_GUILD"],
  args: "[user]",
  desc: "Emulates a user joining the server that this command is ran in.",
  run: async(Discord, client, message, args) => {
    const mention = message.mentions.users.first()
    const rMember = message.guild.member(mention || message.author)
    client.emit('guildMemberAdd', (Discord, client, rMember))
  }
}
