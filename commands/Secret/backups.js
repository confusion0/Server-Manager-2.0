const { MessageEmbed } = require('discord.js')
const { create, list, load } = require('discord-backup')

module.exports = {
  name: 'backups',
  aliases: ['bs'],
  reqPerm: "ADMINISTRATOR",
  args: "<action> <action args...",
  cooldown: 2000,
  desc: "Hub for backups.",
  example: [''],
  run: async(client, message, args) => {
    const action = args[0];
    if(action == "create"){
      const guildData = await create(message.guild, {
        jsonSave: false
      })
      
    } else if(action == "list"){
      
    } else if(action == "load"){
      
    } else if(action == "delete"){
      
    } else {
      
    }
  }
}