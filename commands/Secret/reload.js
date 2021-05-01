const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'reload',
  aliases: ['r'],
  reqPerm: "BOT_ADMIN",
  args: "",
  cooldown: 2000,
  desc: "Reloads the specified command.",
  example: [''],
  run: async(client, message, args) => {
    const type = args[0];
    if(type == "command" || type == "c"){
      const name = args[1].toLowerCase();
      const command = client.commands.get(name) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(name))
      
      if(!command) return message.channel.send(`\`${name}\` isn't a valid command!`)
      
      delete require.cache[require.resolve(command.path)];
      
      const _command = require(`${command.path}`)
      _command.path = command.path;  
      client.commands.set(_command.name, _command);
      console.log(`Reloaded: ${_command.name}`)
      
      message.channel.send(`Reloaded the \`${command.name}\` command.`)
    } else if (type == "event" || type == "e"){
      const name = args[1].toLowerCase();
      const event = client.events.get(name)
      
      if(!event) return message.channel.send(`\`${name}\` isn't a valid event!`)
      
      delete require.cache[require.resolve(event.path)];
      client.removeAllListeners(name)
      
      const _event = require(`${event.path}`)
      _event.path = event.path;  
      client.events.set(_event.name, _event);
      if(event.once){
        client.once(event.name, (...args) => event.run(client, ...args));
      } else {
        client.on(event.name, (...args) => event.run(client, ...args));
      }
      console.log(`Reloaded: ${_event.name}`)
      
      message.channel.send(`Reloaded the \`${event.name}\` event.`)
    } else if(type == "chatfilter" || type == "cf"){
      const name = args[1].toLowerCase();
      const chatFilter = client.chatFilters.get(name)
      
      if(!chatFilter) return message.channel.send(`\`${name}\` isn't a valid command!`)
      
      delete require.cache[require.resolve(chatFilter.path)];
      
      const _chatFilter = require(`${chatFilter.path}`)
      _chatFilter.path = chatFilter.path;  
      client.chatFilters.set(_chatFilter.name, _chatFilter);
      console.log(`Reloaded: ${_chatFilter.name}`)
      
      message.channel.send(`Reloaded the \`${chatFilter.name}\` command.`)
    } else if(type == "config"){
      delete require.cache[require.resolve('../../config.json')];
      const config = require('../../config.json')
      client.config = config
      console.log(`Reloaded: Config File`)
      message.channel.send(`Reloaded the \`config file\`.`)
    } else {
      message.channel.send(`Please specify a valid type of thing to reload. i.e event or command`)
    }
  }
}