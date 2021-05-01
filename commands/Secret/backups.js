const 
  { MessageEmbed } = require('discord.js'),
  DiscordBackups = require('discord-backup'),
  CreateBackup = DiscordBackups.create,
  ListBackups = DiscordBackups.list,
  LoadBackup = DiscordBackups.load,
  BackupSchema = require('../../schemas/Backup.js')
  ms = require('ms')
  

const MAX_BACKUPS = 5;

const EMBEDS = {
  EXCEEDED_MAXIMUM_BACKUPS(){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription(`You may can only have ${MAX_BACKUPS} backups at a time. Please delete old or obsolete backups before proceeding.`)
      .setColor('RED')
  },
  GENERATING_BACKUP(){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription('Generating a backup of your server...')
      .setColor('YELLOW')
  },
  SAVING_BACKUP(){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription('Saving the generated backup in our database...')
      .setColor('YELLOW')
  },
  CREATED_BACKUP(backup_id){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription(`A backup has been created of this server. You can use this id \`${backup_id}\` to directly view the backup.`)
      .setColor('GREEN')
  },
  BACKUPS(backups){
    const embed = new MessageEmbed()
    .setTitle('Backups')
    .setColor('NAVY')
    for(b of backups){
      const { saveTimestamp, size, _id } = b
      const time = ms(new Date().getTime() - new Date(saveTimestamp).getTime(), { long: true })
      embed.addField(`${time} ago`, `\`\`\`id: ${_id}\`\`\``)
    }
    return embed;
  }
}

module.exports = {
  name: 'backups',
  aliases: ['b'],
  reqPerm: "ADMINISTRATOR",
  args: "<action> <action args...",
  cooldown: 5000,
  desc: "Hub for backups.",
  example: [''],
  run: async(client, message, args) => {
    const { guild, author } = message, action = args[0];
    if(action == "create" || action == "c"){
      const backups = await BackupSchema.getGuild(guild.id)
      console.log(backups.length)
      if(backups.length >= MAX_BACKUPS) return message.channel.send(EMBEDS.EXCEEDED_MAXIMUM_BACKUPS())
      message.channel.send(EMBEDS.GENERATING_BACKUP())
      const backup = await CreateBackup(guild, {
        jsonSave: false
      })
      message.channel.send(EMBEDS.SAVING_BACKUP())
      const id = await BackupSchema.add(guild.id, author.id, backup)
      message.channel.send(EMBEDS.CREATED_BACKUP(id))
    } else if(action == "info"){
      
    } else if(action == "list" || action == "l"){
      const backups = await BackupSchema.getGuild(guild.id)
      message.channel.send(EMBEDS.BACKUPS(backups))
    } else if(action == "load"){
      
    } else if(action == "delete"){
      
    } else {
      
    }
  }
}