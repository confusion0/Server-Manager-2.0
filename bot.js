const { Client, Collection } = require('discord.js');
const client = new Client();
const path = require('path')
const fs = require('fs')
const walkSync = require('./walkSync.js');

client.config = require('./config.json')

client.commandFiles = walkSync(path.join(__dirname, '/commands'))
client.eventFiles = walkSync(path.join(__dirname, '/events'))
client.chatFilterFiles = walkSync(path.join(__dirname, '/filters'))

client.commands = new Collection();
client.events = new Collection()
client.chatFilters = new Collection()

client.shardId = "Not Sharded"

client.invites = {}

client.snipes = new Map()

process.on("message", message => {
    if (!message.type) return false;

    if (message.type == "shardId") client.shardId = message.data.shardId
});

for (const file of client.commandFiles) {
  let command = require(file);
  command.path = file;
  client.commands.set(command.name, command);
  console.log('Loaded: ' + command.name)
}

for (const file of client.chatFilterFiles) {
  let chatFilter = require(file);
  chatFilter.path = file;
  client.chatFilters.set(chatFilter.name, chatFilter);
  console.log('Loaded: ' + chatFilter.name)
}

for (const file of client.eventFiles) {
  let event = require(file);
  event.path = file;
  client.events.set(event.name, event)
  console.log(`Loaded: ${event.name}`)
  if(event.once){
    client.once(event.name, (...args) => event.run(client, ...args));
  } else {
    client.on(event.name, (...args) => event.run(client, ...args));
  }
  
  console.log(`Started: ${event.name}`)
}

const mongo = require('./mongo.js')
mongo()

client.login(process.env.TOKEN);