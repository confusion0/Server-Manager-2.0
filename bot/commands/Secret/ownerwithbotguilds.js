module.exports = {
  name: 'ownerwithbotguilds',
  aliases: [],
  reqPerms: "BOT_OWNER",
  args: "[mention]",
  desc: "Runs the specified code.",
  run: async(Discord, client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    if(!user) return message.channel.send('No mention detected')
    const ownerID = user.id

    const promises = [ client.shard.fetchClientValues('guilds.cache') ]

    return Promise.all(promises)
      .then(results => {
        var guilds = []
        for( guild of results[0][0]){
          if(guild.ownerID == ownerID) guilds.push(guild)
        }
        for( guild of guilds ){
          message.channel.send(`\`${guild.id}\` is owned by \`${user.tag}\`, called \`${guild.name}\``)
        }
      })
      .catch(console.error);
  }
}