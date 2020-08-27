const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const walkSync = require('./walkSync.js');

client.config = require("./config.json")
client.mongo = require("./mongo")
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.invites = {}

const token = process.env.TOKEN;

const commandFiles = walkSync('./commands')
const eventFiles = walkSync('./events')

client.commandFiles = commandFiles;
client.eventFiles = eventFiles;

const loaded = []

for (const file of commandFiles) {
  const command = require(`./${file}`);
  client.commands.set(command.name, command);
  loaded.push({ type: "Command", name: command.name, loaded: true});
}

for (const file of eventFiles) {
  const event = require(`./${file}`);
  client.events.set(event.name, event);
  loaded.push({ type: "Event", name: event.name, loaded: true});
}

console.table(loaded)

client.on('ready', () => {
  return client.events.get("ready").run(Discord, client);
})

client.on('guildMemberAdd', member => {
  return client.events.get("guildMemberAdd").run(Discord, client, member);
})

client.on('inviteCreate', invite => {
  return client.events.get("inviteCreate").run(Discord, client, invite);
})

client.on('message', message => {
  return client.events.get("message").run(Discord, client, message);
})

client.login(token);
