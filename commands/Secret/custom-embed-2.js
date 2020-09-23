const { MessageEmbed } = require('discord.js')
const timeout = 200000

module.exports = {
  name: 'custom-embed-2',
  aliases: ['custom-embeds-2', 'ce2'],
  reqPerms: "BOT_ADMIN", //["MANAGE_GUILD"],
  args: "",
  desc: "Starts a custom embed constuctor/creator. (interactive)",
  run: async(Discord, client, message, args) => {
    const embed = new MessageEmbed()
    var timedout = false
    var messages = [message]

    const filter = response => {
      return response.author == message.author
    };

    messages.push(await message.channel.send("Enter a title for your embed! Enter none for no title."))
    await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
        const response = collected.first()
        if(response.content.toLowerCase() != "none") embed.setTitle(response)
        messages.push(response)
      }).catch(collected => timedout = true );
    if(timedout) return timedout(message)

    messages.push(await message.channel.send("Enter a description for you embed! Enter none for no description."))
    await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
        const response = collected.first()
        if(response.content.toLowerCase() != "none") embed.setDescription(response)
        messages.push(response)
      }).catch(collected => timedout = true );
    if(timedout) return timedout(message)

    var fields = "undefined"

    do {
      messages.push(await message.channel.send("Do you want fields in you embed? yes/no"))
      await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
          const response = collected.first()
          if(response.content.toLowerCase() == "yes") fields = true
          else if(response.content.toLowerCase() == "no") fields = false
          messages.push(response)
        }).catch(collected => timedout = true );
      if(timedout) return timedout(message)
    } while(fields == "undefined")

    if(fields){
      var addmore = ""
      do {
        addmore = "undefined"
        var name = 'undefined'
        var value = 'undefined'
        messages.push(await message.channel.send("Enter a name for your field!"))
        await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
            const response = collected.first()
            name = response
            messages.push(response)
          }).catch(collected => timedout = true );
        if(timedout) return timedout(message)

        messages.push(await message.channel.send("Enter the description for your field!"))
        await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
            const response = collected.first()
            value = response
            messages.push(response)
          }).catch(collected => timedout = true );
        if(timedout) return timedout(message)

        embed.addField(name, value)

        do {
          messages.push(await message.channel.send("Do you want to add more fields to your embed? yes/no"))
          await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
              const response = collected.first()
              if(response.content.toLowerCase() == "yes") addmore = true
              else if(response.content.toLowerCase() == "no") addmore = false
              messages.push(response)
            }).catch(collected => timedout = true );
          if(timedout) return timedout(message)
        } while(addmore == "undefined")
      } while(addmore)
    }

    messages.push(await message.channel.send("Enter a footer for you embed! Enter none for no footer."))
    await message.channel.awaitMessages(filter, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
        const response = collected.first()
        if(response.content.toLowerCase() != "none") embed.setFooter(response)
        messages.push(response)
      }).catch(collected => timedout = true );
    if(timedout) return timedout(message)

    const filter2 = (reaction, user) => {
      return (reaction.emoji.name === '👍') && user.id === message.author.id;
    };

    messages.push(await message.channel.send("Do you want to clean the chat of this command? Ignore if not delete."))
    messages[messages.length-1].react('👍')
    messages[messages.length-1].awaitReactions(filter2, { max: 1, time: timeout, errors: ['time'] }).then(collected => {
        for(msg of messages) {
          msg.delete().catch(() => {})
        }
      }).catch(collected => {});

    message.channel.send(embed)
  }
}

function timedout(message){
  message.channel.send("times up. rerun the command to use.")
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
