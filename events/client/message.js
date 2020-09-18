const fs = require("fs")
const Discord = require('discord.js')
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'message',
  run: async(client) => {
    await sleep(2000)
    client.on('message', async message => {
      if (!message.guild) return;
      if (message.author.bot) return;

      // const serverprefix = client.gData.get(message.guild.id).prefix || process.env.PREFIX
      const serverprefix = process.env.PREFIX 

      // if(message.content.startsWith('<@') && message.mentions.users.first() && message.mentions.users.first().id === client.user.id) return message.channel.send(`Server prefix is \`${serverprefix}\``)

      if (!message.content.startsWith(serverprefix)) return;
    
      //if(message.author.id != client.OWNERID ) return message.channel.send("The owner has set the bot to owner only mode.")

      console.log(message.content + ' -- ' + message.author.tag + " -- " + (message.guild).toString());

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
          if(command.reqPerms == "BOT_OWNER" && message.author.id != client.OWNERID) return message.channel.send("This command is reserved for the owner of the bot only.")
          if(command.reqPerms != "BOT_OWNER" && command.reqPerms.length > 0 && !message.member.hasPermission(command.reqPerms)) if(message.author.id != client.OWNERID) return message.channel.send(`You need \`${command.reqPerms.join("``")}\` permmisions to run this command.`)
          else message.channel.send(`Bot owner detected, bypassed \`${command.reqPerms.join("``")}\` permmisions`)
          return client.commands.get(command.name).run(Discord, client, message, args);
        }
      }
    })
  }
}
