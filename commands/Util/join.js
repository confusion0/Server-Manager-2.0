module.exports = {
  name: 'join',
  aliases: [],
  reqPerms: ["MANAGE_GUILD"],
  args: "",
  desc: "Emulates a user joining the server that this command is ran in.",
  run: async(Discord, client, message, args) => {
    if(message.author.id == client.config.OWNERID){
      client.emit('guildMemberAdd', (Discord, client, message.member))
    }
  }
}
