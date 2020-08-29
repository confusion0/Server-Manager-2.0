function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

module.exports = {
  name: 'globalsend',
  aliases: [],
  reqPerms: "BOT_OWNER",
  run: async(Discord, client, message, args) => {
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