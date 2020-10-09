module.exports = {
  name: 'ownerwithbotguilds',
  aliases: ['owbg'],
  reqPerm: "BOT_ADMIN",
  args: "<mention or id>",
  desc: "Runs the specified code.",
  example: ['@!!NoobMan13!!', '@Commander786'],
  module: "Secret",
  run: async(client, message, args) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    if(!user) return message.channel.send('No mention or ID detected')
    const ownerID = user.id

    const promises = [ client.shard.fetchClientValues('guilds.cache') ]

    return Promise.all(promises)
      .then(results => {
        var guilds = []
        for( guild of results[0][0]){
          if(guild.ownerID == ownerID) guilds.push(guild)
        }
        if(guilds.length < 1) {
          message.channel.send("No guilds found")
        }
        for( guild of guilds ){
          message.channel.send(`\`${guild.id}\` is owned by \`${user.tag}\`, called \`${guild.name}\``)
        }
      })
      .catch(console.error);
  }
}