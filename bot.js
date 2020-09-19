console.log('Start of bot.js') // DELETE
const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path')
const fs = require('fs')
const walkSync = require('./walkSync.js');

console.log('After required everything') // DELETE

client.OWNERID = process.env.OWNERID
// client.mongo = require("./mongo").mongo
// client.acts = require('./helperfunctions') BROKEN
client.commands = new Discord.Collection();
client.shardId = "Not Sharded" // deafult
client.invites = {}

client.snipes = new Map()
client.gData = new Map()

const token = process.env.TOKEN;

process.on("message", message => {
    if (!message.type) return false;

    if (message.type == "shardId") client.shardId = message.data.shardId
});

const commandFiles = walkSync(path.join(__dirname, '/commands'))
const eventFiles = walkSync(path.join(__dirname, '/events'))

client.commandFiles = commandFiles;
client.eventFiles = eventFiles;

for (const file of commandFiles) {
  const command = require(`${file}`);
  client.commands.set(command.name, command);
}

for (const file of eventFiles) {
  const event = require(`${file}`);
  event.run(client);
}

client.login(token);

console.log('After login') // DELETE