const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.config = require("./config.json)
client.commands = new Discord.Collection();

const token = process.env.TOKEN;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.commandFiles = commandFiles;

console.log('\x1b[1m%s\x1b[0m', 'Embeds Loaded:');
for (const file of commandFiles) {
  const commands = require(`./commands/${file}`);
  client.commands.set(commands.name, commands);
  const loaded = [`${file}`];
  console.log(loaded);
}

console.log();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
  client.user.setActivity('with !help');
})

client.on('message', message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(client.config.prefix)) return;

  var hasPerms = false
  client.config.allowedCustomEmbed.forEach((id) => {
    if(id === message.author.id) hasPerms = true
  });
  const embed = new Discord.MessageEmbed()
  .setTitle("Access Denied")
  .setDescription("Please contact <@564177349990416484> in order to gain access to this command.")
  if(!hasPerms) return message.channel.send(embed)

  message.delete()

  console.log(message.content + ' -- ' + message.author.tag);

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  for (const file of client.commandFiles) {
    const command = require(`./commands/${file}`);
    var runCmd = false;
    if (cmd === command.name) runCmd = true;
    for(const alias of command.aliases){
      if(cmd === alias) runCmd = true;
    }
    if(runCmd) return client.commands.get(command.name).run(Discord, client, message, args);
  }
})

client.login(token);
