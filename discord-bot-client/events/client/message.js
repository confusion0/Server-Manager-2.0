const fs = require("fs")

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  name: 'message',
  run: async(client) => {
    await sleep(2000)
    client.on('message', async message => {
      if (!message.guild) return;
      if (message.author.bot) return;
      
      var serverprefix = process.env.PREFIX
      await client.gData.get(message.guild.id)
      .then(data => {
        if(!data) return
        serverprefix = data.prefix
      })

      if(message.content.startsWith('<@') && message.mentions.users.first() && message.mentions.users.first().id === client.user.id) return message.channel.send(`Server prefix is \`${serverprefix}\``)

      if (!message.content.startsWith(serverprefix)) return;

      console.log(message.content + ' -- ' + message.author.tag + " -- " + message.channel.name + " -- " + (message.guild).toString());

      const args = message.content.slice(serverprefix.length).split(/ +/);
      const cmd = args.shift().toLowerCase();

      var command = client.commands.get(cmd.toLowerCase())

      if( !command ) client.commands.forEach( $command => { $command.aliases.forEach( alias => { if(alias == cmd) command = $command } ) } )

      if(command){
        if(command.reqPerm == "BOT_ADMIN" && !client.ADMINS.find(admin => admin.ID === message.author.id)) return message.channel.send("This command is reserved for bot admins only.")

        if(command.reqPerm != "BOT_ADMIN" && command.reqPerm != "NONE" && !message.member.hasPermission(command.reqPerm)) {
          if(!client.ADMINS.find(admin => admin.ID === message.author.id)) return message.channel.send(`You need \`${command.reqPerm}\` permmision to run this command.`)
          else message.channel.send(`Bot admin detected, bypassed \`${command.reqPerm}\` permmisions for ${message.author.tag}`)
        }

        return command.run(client, message, args);
      }
    })
  }
}
