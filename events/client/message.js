const fs = require("fs")
const Discord = require('discord.js')
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'message',
  run: async(client) => {
    client.on('message', async message => {
      if (!message.guild) return;
      if (message.author.bot) return;
      
      const serverprefix = process.env.PREFIX 

      if(message.content.startsWith('<@') && message.mentions.users.first() && message.mentions.users.first().id === client.user.id) return message.channel.send(`Server prefix is \`${serverprefix}\``)

      if (!message.content.startsWith(serverprefix)) return;

      console.log(message.content + ' -- ' + message.author.tag + " -- " + message.channel.name + " -- " + (message.guild).toString());

      const args = message.content.slice(serverprefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      for (const file of client.commandFiles) {
        const command = require(`${file}`);
        var runCmd = false;
        if (cmd == command.name) runCmd = true;
        for(const alias of command.aliases){
          if(cmd == alias) runCmd = true;
        }
        if(runCmd) {
          if(command.reqPerm == "BOT_ADMIN" && !client.ADMINS.find(admin => admin.ID === message.author.id)) return message.channel.send("This command is reserved for bot admins only.")
          if(command.reqPerm != "BOT_ADMIN" && command.reqPerm != "NONE" && !message.member.hasPermission(command.reqPerm)) if(!client.ADMINS.find(admin => admin.ID === message.author.id)) return message.channel.send(`You need \`${command.reqPerm}\` permmision to run this command.`)
          else message.channel.send(`Bot admin detected, bypassed \`${command.reqPerm}\` permmisions for ${message.author.tag}`)
          return client.commands.get(command.name).run(Discord, client, message, args);
        }
      }
    })
  }
}
