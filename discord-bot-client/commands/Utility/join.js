module.exports = {
  name: 'join',
  aliases: [],
  reqPerm: "MANAGE_GUILD",
  args: "[user]",
  desc: "Emulates a user joining the server that this command is ran in.",
  example: ['!!Noobman13!!', '@Commander786'],
  module: "Util",
  run: async(client, message, args) => {
    const mention = message.mentions.users.first()
    const rMember = message.guild.member(mention || message.author)
    client.emit('guildMemberAdd', (rMember))
  }
}
