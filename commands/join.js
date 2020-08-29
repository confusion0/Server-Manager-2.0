module.exports = {
  name: 'join',
  aliases: [],
  reqPerms: ["MANAGE_GUILD"],
  run: async(Discord, client, message, args) => {
    if(message.author.id == client.config.OWNERID){
      client.emit('guildMemberAdd', (Discord, client, message.member))
    }
  }
}
