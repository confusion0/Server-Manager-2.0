const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')

client.config = require("./config.json")
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.invites = {}

const token = process.env.TOKEN;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

client.commandFiles = commandFiles;
client.eventFiles = eventFiles;

console.log('\x1b[1m%s\x1b[0m', 'Commands Loaded:');
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
  const loaded = [`${file}`];
  console.log(loaded);
}

console.log();

console.log('\x1b[1m%s\x1b[0m', 'Events Loaded:');
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.events.set(event.name, event);
  const loaded = [`${file}`];
  console.log(loaded);
}

console.log();

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
