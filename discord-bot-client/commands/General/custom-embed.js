const timeout = 5000
const { MessageEmbed } = require('discord.js')

colors = [
  "DEFAULT", 
  "WHITE",
  "AQUA",
  "GREEN",
  "BLUE",
  "YELLOW",
  "PURPLE",
  "LUMINOUS_VIVID_PINK",
  "GOLD",
  "ORANGE",
  "RED",
  "GREY",
  "DARKER_GREY",
  "NAVY",
  "DARK_AQUA",
  "DARK_GREEN",
  "DARK_BLUE",
  "DARK_PURPLE",
  "DARK_VIVID_PINK",
  "DARK_GOLD",
  "DARK_ORANGE",
  "DARK_RED",
  "DARK_GREY",
  "LIGHT_GREY",
  "DARK_NAVY",
  "BLURPLE",
  "GREYPLE",
  "DARK_BUT_NOT_BLACK",
  "NOT_QUITE_BLACK",
  "RANDOM"
]

module.exports = {
  name: 'custom-embed',
  aliases: ['custom-embeds', 'ce'],
  reqPerm: "MANAGE_GUILD",
  args: "",
  cooldown: 3000,
  desc: "Starts a custom embed constuctor/creator. (interactive)",
  example: [],
  run: async(client, message, args) => {
    const filter = m => m.content.includes("");
    const collector = message.channel.createMessageCollector(filter, {time: 500000});

    const steps = 4
    const text = ["Enter a **title** for your embed. Type **empty** for no title.", "Enter a **description** for your embed. Type **empty** for no description.", "Enter a **Hex color** for your embed. If you want random then just type **RANDOM**. Example: **#E32636** https://image-color.com/", "Mention the channel you would like to have your embed sent in. Type **current** if you want to use the current channel.", "Embed Creation Complete!"]

    let step = 0
    let title = "none", description = "none", color = "none", channel = "none"
    let messages = []
    let cancelled = true

    const embed = new MessageEmbed()
    .setTitle("Custom Embed Creator")
    .setColor('RANDOM')
    .setFooter(`Step ${step} of ${steps} | Type cancel to exit • ${message.author.tag}`)
    .setDescription(text[0])
    .addFields(
      { name: 'Title', value: title, inline: true},
      { name: 'Color', value: color, inline: true },
      { name: 'Description', value: description},
      { name: 'Channel', value: channel},
	  )
    
    embed.setFooter(`Step ${step+1} of ${steps} | Type cancel to exit`)
    const message2 = await message.channel.send(embed)

    collector.on('collect', async m => {
      if(m.author.bot) return
      if(m.author != message.author) return 

      messages.push(m)

      if((m.content).trim().toLowerCase() == "cancel"){ 
        return collector.stop()
      }

      if(step == 0){
        title = (m.content).trim()
        if(title.length > 1024){
          let errorMessage = await message.channel.send(`The **title** cannot be longer than 1024 characters.`)
          return messages.push(errorMessage)
        }
        if(title === "empty") {
          embed.fields.find(c => c.name === 'Title')['value'] = "empty"
          title = ""
        }
        else embed.fields.find(c => c.name === 'Title')['value'] = title
      }
      if(step == 1){
        description = (m.content).trim()
        if(description.length > 1024){
          let errorMessage = await message.channel.send("The **description** cannot be longer than 1024 characters.")
          return messages.push(errorMessage)
        }
        if(description === "empty") {
          embed.fields.find(c => c.name === 'Description')['value'] = "empty"
          description = ""
        }
        else embed.fields.find(c => c.name === 'Description')['value'] = description;
      }
      if(step == 2){
        color = (m.content).trim()
        if(!(color.startsWith("#") && color.length === 7) && !colors.includes(color.toUpperCase())){
          let errorMessage = await message.channel.send("The **color** you inputed is not valid")
          return messages.push(errorMessage)
        }
        embed.fields.find(c => c.name === 'Color')['value'] = color.toUpperCase();
      }
      if(step == 3){
        channel = (m.content).trim()
        if(!(channel === "current" || channel.startsWith("<#") && channel.endsWith(">"))){
          let errorMessage = await message.channel.send("The **channel** you inputed is not valid")
          return messages.push(errorMessage)
        }
        embed.fields.find(c => c.name === 'Channel')['value'] = channel;
      }

      step += 1

      embed.setDescription(text[step])
      embed.setFooter(`Step ${step+1} of ${steps} | Type cancel to exit`)

      message2.edit(embed)

      if(step >= steps){
        cancelled = false
        return collector.stop()
      }
    });

    collector.on('end', async collected => {
      message.delete({timeout : timeout})
      setTimeout(function () {
        messages.forEach((msg) => {
          msg.delete().catch(() => {})
        });
      }, timeout); 

      if(cancelled){
        const message3 = await message.channel.send(`Custom Embed Creation Cancelled. All messages with self destruct in ${timeout/1000} secs`)
        return message3.delete({timeout: timeout}).then(message2.delete({timeout: timeout}))
      } 

      const message4 = await message.channel.send(`Thank you for using my custom embed creator. All messages will now self destruct in ${timeout/1000} secs.`)

      message4.delete({timeout: timeout}).then(message2.delete({timeout: timeout}))

      const embed1 = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
      .setColor(color.toUpperCase())

      if(channel.toLowerCase() === "current") message.channel.send(embed1)
      else getChannelFromMention(client, message, channel).send(embed1)
    });
  }
}

function getChannelFromMention(client, message, mention) {
	if (!mention) return;

	if (mention.startsWith('<#') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('#')) {
			mention = mention.slice(1);
		}

		return message.guild.channels.cache.get(mention);
	}
}
