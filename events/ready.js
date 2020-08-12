const wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'ready',
  run: async(Discord, client) => {
    console.log(`Logged in as ${client.user.tag}`)

    let i = 0

    setInterval(function(){
      let activities = [`over ${client.guilds.cache.size} servers!`, `over ${client.channels.cache.size} channels!`, `over ${client.users.cache.size} users!`]

      client.user.setActivity(activities[i], { type : "WATCHING" })

      i = (i + 1) % activities.length
    }, 5000);

    wait(1000);

    client.guilds.forEach(g => {
      g.fetchInvites().then(guildInvites => {
        client.invites[g.id] = guildInvites;
      });
    });
  }
}
