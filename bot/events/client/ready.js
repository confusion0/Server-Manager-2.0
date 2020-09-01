const wait = require('util').promisify(setTimeout);
const chalk = require('chalk')

module.exports = {
  name: 'ready',
  run: async(Discord, client) => {
    client.totalGuilds = 0
    client.totalChannels = 0
    client.totalMembers = 0

    function updateClientData(client){
      const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)'),
        client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)')
      ];

      return Promise.all(promises)
        .then(results => {
          client.totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
          client.totalChannels = results[1].reduce((acc, channelCount) => acc + channelCount, 0);
          client.totalMembers = results[2].reduce((acc, memberCount) => acc + memberCount, 0);
        })
        .catch(console.error);
    }

    updateClientData(client)
    setInterval(updateClientData, 5 * 60 * 1000);

    let i = 0

    setInterval(function(){
      let activities = [`${client.totalGuilds} servers!`, `${client.totalChannels} channels!`, `${client.totalMembers} users!`]

      client.user.setActivity(activities[i], { type : "WATCHING" })

      i = (i + 1) % activities.length
    }, 5 * 1000);

    wait(1000);

    client.guilds.cache.forEach(g => {
      g.fetchInvites().then(guildInvites => {
        client.invites[g.id] = guildInvites;
      });
    });
  }
}
