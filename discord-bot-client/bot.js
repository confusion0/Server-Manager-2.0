const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path')
const fs = require('fs')
const walkSync = require('./walkSync.js');

client.ADMINS = [
  {"lastKnownTag": "!!NoobMan13!!#6972", "ID": "564177349990416484"},
  {"lastKnownTag": "Commander786#5848", "ID": "691663740512501811"}
]

client.emojilist = [
  { name: "green_load", id: "783056468496089098" },
  { name: "yellow_load", id: "783056524057903144"},
  { name: "red_load", id: "783056506299088928"},
  { name: "grey_load", id: "783056491938316318"}
]

client.commandFiles = walkSync(path.join(__dirname, '/commands'))
client.eventFiles = walkSync(path.join(__dirname, '/events'))
client.featureFiles = walkSync(path.join(__dirname, '/features'))
client.prerequisiteFiles = walkSync(path.join(__dirname, '/prerequisites'))

client.commands = new Discord.Collection();
client.events = new Discord.Collection()
client.features = new Discord.Collection()
client.prerequisites = new Discord.Collection()

client.shardId = "Not Sharded" // deafult

client.invites = {}

client.snipes = new Map()

client.voted = async (userID, botlist, multiplier) => {
  if(!client.uData) return

  const multi = multiplier || 1

  var votes = (await client.uData.get(`${userID}:votes`)) + multi || multi

  await client.uData.set(`${userID}:votes`, votes)
  await client.uData.set(`${userID}:votes:${botlist}`, new Date().getTime())

  const user = client.users.cache.get(userID)

  if(user) user.send(`Thank you for voting for ${client.user.username} on ${botlist}, I have added ${multi} vote to your votes! You currently have ${(await client.uData.get(`${userID}:votes`))}`)
}

const token = process.env.TOKEN;

process.on("message", message => {
    if (!message.type) return false;

    if (message.type == "shardId") client.shardId = message.data.shardId
});

for (const file of client.commandFiles) {
  const command = require(`${file}`);
  client.commands.set(command.name, command);
  console.log('Loaded Command: ' + command.name)
}

for (const file of client.eventFiles) {
  const event = require(`${file}`);
  client.events.set(event.name, event)
  event.run(client);
  console.log('Loaded Event: ' + event.name)
}

for (const file of client.featureFiles) {
  const feature = require(`${file}`);
  client.features.set(feature.name, feature)
  feature.run(client);
  console.log('Loaded Feature: ' + feature.name)
}

for (const file of client.prerequisiteFiles) {
  const prerequisite = require(`${file}`);
  client.prerequisites.set(prerequisite.name, prerequisite)
  prerequisite.run(client);
  console.log('Loaded Prerequisite: ' + prerequisite.name)
}

client.login(token);