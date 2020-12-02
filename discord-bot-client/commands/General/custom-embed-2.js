const { MessageEmbed } = require('discord.js')
const timeout = 200000

colors = [
  "DEFAULT", "WHITE", "AQUA", 
  "GREEN", "BLUE", "YELLOW", 
  "PURPLE", "LUMINOUS_VIVID_PINK", "GOLD", 
  "ORANGE", "RED", "GREY",
  "DARKER_GREY", "NAVY", "DARK_AQUA",
  "DARK_GREEN", "DARK_BLUE", "DARK_PURPLE",
  "DARK_VIVID_PINK", "DARK_GOLD", "DARK_ORANGE",
  "DARK_RED", "DARK_GREY", "LIGHT_GREY",
  "DARK_NAVY", "BLURPLE", "GREYPLE",
  "DARK_BUT_NOT_BLACK", "NOT_QUITE_BLACK", "RANDOM"
]

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const commands =  [
  {
    name: 'title',
    args: '<title>',
    run: async (embed, message, args) => {
      var title = args.join(" ")
      if(title.length > 256) return (await message.channel.send('The title must be less than 256 characters')).delete({timeout: 5000})
      embed.setTitle(title)
    }
  },
  {
    name: 'desc',
    args: '<description>',
    run: async (embed, message, args) => {
      var desc = args.join(" ")
      if(desc.length > 2048) return (await message.channel.send('The description must be less than 2048 characters')).delete({timeout: 5000})
      embed.setDescription(desc)
    }
  },
  {
    name: 'author',
    args: '<user mention>',
    run: async (embed, message, args)=> {
      var author = message.mentions.users.first()
      console.log(author)
      if(!author) return (await message.channel.send('You must mention a user to set as the author')).delete({timeout: 5000})
      embed.setAuthor(author.tag, author.displayAvatarURL())
    }
  },
  {
    name: 'color',
    args: '<hex | red | orange | ...',
    run: async (embed, message, args) => {
      var color = args.join('_').toUpperCase()
      if(colors.includes(color) || (color.startsWith("#") && color.length === 7 )) embed.setColor(color)
      else (await message.channel.send("The **color** you inputed is not valid")).delete({timeout: 5000})
    }
  },
  {
    name: 'image',
    args: '<image URL>',
    run: async (embed, message, args) => {
      var image = args.join(" ")
      if(isValidHttpUrl(image)) embed.setImage(image)
      else (await message.channel.send('You didn\' enter a valid URL')).delete({timeout: 5000})
    }
  }
]

module.exports = {
  name: 'custom-embed-2',
  aliases: ['custom-embeds-2', 'ce2'],
  reqPerm: "MANAGE_GUILD",
  args: "",
  desc: "Starts a custom embed constuctor/creator. (interactive)",
  example: [],
  cooldown: 3000,
  run: async(client, message, args) => {
    const filter = msg => msg.author.id == message.author.id;
    const collector = message.channel.createMessageCollector(filter, { time: 600000 }); //10 minutes

    var embed = new MessageEmbed()
      .setTitle('Embed Creator Commands')
    var desc = '**<> means required**\n **[] means optional** \n\n'
    for(command of commands){
      desc += `${command.name} ${command.args} \n`
    }
    desc += 'finish \n stop'
    embed.setDescription(desc)
    const help_message = await message.channel.send(embed)

    embed = new MessageEmbed()
    const msg = await message.channel.send(embed)

    message.delete()

    var status = undefined

    collector.on('collect', async m => {
      const args = m.content.split(/ +/);
      const cmd = args.shift().toLowerCase();

      m.delete({timeout: 1000})

      if(msg.deleted){
        status = 'deleted'
        collector.stop()
      }

      if(cmd == 'stop'){
        status = 'stopped'
        collector.stop()
      }
      if(cmd == 'finish'){
        status = 'finished'
        collector.stop()
      }

      for(command of commands){
        if(cmd == command.name){
          command.run(embed, m, args)
          msg.edit(embed)
          break
        }
        continue
      }
    });

    collector.on('end', async collected => {
      if(!status){
        message.channel.send('You took too long!')
      }
      if(status == 'stopped'){
        message.channel.send('Embed Creation Stopped')
      }
      if(status == 'finished'){
        help_message.delete()
        message.channel.send('Embed Creation Complete, use the \`clear\` command to clean up')
      }
    });
  }
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return (url.protocol === "http:" || url.protocol === "https:") && string.includes('.');
}