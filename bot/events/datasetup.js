const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Keyv = require('keyv');
const keyv = new Keyv()//'mongodb://Keyv:isVGgfUZ1AGV7tu2@servermanager20.2uzgc.mongodb.net:27017/servermanager20');
keyv.on('error', err => console.error('Keyv connection error:', err));

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

    client.guilds.cache.forEach(guild => {
      console.log(kGuilds.get(guild.id))
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