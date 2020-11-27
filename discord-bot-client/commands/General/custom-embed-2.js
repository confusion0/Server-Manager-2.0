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

const embedHelp = new MessageEmbed()
  .setTitle('Embed Creator Commands')
  .setDescription(`
  **<> means required**
  **[] means optional**
  **use \`clear\` command to clean up**

  title <title>
  description <description>
  image <url>

  finish
  stop
  `)

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

    const help_message = await message.channel.send(embedHelp)

    const embed = new MessageEmbed()
    const msg = await message.channel.send(embed)

    message.delete()

    var messages = []

    var status = undefined

    collector.on('collect', async m => {
      const args = m.content.split(/ +/);
      const cmd = args.shift().toLowerCase();
      const joined = args.join(" ")

      messages.push(m)

      if(cmd == 'finish'){
        status = 'finished'
        collector.stop()
      }
      if(cmd == 'stop'){
        status = 'stopped'
        collector.stop()
      }
      if(cmd == 'title'){
        var title = joined
        embed.setTitle(title)
        msg.edit(embed)
      }
      if(cmd == 'description'){
        var desc = joined
        embed.setDescription(desc)
        msg.edit(embed)
      }
      if(cmd == 'color'){
        var color = args.join('_').toUpperCase()
        if(colors.includes(color) || (color.startsWith("#") && color.length === 7 )){
          embed.setColor(color)
          msg.edit(embed)
        } else message.channel.send("The **color** you inputed is not valid")
      }
      if(cmd == 'image'){
        var image = joined
        if(isValidHttpUrl(image)) embed.setImage(image)
        else message.channel.send('You didn\' enter a valid URL')
        msg.edit(embed)
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