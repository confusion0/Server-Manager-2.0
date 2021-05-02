const { MessageEmbed } = require('discord.js')
const PrefixSchema = require('../../schemas/Prefix.js')
const AntiAdSchema = require('../../schemas/AntiAd.js')
const MindustrySchematicParsingSchema = require('../../schemas/MindustrySchematicParsing.js')

var configs = [
  { title: 'Bot Nickname',
    name: 'nickname',
    args: '[nickname | reset]',
    current: async (client, guild) => {
      return guild.member(client.user).displayName || client.user.username 
    },
    run: async (client, message, args) => {
      const { channel, guild } = message
      if(args[0].toLowerCase() == "reset"){
        await guild.members.cache.get(client.user.id).setNickname(client.user.username)
        channel.send(`My nickname has been reset to \`${client.user.username}\``)
      } else {
        await guild.members.cache.get(client.user.id).setNickname(args.join(" "))
        channel.send(`My nickname has been changed to \`${guild.member(client.user).displayName}\``)
      }
    }
  },
  { title: 'Prefix',
    name: 'prefix',
    args: '[prefix]',
    current: async (client, guild) => {
      const prefix = await PrefixSchema.get(guild.id)
      return prefix || client.config.PREFIX
    },
    run: async (client, message, args) => {
      const { channel, guild } = message
      await PrefixSchema.set(guild.id, args.join(' '))
      channel.send(`The bot prefix is now \`${args[0]}\``)
    }
  },
  { title: 'Anti Advertising',
    name: 'antiad',
    args: '[enable | disable]',
    current: async (client, guild) => {
      const enabled = await AntiAdSchema.get(guild.id)
      return enabled ? "Enabled" : "Disabled"
    },
    run: async (client, message, args) => {
      if(args[0].toLowerCase() == 'enable'){
        await AntiAdSchema.set(message.guild.id, true)
        message.channel.send('Anti Ad Enabled.')
      } else if(args[0].toLowerCase() == 'disable'){
        await AntiAdSchema.set(message.guild.id, false)
        message.channel.send('Anti Ad Disabled.')
      } else {
        message.channel.send('Please make sure to enter a valid input.')
      }
    }
  },
  { title: 'Mindustry Schematic Parsing',
    name: 'mindustryschematicparsing',
    args: '[enable | disable]',
    current: async (client, guild) => {
      const enabled = await MindustrySchematicParsingSchema.get(guild.id)
      return enabled ? "Enabled" : "Disabled"
    },
    run: async (client, message, args) => {
      if(args[0].toLowerCase() == 'enable'){
        await MindustrySchematicParsingSchema.set(message.guild.id, true)
        message.channel.send('Mindustry Schematic Parsing Enabled.')
      } else if(args[0].toLowerCase() == 'disable'){
        await MindustrySchematicParsingSchema.set(message.guild.id, false)
        message.channel.send('Mindustry Schematic Parsing Disabled.')
      } else {
        message.channel.send('Please make sure to enter a valid input.')
      }
    }
  }
]

module.exports = {
  name: 'config',
  aliases: ['c'],
  reqPerm: "MANAGE_GUILD",
  args: "[setting] <value>",
  cooldown: 2000,
  desc: "Sets the nickname of the bot for this server.",
  example: ['verified-role @verified', 'nickname dumb robot'], 
  run: async(client, message, args) => {
    const embed = new MessageEmbed()
    const prefix = await configs.find(c => c.name == "prefix").current(client, message.guild)

    if(!args[0]){
      embed.setTitle('Bot Configuration Pannel')
      embed.setThumbnail(client.user.displayAvatarURL())

      for(config of configs){
        embed.addField(config.title, `**→ Current: **${(await config.current(client, message.guild))} \n\`\`\`${prefix}config ${config.name} ${config.args}\`\`\``)
      }

      message.channel.send(embed)
    } else if(!args[1]){
      if(!configs.find(c => c.name == args[0])){
        embed.setTitle('Bot Configuration Pannel')
        embed.setThumbnail(client.user.displayAvatarURL())

        for(config of configs){
          embed.addField(config.title, `**→ Current: **${(await config.current(client, message.guild))} \n\`\`\`${prefix}config ${config.name} ${config.args}\`\`\``)
        }
      } else {
        embed.setTitle(config.title)
        embed.setThumbnail(client.user.displayAvatarURL())

        embed.setDescription(`**→ Current: **${(await configs.find(c => c.name == args[0]).current(client, message.guild))} \n\`\`\`${prefix}config ${config.name} ${config.args}\`\`\``)
      }
      message.channel.send(embed)
    } else {
      for(config of configs){
        if(args[0] == config.name) config.run(client, message, args.slice(1))
      }
    }
  }
}
