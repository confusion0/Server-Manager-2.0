const fs = require("fs")

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const command_cooldowns = new Map()

const Discord = require('discord.js')

const PrefixSchema = require('../schemas/Prefix.js')

module.exports = {
  name: 'message',
  run: async(client, message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    if(await client.chatFilters.get('antiad').run(client, message)) return;
    if(await client.chatFilters.get('schematic').run(client, message)) return;
    
    const prefix = await PrefixSchema.get(message.guild.id)
    let serverprefix = prefix || client.config.PREFIX;

    if(message.content.startsWith('<@') && message.mentions.users.first() && message.mentions.users.first().id === client.user.id) return message.channel.send(`Server prefix is \`${serverprefix}\``)

    if (!message.content.startsWith(serverprefix)) return;

    console.log(`${message.content} |  ${message.author.tag} -- ${message.channel.name} -- ${message.guild.toString()}`)

    const args = message.content.slice(serverprefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    var command = client.commands.get(cmd.toLowerCase())

    if( !command ) client.commands.forEach( $command => { $command.aliases.forEach( alias => { if(alias == cmd) command = $command } ) } )

    if(command){
      //Permmision Checking
      if(command.reqPerm == "BOT_ADMIN" && !client.config.ADMINS.find(admin => admin.id=== message.author.id)) return message.channel.send("This command is reserved for bot admins only.")

      if(command.reqPerm != "BOT_ADMIN" && command.reqPerm != "NONE" && !message.member.hasPermission(command.reqPerm)) {
        if(!client.config.ADMINS.find(admin => admin.id === message.author.id)) return message.channel.send(`You need \`${command.reqPerm}\` permmision to run this command.`)
        else message.channel.send(`Bot admin detected, bypassed \`${command.reqPerm}\` permmisions for ${message.author.tag}`)
      }

      //Cooldown Checking
      if(command.cooldown) {
        if(command_cooldowns.get(`${message.author.id}:${command.name}`))     return message.channel.send(new Discord.MessageEmbed().setTitle('Cooldown Alert').setDescription(`The \`${command.name}\` command has a \`${command.cooldown/1000}s\` cooldown. You stil to wait \`${command_cooldowns.get(`${message.author.id}:${command.name}`)/1000}s\` untill you can run the command again.`).setColor('RED'))
        else {
          var cooldown = command.cooldown
          command_cooldowns.set(`${message.author.id}:${command.name}`, cooldown)

          var interval = setInterval(function(){
            command_cooldowns.set(`${message.author.id}:${command.name}`, cooldown)
            cooldown -= 100
          }, 100)

          setTimeout(function(){
            clearInterval(interval)
            command_cooldowns.delete(`${message.author.id}:${command.name}`)
          }, command.cooldown)
        }
      }
      try {
        command.run(client, message, args);
      }
      catch(error) {
        message.channel.send(`An error occured when running this command! Please join my support server in my help menu and report this error and what you were doing to the Devs though the ModMail Bot. ERROR: \`\`\`${clean(error)}\`\`\``)
      }
    }
  }
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}