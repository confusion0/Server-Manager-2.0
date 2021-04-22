const { MessageEmbed } = require('discord.js')

const infos = require('./questions.json')

module.exports = {
  name: 'mindustryinfo',
  aliases: ['minfo', 'mindustryi'],
  reqPerm: "BOT_ADMIN",
  args: "",
  desc: "Tells you info on mindustry",
  example: [''],
  cooldown: undefined,
  run: async(client, message, args) => { 
    for(info in infos){
      var triggered = false;
      for(trigger in info.triggers){
        if(trigger == args.join(' ')){
          triggered = true;
          break
        }
      }
      if(triggered){
        message.channel.send(info.response.embed)
        break
      }
    }
  }
}