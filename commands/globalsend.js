function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

module.exports = {
  name: 'globalsend',
  aliases: [],
  reqPerm: "BOT_ADMIN",
  args: "<message",
  desc: "Messages all the guild owners that have the bot the specified message.",
  example: ['The Bot is updated.', 'Bot is back online'],
  module: "Secret",
  run: async(client, message, args) => {
    const content = args.join(" ");
    const guildOwners = []
    client.guilds.cache.forEach(guild => {
      guildOwners.push( client.users.cache.get(guild.ownerID) )
    });
    const uniqueGuildOwners = guildOwners.filter(onlyUnique)
    for(owner of uniqueGuildOwners){
      owner.send(content)
    }
  }
}