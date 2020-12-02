const ms = require('ms')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'backups',
  aliases: [],
  reqPerm: "ADMINISTRATOR",
  args: "<backup | load> <options>",
  cooldown: 0, //cooldowns: {user: {normal: 0, reduced: 0}, server: {normal: 0, reduced: 0}}
  desc: "Everything with backups",
  example: [],
  run: async(client, message, args) => {    
    const { guild } = message
    const embed = new MessageEmbed()

    if(!args[0]) return message.channel.send(new MessageEmbed()
      .setTitle('Server Backup Hub')
      .setDescription('Backups is a feature that will backup your server data so that in the case that it is raided/changed in a way that is hard to reverse you can just load a previous version of your server.')
      .addFields(
        {name: 'create', value: 'Create a backup of the server.'},
        {name: 'info', value: 'Shows the data stored in a backup'},
        {name: 'list', value: 'Lists all of the backups that exist for this server'},
        {name: 'delete', value: 'Deletes a backup'},
        {name: 'clear', value: 'Clears all of the backups'},
        {name: 'load', value: 'Loads a backup'}
      )
    )

    const option = args.shift().toLowerCase()

    var backups = await client.gData.get(`${guild.id}:backups`) || []
    
    if(option == 'create'){
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

          afkTimeout: guild.afkTimeout,
          afkChannelID: guild.afkChannelID,
        }
      }
      backups.push(data)

      await client.gData.set(`${guild.id}:backups`, backups)

      return message.channel.send('Backup Creation Successful!')
    }
    if(option == 'list'){
      if(backups.length == 0) return message.channel.send('This server has no backups yet.')

      for(backup of backups){
        embed.addField(`Backup ID: ${backup.backupID}`, `Saved at ${backup.datetime}`)
      }
      return message.channel.send(embed)
    }
    if(option == 'clear'){
      await client.gData.set(`${guild.id}:backups`, undefined)
      return message.channel.send('Backups were cleared.')
    }
    if(option == 'delete'){
      if(!args[0]) return message.channel.send('You didn\'t provide a backup ID')
      const backup = backups.find(backup => backup.backupID == args[0])
      if(!backup) return message.channel.send('You didn\'t enter a valid backup ID')
      backups.splice(backups.indexOf(backup), 1)
      await client.gData.set(`${guild.id}:backups`, backups)
      return message.channel.send(`Backup ${args[0]} was deleted!`)
    }
    if(option == 'info'){
      if(!args[0]) return message.channel.send('You didn\'t provide a backup ID')
      if(!backups) return message.channel.send('No backups exist for this server.')

      var backup = backups.find(element => element.backupID == args[0])
      if(!backup) return message.channel.send('You didn\'t enter a valid backup ID')

      const gData = backup.data

      var channelsText = ''
      for(channel in gData.channels){
        console.log(channel)
        if(channel.type == 'category'){
          channelsText += `*${channel.name}`
          for(subChannel in channel.children){
            channelsText += "   " + channelToSymbol(subChannel) + subChannel.name
          }
        }
        else if(!channel.parent){
          channelsText = channelToSymbol(channel) + channel.name + '\n' + channelsText
        }
      }

      var rolesText = ''
      for(role of gData.roles){
        if(rolesText.length + (('@' + role.name) + 'and more...').length <= 1024) {
          if(role.name == '@everyone') rolesText += role.name + '\n'
          else rolesText += ('@' + role.name) + '\n'
        }
        else {
          if(!rolesText.endsWith('and more...')) rolesText += 'and more...'
        }
      }

      embed.setTitle(`Backup ${backup.backupID}`)
      embed.addField('Channels', `\`\`\`${channelsText}\`\`\``, true)
      embed.addField('Roles', `\`\`\`${rolesText}\`\`\``, true)

      return message.channel.send(embed)
    }
    if(args[0] == 'load'){
      message.channel.send('Sorry this part of the backup command isn\'t finished yet!')
    }
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

function channelToSymbol(channel){
  const { type } = channel
  if(type == 'category') return '*'
  if(type == 'voice') return '>'
  if(type == 'text') return '#'
  if(type == 'news') return '<'
}