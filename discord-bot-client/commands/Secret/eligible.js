module.exports = {
  name: 'eligible',
  aliases: [],
  reqPerm: "NONE",
  args: "",
  desc: "Checks if your eligible to join a giveaway which requirement is to add the bot to a server you own.",
  example: [],
  cooldown: 2000,
  run: async(client, message, args) => {
    const ownerID = message.author.id

    const promises = [ client.shard.fetchClientValues('guilds.cache') ]

    return Promise.all(promises)
      .then(results => {
        var messages = []
        var guilds = []
        for( guild of results[0][0]){
          if(guild.ownerID == ownerID) guilds.push(guild)
        }
        if(guilds.length < 1) {
          return message.channel.send("You are ineligible to participate this giveaways that require you to add me. Use the `help` command to invite me.")
        }
        message.channel.send('Looks like you are eligible to enter giveaways that require you to add me! Congrats, below are your qualifiying servers. Messages be cencored in 5 secs due to privacy reasons.')
        for( guild of guilds ){
          message.channel.send(`\`${guild.name}\` is owned by \`${guild.ownerID}\`, called \`${guild.name}\``)
            .then(msg => msg.delete({timeout: 5000}))
        }
      })
      .catch(console.error);
  }
}
