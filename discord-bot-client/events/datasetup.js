const Keyv = require('keyv')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
  name: 'datasetup',
  run: async(client) => {
    await sleep(1000)
    
    client.gData = new Keyv(process.env.MONGOPATH, {namespace: 'guilds'})
    client.uData = new Keyv(process.env.MONGOPATH, {namespace: 'users'})
    
    client.on('guildCreate', guild => {
      client.gData.set(new Map())
      
      client.gData.set(guild.id, {
        id: guild.id,
        prefix: '?'
      })
    })
    client.on('guildDelete', guild => {
      client.gData.delete(guild.id)
    })
    
    client.guilds.cache.forEach(async guild => {
      const data = await client.gData.get(guild.id)
      if(!data) return client.emit('guildCreate', guild)
      updateDatabase(client)
    })
    
    // client.gData.forEach(async (value, key, map) => {
    //   const guild = client.guilds.cache.find(guild => guild.id === key)
    //   if(!guild) return client.gData.delete(key)
    // })
  }
}

async function updateDatabase(client){
  
}