const ms = require('ms')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'backups',
  aliases: [],
  reqPerm: "BOT_ADMIN",//"ADMINISTRATOR",
  args: "<backup | load> <options>",
  cooldown: 0, //cooldowns: {user: {normal: 0, reduced: 0}, server: {normal: 0, reduced: 0}}
  desc: "Everything with backups",
  example: [],
  run: async(client, message, args) => {    
    const { guild } = message
    const embed = new MessageEmbed()

    if(!guild.member(client.user).hasPermission('ADMINISTRATOR')) return message.channel.send('This command requires the bot to have Administrator permissions. Re run this command when the bot is given them.')

    var backups = await client.gData.get(`${message.guild.id}:backups`) || []
    
    if(args[0] == 'create'){
      if(backups.length >= 5) return message.channel.send('You can have maximim of 5 backups, please delete one to make a new one.')

      let date_ob = new Date();

      var data = {
        datetime: date_ob.toUTCString(),
        backupID: generateNewID(backups),
        data: {
          name: guild.name,
          icon: guild.icon,
          id: guild.id,
          region: guild.region,
          
          roles: guild.roles.cache,
          channels: guild.channels.cache,
          emojis: guild.emojis.cache,

          afkTimeout: guild.afkTimeout,
          afkChannelID: guild.afkChannelID,
        }
      }
      backups.push(data)

      await client.gData.set(`${message.guild.id}:backups`, backups)

      return message.channel.send('Backup Creation Successful!')
    }
    if(args[0] == 'list'){
      if(backups.length == 0) return message.channel.send('This server has no backups yet.')

      for(backup of backups){
        embed.addField(`Backup ID: ${backup.backupID}`, `Saved at ${backup.datetime}`)
      }
      return message.channel.send(embed)
    }
    if(args[0] == 'clear'){
      await client.gData.set(`${message.guild.id}:backups`, undefined)
      message.channel.send('Backups were cleared.')
    }
    if(args[0] == 'delete'){
      if(!args[1]) return message.channel.send('You didn\'t provide a backup ID')
      if(!client.gData.get(`${message.guild.id}:backups`).find(element => element.id == args[1])) return message.channel.send('You didn\'t enter a valid backup ID')
    }
    if(args[0] == 'info'){
      const channelOverview = ''
      if(!args[1]) return message.channel.send('You didn\'t provide a backup ID')
      if(!backups) return message.channel.send('No backups exist for this server.')

      var backup = backups.find(element => element.backupID == args[1])
      if(!backup) return message.channel.send('You didn\'t enter a valid backup ID')

      console.log(backup.channels)
      
      for(channel of backup.channels){
        if(channel.parent !== null) channelOverview += "  "
        channelOverview += (channelTypeToSymbol(channel.type) + " " + channel.name)
      }
      message.channel.send(embed)
    }
    if(args[0] == 'load'){
      try {

      } catch (error){
        message.channel.send('')
      }

    }





    message.channel.send(`\`${await client.gData.get(`${message.guild.id}:prefix`)}serverdata backup\`, \`${await client.gData.get(`${message.guild.id}:prefix`)}serverdata backups\` or \`${await client.gData.get(`${message.guild.id}:prefix`)}serverdata load\``)
  }
}

function generateNewID(array){
  var valid = undefined
  var n = undefined
  do {
    valid = true
    var n = Math.floor((Math.random() * 100));
    for(element in array){
      if(n == element.id) valid = false
    }
  } while (valid === false)
  return n
}

function channelTypeToSymbol(type){
  if(type == 'category') return '*'
  if(type == 'voice') return '>'
  if(type == 'text') return '#'
  //if(type == 'category') return '*'
}