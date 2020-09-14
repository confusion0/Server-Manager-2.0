const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'datasetup',
  run: async(client) => { 
    client.on('guildCreate', async guild => {
      client.gData.set(guild.id, {
        _id: guild.id,
        prefix: process.env.PREFIX,
        messageTriggers: new Map(),
        invites: {
          on: false,
          channel: "invite-logs",
          message: "{user}"
        }
      })
    })
    client.on('guildDelete', async guild => {
      client.gData.delete(guild.id)
    })

    await sleep(1000)

    client.guilds.cache.forEach(guild => {
      if(!client.gData.has(guild.id)) client.emit('guildCreate', (guild))
    })
    client.gData.forEach(data => {
      if(!client.guilds.cache.has(data._id)) client.emit('guildDelete', (data))
    })
  }
}