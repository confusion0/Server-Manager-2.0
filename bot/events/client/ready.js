const wait = require('util').promisify(setTimeout);
const chalk = require('chalk')

module.exports = {
  name: 'ready',
  run: async(Discord, client) => {
    console.log(`Logged in as ${client.user.tag}`)

    let i = 0

    setInterval(function(){
      let activities = [`${client.guilds.cache.size} servers!`, `${client.channels.cache.size} channels!`, `${client.users.cache.size} users!`]

      client.user.setActivity(activities[i], { type : "WATCHING" })

      i = (i + 1) % activities.length
    }, 5000);

    wait(1000);

    client.guilds.cache.forEach(g => {
      g.fetchInvites().then(guildInvites => {
        client.invites[g.id] = guildInvites;
      });
    });
  }
}
