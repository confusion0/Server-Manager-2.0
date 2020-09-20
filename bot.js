const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path')
const fs = require('fs')
const walkSync = require('./walkSync.js');

client.OWNERID = process.env.OWNERID
client.commandFiles = walkSync(path.join(__dirname, '/commands'))
client.eventFiles = walkSync(path.join(__dirname, '/events'))
client.commands = new Discord.Collection();
client.events = new Discord.Collection()
client.shardId = "Not Sharded" // deafult
client.invites = {}
client.snipes = new Map()
client.gData = new Map()

const token = process.env.TOKEN;

process.on("message", message => {
    if (!message.type) return false;

    if (message.type == "shardId") client.shardId = message.data.shardId
});

for (const file of client.commandFiles) {
  const command = require(`${file}`);
  client.commands.set(command.name, command);
}

for (const file of client.eventFiles) {
  const event = require(`${file}`);
  client.events.set(event.name, event)
  event.run(client);
}

client.login(token);