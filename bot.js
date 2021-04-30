const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path')
const fs = require('fs')
const walkSync = require('./walkSync.js');

client.commandFiles = walkSync(path.join(__dirname, '/commands'))
client.eventFiles = walkSync(path.join(__dirname, '/events'))

client.commands = new Discord.Collection();
client.events = new Discord.Collection()

client.shardId = "Not Sharded"

client.invites = {}

client.snipes = new Map()

process.on("message", message => {
    if (!message.type) return false;

    if (message.type == "shardId") client.shardId = message.data.shardId
});

for (const file of client.commandFiles) {
  const command = require(`${file}`);
  client.commands.set(command.name, command);
  console.log('Loaded: ' + command.name)
}

for (const file of client.eventFiles) {
  const event = require(`${file}`);
  client.events.set(event.name, event)
  console.log(`Loaded: ${event.name}`)
  client.on(event.name, (...args) => event.run(client, ...args));
  console.log(`Started: ${event.name}`)
}

client.login(process.env.TOKEN);