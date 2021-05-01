const { MessageEmbed } = require('discord.js')

var configs = [
  { title: 'Bot Nickname',
    name: 'nickname',
    args: '[Nickname | None]',
    current: async (client, guild) => {
      return guild.member(client.user).displayName || client.user.username 
    },
    run: async (client, message, args) => {
      const { channel, guild } = message
      if(!args[0]) message.channel.send("Please include the nickname you would like to change the current one to.")

      guild.members.cache.get(client.user.id).setNickname(args.join(" "))
      channel.send(`My nickname has been changed to \`${args.join(" ")}\``)
    }
  },
  { title: 'Prefix',
    name: 'prefix',
    args: '[Prefix]',
    current: async (client, guild) => {
      return await client.gData.get(`${guild.id}:prefix`) || process.env.PREFIX
    },
    run: async (client, message, args) => {
      const { channel } = message
      if(!args[0]) return message.channel.send('You need to enter a prefix.')

      client.gData.set(`${message.guild.id}:prefix`, args.join(' '))
      channel.send(`The bot prefix is now \`${args[0]}\``)
    }
  },
  { title: 'Anti-Ad',
    name: 'antiad',
    args: '[on | off]',
    current: async (client, guild) => {
      const antiad = await client.gData.get(`${guild.id}:antiad`)
      if(!antiad) return 'off'
      if(antiad === true) return 'on'
    },
    run: async (client, message, args) => {
      if(!args[0]) return message.channel.send('Please enter on or off')
      if(args[0].toLowerCase() == 'on'){
        await client.gData.set(`${message.guild.id}:antiad`, true)
        return message.channel.send('Anti-Ad is turned on')
      }
      if(args[0].toLowerCase() == 'off'){
        await client.gData.set(`${message.guild.id}:antiad`, undefined)
        return message.channel.send('Anti-Ad is turned off')
      }
      message.channel.send('Please make sure to enter a valid input')
    }
  }
]

module.exports = {
  name: 'config',
  aliases: [],
  reqPerm: "MANAGE_GUILD",
  args: "[setting] <value>",
  cooldown: 2000,
  desc: "Sets the nickname of the bot for this server.",
  example: ['verified-role @verified', 'nickname dumb robot'], 
  run: async(client, message, args) => {
    const embed = new MessageEmbed()

    if(!args[0]){
      embed.setTitle('Bot Configuration Pannel')
      embed.setThumbnail(client.user.displayAvatarURL())

      const prefix = await client.gData.get(`${message.guild.id}:prefix`) || process.env.PREFIX

      for(config of configs){
        embed.addField(config.title, `**→ Current: **${(await config.current(client, message.guild))} \n\`\`\`${prefix}config ${config.name} ${config.args}\`\`\``)
      }

      message.channel.send(embed)
    } else {
      for(config of configs){
        if(args[0] == config.name) config.run(client, message, args.slice(1))
      }
    }
  }
}
