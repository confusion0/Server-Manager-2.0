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
  { title: 'Verified Role',
    name: 'verifiedrole',
    args: '[Role | None]',
    current: async (client, guild) => {
      if(!(await client.gData.get(`${guild.id}:vRole`))) return 'None'
      return "<@&" + await client.gData.get(`${guild.id}:vRole`) + ">"
    },
    run: async (client, message, args) => {
      const { channel, guild } = message
      let role = message.mentions.roles.first() || guild.roles.cache.get(args[0])

      if(role){
        client.gData.set(`${guild.id}:vRole`, role.id)
        channel.send(`Set verified role to ${role}.`)
      }
      else if(args[0].toLowerCase() == 'none') {
        client.gData.delete(`${guild.id}:vRole`)
        channel.send('Set verified role to none.')
      }
      else return channel.send("Please enter the role as a mention or its id, or none to remove. Ex: @Example or 129038032234 or none")
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


