const fs = require("fs")

module.exports = {
  name: 'message',
  run: async(Discord, client, message) => {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(client.config.prefix)) return;

    // var hasPerms = false
    // client.config.whitelist.forEach((user) => {
    //   if(user.id === message.author.id){
    //     hasPerms = true
    //   }
    // });
    // const embed = new Discord.MessageEmbed()
    // .setTitle("Access Denied")
    // .setDescription("Please contact <@564177349990416484> in order to gain access to this bot.")
    // if(!hasPerms) return message.channel.send(embed)

    console.log(message.content + ' -- ' + message.author.tag + " -- " + (message.guild).toString());

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    for (const file of client.commandFiles) {
      const command = require(`../commands/${file}`);
      var runCmd = false;
      if (cmd === command.name) runCmd = true;
      for(const alias of command.aliases){
        if(cmd === alias) runCmd = true;
      }
      if(runCmd) return client.commands.get(command.name).run(Discord, client, message, args);
    }
  }
}
