module.exports = {
  name: 'join',
  aliases: [],
  run: async(Discord, client, message, args) => {
    return client.events.get("guildMemberAdd").run(Discord, client, member);  
  }
}
