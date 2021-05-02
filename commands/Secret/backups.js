const 
  { MessageEmbed } = require('discord.js'),
  DiscordBackups = require('discord-backup'),
  CreateBackup = DiscordBackups.create,
  ListBackups = DiscordBackups.list,
  LoadBackup = DiscordBackups.load,
  BackupSchema = require('../../schemas/Backup.js')
  PrefixSchema = require('../../schemas/Prefix.js')
  ms = require('ms'),
  bson = require("bson"),
  BSON = new bson.BSONPure.BSON()

const MAX_BACKUPS = 5;

const COMMANDS = [
  { name: "create", title: "Create", description: "Create backups of your server in less then 10 seconds.", args: ""},
  { name: "info", title: "Info", description: "See information in induvidual backups.", args: "<backup-id>"},
  { name: "list", title: "List", description: "See all of the backups for this server", args: ""},
  { name: "load", title: "Load", description: "Load backups onto the server. Warning: this action is irreversible and should only be used after a raid or catestrophic event.", args: "<backup-id>"},
  { name: "delete", title: "Delete", description: "Delete obsolete or old backups that you know wont be of any use come any raid or catestrophic event.", args: "<backup-id>"}
]

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
  CONFIRM_DELETION(){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription(`Are you sure you want to delete this backup? This action is irreversible so make sure you want to and are deleting the correct backup. React with :white_check_mark: to confirm, and :stop_sign: to cancel. This prompt will cancel in 15 seconds.`)
      .setColor('RED')
  },
  BACKUPS(backups){
    const embed = new MessageEmbed()
    .setTitle('Backup Management')
    .setDescription(`${backups.length} of ${MAX_BACKUPS} total.`)
    .setColor('NAVY')
    for(b of backups){
      const { saveTimestamp, size, _id } = b
      const time = ms(new Date().getTime() - new Date(saveTimestamp).getTime(), { long: true })
      embed.addField(`${time} ago`, `\`\`\`ID: ${_id} \nSize: ${Math.round(Object.bsonsize(b)/(1024*1024))}MB\`\`\``)
    }
    return embed;
  },
  DELETION_CANCELLED(){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription(`The deletion of the backup was cacelled`)
      .setColor('RED')
  },
  DELETION_CONFIRMED(){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription(`The deletion of the backup will now commence.`)
      .setColor('YELLOW')
  },
  SUCCESSFULL_DELETION(){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription(`The backup was successfully deleted.`)
      .setColor('GREEN')
  },
  INVALID_ID(){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription(`We couldn't find a backup for the id you provided.`)
      .setColor('RED')
  },
  NO_ID_PROVIDED(){
    return new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription(`We couldn't find a backup for the id you provided.`)
      .setColor('RED')
  },
  async DASHBOARD(client, id){
    const prefix = await PrefixSchema.get(id) || client.config.PREFIX
    const embed = new MessageEmbed()
      .setTitle('Backup Management')
      .setDescription(`Here you can create, manage, load and delete backups of your server. This can be used to minimize the damage caused by raids or other catestrophic`)
      .setColor('NAVY')
    for(c of COMMANDS){
      embed.addField(c.title, `${c.description} \n\`\`\`Usage: ${prefix}${c.name} ${c.args}\`\`\``)
    }
    return embed;
  },
  BACKUP(backup){
    const { saveTimestamp, size, _id } = backup
    const embed = new MessageEmbed()
    .setTitle('Backup Management')
    const time = ms(new Date().getTime() - new Date(saveTimestamp).getTime(), { long: true })
      embed.setDescription(`${time} ago`, `\`\`\`ID: ${_id} \nSize: ${Math.round(BSON.calculateObjectSize/(1024*1024))}MB\`\`\``)
    .setColor('NAVY')
    return embed;
  },
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
      
    } else if(action == "delete" || action == "d"){
      if(!args[1]) return message.channel.send(EMBEDS.NO_ID_PROVIDED())
      if(!await BackupSchema.get(args[1])) return message.channel.send(EMBEDS.INVALID_ID())
      const msg = await message.channel.send(EMBEDS.CONFIRM_DELETION())
      await msg.react('✅');
      await msg.react('🛑');
      
      const filter = (reaction, user) => {
        const name = reaction.emoji.name
      	return name === "✅" || name === "🛑" && user.id === message.author.id;
      };
      const reaction = (await msg.awaitReactions(filter, { max: 1, time: 15000 })).first()
      const emojiName = reaction && reaction.emoji.name || false
      
      if(emojiName == "✅"){
        message.channel.send(EMBEDS.DELETION_CONFIRMED())
        await BackupSchema.delete(args[1])
        message.channel.send(EMBEDS.SUCCESSFULL_DELETION())
      } else {
        message.channel.send(EMBEDS.DELETION_CANCELLED())
      }
    } else {
      message.channel.send(await EMBEDS.DASHBOARD(client, guild.id))
    }
  }
}