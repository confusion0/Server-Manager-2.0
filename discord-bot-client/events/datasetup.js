const Keyv = require('keyv')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

module.exports = {
  name: 'datasetup',
  run: async(client) => {
    client.gData = new Keyv(process.env.MONGOPATH, {namespace: 'guilds'})
    client.uData = new Keyv(process.env.MONGOPATH, {namespace: 'users'})

    client.gData.on('error', err => console.error('Keyv connection error:', err));
    client.uData.on('error', err => console.error('Keyv connection error:', err));
  }
}