const fs = require("fs")
const anti_ad = require('../anti-ad')

module.exports = {
  name: 'message',
  run: async(Discord, client, message) => {
    if (!message.guild) return;
    if (message.author.bot) return;

    anti_ad.run(client, message)

    if (!message.content.startsWith(process.env.PREFIX)) return;
  
    //if(message.author.id != client.config.OWNERID ) return message.channel.send("The owner has set the bot to owner only mode.")

    console.log(message.content + ' -- ' + message.author.tag + " -- " + (message.guild).toString());

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    for (const file of client.commandFiles) {
      const command = require(`../../${file}`);
      var runCmd = false;
      if (cmd == command.name) runCmd = true;
      for(const alias of command.aliases){
        if(cmd == alias) runCmd = true;
      }
      if(runCmd) {
        if(command.reqPerms == "BOT_OWNER" && message.author.id != client.config.OWNERID) return message.channel.send("This command is reserved for the owner of the bot only.")
        if(command.reqPerms != "BOT_OWNER" && command.reqPerms.length > 0 && !message.member.hasPermission(command.reqPerms)) return message.channel.send(`You need \`${command.reqPerms.join("``")}\` perms to run this command.`)
        return client.commands.get(command.name).run(Discord, client, message, args);
      }
    }
  }
}
