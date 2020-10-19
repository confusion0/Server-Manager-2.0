const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path')
const fs = require('fs')
const walkSync = require('./walkSync.js');

client.ADMINS = [
  {"lastKnownTag": "!!NoobMan13!!#6972", "ID": "564177349990416484"},
  {"lastKnownTag": "Commander786#5848", "ID": "691663740512501811"}
]

client.commandFiles = walkSync(path.join(__dirname, '/commands'))
client.eventFiles = walkSync(path.join(__dirname, '/events'))
client.commands = new Discord.Collection();
client.events = new Discord.Collection()
client.shardId = "Not Sharded" // deafult
client.invites = {}
client.snipes = new Map()

client.voted = async (userID, botlist) => {
  if(!client.uData) return

  var votes = (await client.uData.get(`${userID}:votes`)) + 1 || 1

  await client.uData.set(`${userID}:votes`, votes)

  const user = client.users.cache.get(userID)

  if(user){
    user.send(`Thank you for voting for ${client.user.username} on ${botlist}, I have added 1 vote to your votes! You currently have ${(await client.uData.get(`${userID}:votes`))}`)
  }
}

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